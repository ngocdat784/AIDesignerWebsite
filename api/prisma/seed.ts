import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import * as bcrypt from "bcrypt";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const users = [
    {
      id: crypto.randomUUID(),
      name: "Creator Test",
      email: "creator-test@example.com",
      password: "Creator@123456",
      role: "CREATOR" as const,
    },
    {
      id: crypto.randomUUID(),
      name: "Admin Test",
      email: "admin-test@example.com",
      password: "Admin@123456",
      role: "ADMIN" as const,
    },
  ];

  for (const item of users) {
    const passwordHash = await bcrypt.hash(
      item.password,
      10,
    );

    await prisma.user.upsert({
      where: {
        email: item.email,
      },

      update: {
        name: item.name,
        passwordHash,
        role: item.role,
      },

      create: {
        id: item.id,
        name: item.name,
        email: item.email,
        passwordHash,
        role: item.role,
      },
    });
  }

  console.log("Creator and Admin test users created successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });