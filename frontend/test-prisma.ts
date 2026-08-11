import { prisma } from "./lib/prisma";

async function main() {
  // =========================
  // Create
  // =========================

  const user = await prisma.user.create({
    data: {
      id: "test-user-001",
      name: "Test User",
      email: "test@example.com",
      role: "USER",
    },
  });

  console.log("Created user:", user);

  // =========================
  // Read
  // =========================

  const users = await prisma.user.findMany();

  console.log("All users:", users);

  // =========================
  // Delete
  // =========================

  const deletedUser = await prisma.user.delete({
    where: {
      id: "test-user-001",
    },
  });

  console.log("Deleted user:", deletedUser);

  // =========================
  // Verify Delete
  // =========================

  const remainingUsers = await prisma.user.findMany();

  console.log("Remaining users:", remainingUsers);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });