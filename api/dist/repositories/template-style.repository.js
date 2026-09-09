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
exports.TemplateStyleRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let TemplateStyleRepository = class TemplateStyleRepository {
    constructor(database) {
        this.database = database;
    }
    // =========================
    // Create
    // =========================
    async create(data) {
        return this.database.templateStyle.create({
            data: {
                id: data.id,
                slug: data.slug,
                name: data.name,
                description: data.description ?? null,
                colors: data.colors ?? undefined,
                gradients: data.gradients ?? undefined,
                typography: data.typography ?? undefined,
                layout: data.layout ?? undefined,
                previewImage: data.previewImage ?? null,
                isActive: data.isActive ?? true,
            },
        });
    }
    // =========================
    // Find all
    // =========================
    async findAll() {
        return this.database.templateStyle.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    // =========================
    // Find active
    // =========================
    async findActive() {
        return this.database.templateStyle.findMany({
            where: {
                isActive: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    // =========================
    // Find by ID
    // =========================
    async findById(id) {
        return this.database.templateStyle.findUnique({
            where: {
                id,
            },
        });
    }
    // =========================
    // Find by slug
    // =========================
    async findBySlug(slug) {
        return this.database.templateStyle.findUnique({
            where: {
                slug,
            },
        });
    }
    // =========================
    // Update
    // =========================
    async update(id, data) {
        return this.database.templateStyle.update({
            where: {
                id,
            },
            data: {
                ...(data.slug !== undefined && {
                    slug: data.slug,
                }),
                ...(data.name !== undefined && {
                    name: data.name,
                }),
                ...(data.description !== undefined && {
                    description: data.description,
                }),
                ...(data.colors !== undefined && {
                    colors: data.colors ?? undefined,
                }),
                ...(data.gradients !== undefined && {
                    gradients: data.gradients ?? undefined,
                }),
                ...(data.typography !== undefined && {
                    typography: data.typography ?? undefined,
                }),
                ...(data.layout !== undefined && {
                    layout: data.layout ?? undefined,
                }),
                ...(data.previewImage !== undefined && {
                    previewImage: data.previewImage,
                }),
                ...(data.isActive !== undefined && {
                    isActive: data.isActive,
                }),
            },
        });
    }
    // =========================
    // Delete
    // =========================
    async delete(id) {
        return this.database.templateStyle.delete({
            where: {
                id,
            },
        });
    }
    // =========================
    // Exists by ID
    // =========================
    async existsById(id) {
        const style = await this.database.templateStyle.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
        return !!style;
    }
    // =========================
    // Exists by slug
    // =========================
    async existsBySlug(slug) {
        const style = await this.database.templateStyle.findUnique({
            where: {
                slug,
            },
            select: {
                id: true,
            },
        });
        return !!style;
    }
};
exports.TemplateStyleRepository = TemplateStyleRepository;
exports.TemplateStyleRepository = TemplateStyleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_service_1.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TemplateStyleRepository);
