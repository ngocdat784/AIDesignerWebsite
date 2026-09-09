"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const prisma_exception_1 = require("../common/exceptions/prisma.exception");
let AuthRepository = class AuthRepository {
    constructor(database) {
        this.database = database;
    }
    // =========================
    // Query
    // =========================
    async getById(id) {
        try {
            return await this.database.user.findUnique({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    async getByEmail(email) {
        try {
            return await this.database.user.findUnique({
                where: {
                    email,
                },
            });
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // Create
    // =========================
    async create(data) {
        try {
            return await this.database.user.create({
                data,
            });
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_service_1.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AuthRepository);
