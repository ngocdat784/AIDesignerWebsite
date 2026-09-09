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
exports.OrderRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const prisma_exception_1 = require("../common/exceptions/prisma.exception");
let OrderRepository = class OrderRepository {
    constructor(database) {
        this.database = database;
    }
    // =========================
    // Query
    // =========================
    async getAll() {
        try {
            return await this.database.order.findMany({
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                            email: true,
                            role: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                    billing: true,
                    items: true,
                },
            });
        }
        catch (error) {
            throw (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    async getById(id) {
        try {
            return await this.database.order.findUnique({
                where: {
                    id,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                            email: true,
                            role: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                    billing: true,
                    items: true,
                },
            });
        }
        catch (error) {
            throw (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    async getByUserId(userId) {
        try {
            return await this.database.order.findMany({
                where: {
                    userId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    billing: true,
                    items: true,
                },
            });
        }
        catch (error) {
            throw (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    async getByStatus(status) {
        try {
            return await this.database.order.findMany({
                where: {
                    status,
                },
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    billing: true,
                    items: true,
                },
            });
        }
        catch (error) {
            throw (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // Create
    // =========================
    async create(data) {
        try {
            return await this.database.order.create({
                data: {
                    id: data.id,
                    userId: data.userId,
                    status: data.status ?? "PENDING",
                    paymentMethod: data.paymentMethod,
                    subtotal: data.subtotal,
                    discount: data.discount,
                    total: data.total,
                    // =========================
                    // Billing
                    // =========================
                    billing: {
                        create: {
                            firstName: data.billing.firstName,
                            lastName: data.billing.lastName,
                            email: data.billing.email,
                            phone: data.billing.phone,
                            address: data.billing.address,
                            city: data.billing.city,
                            country: data.billing.country,
                            postalCode: data.billing.postalCode,
                        },
                    },
                    // =========================
                    // Order Items
                    // =========================
                    items: {
                        create: data.items.map((item) => ({
                            id: item.id,
                            productId: item.productId,
                            productName: item.productName,
                            // =========================
                            // Style Snapshot
                            // =========================
                            styleId: item.styleId ?? null,
                            styleSlug: item.styleSlug ?? null,
                            styleName: item.styleName ?? null,
                            // =========================
                            // Pricing
                            // =========================
                            unitPrice: item.unitPrice,
                            quantity: item.quantity,
                            subtotal: item.subtotal,
                        })),
                    },
                },
                include: {
                    billing: true,
                    items: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                            email: true,
                            role: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            throw (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // Update
    // =========================
    async update(id, data) {
        try {
            return await this.database.order.update({
                where: {
                    id,
                },
                data,
                include: {
                    billing: true,
                    items: true,
                    user: {
                        select: {
                            id: true,
                            name: true,
                            avatar: true,
                            email: true,
                            role: true,
                            createdAt: true,
                            updatedAt: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            throw (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // Delete
    // =========================
    async delete(id) {
        try {
            return await this.database.order.delete({
                where: {
                    id,
                },
            });
        }
        catch (error) {
            throw (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
};
exports.OrderRepository = OrderRepository;
exports.OrderRepository = OrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_service_1.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], OrderRepository);
