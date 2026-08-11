import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL is not defined");
    }

    console.log("DatabaseService constructor DATABASE_URL OK");

    const adapter = new PrismaPg({
      connectionString,
    });

    super({
      adapter,
    });

    console.log("Prisma user delegate:", this.user);
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}