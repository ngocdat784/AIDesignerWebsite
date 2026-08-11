import "dotenv/config";
import "reflect-metadata";

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DatabaseService } from "./database/database.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const database = app.get(DatabaseService);

    console.log("NestJS started successfully.");
    console.log("DatabaseService injected successfully.");

    await database.$queryRaw`SELECT 1`;

    console.log("PostgreSQL connection successful.");

    const users = await database.user.findMany();

    console.log("Users:", users);
  } catch (error) {
    console.error("NestJS database test failed:", error);
  } finally {
    await app.close();
  }
}

bootstrap();