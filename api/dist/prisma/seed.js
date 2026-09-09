"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../generated/prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
}
const adapter = new adapter_pg_1.PrismaPg({
    connectionString,
});
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const users = [
        {
            id: crypto.randomUUID(),
            name: "Creator Test",
            email: "creator-test@example.com",
            password: "Creator@123456",
            role: "CREATOR",
        },
        {
            id: crypto.randomUUID(),
            name: "Admin Test",
            email: "admin-test@example.com",
            password: "Admin@123456",
            role: "ADMIN",
        },
    ];
    for (const item of users) {
        const passwordHash = await bcrypt.hash(item.password, 10);
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
