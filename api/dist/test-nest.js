"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const database_service_1 = require("./database/database.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const database = app.get(database_service_1.DatabaseService);
        console.log("NestJS started successfully.");
        console.log("DatabaseService injected successfully.");
        await database.$queryRaw `SELECT 1`;
        console.log("PostgreSQL connection successful.");
        const users = await database.user.findMany();
        console.log("Users:", users);
    }
    catch (error) {
        console.error("NestJS database test failed:", error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
