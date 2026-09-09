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
exports.TemplateRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const database_service_1 = require("../database/database.service");
const prisma_exception_1 = require("../common/exceptions/prisma.exception");
let TemplateRepository = class TemplateRepository {
    constructor(database) {
        this.database = database;
    }
    // =========================
    // Query
    // =========================
    async getAll() {
        try {
            return await this.database.template.findMany({
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    author: true,
                    style: true,
                },
            });
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // GET /templates/:id
    // =========================
    async getById(id) {
        try {
            return await this.database.template.findUnique({
                where: {
                    id,
                },
                include: {
                    author: true,
                    style: true,
                },
            });
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // GET /templates/slug/:slug
    // =========================
    async getBySlug(slug) {
        try {
            return await this.database.template.findUnique({
                where: {
                    slug,
                },
                include: {
                    author: true,
                    style: true,
                },
            });
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // GET /templates/author/:authorId
    // =========================
    async getByAuthorId(authorId) {
        try {
            return await this.database.template.findMany({
                where: {
                    authorId,
                },
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    author: true,
                    style: true,
                },
            });
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // GET /templates/category/:category
    // =========================
    async getByCategory(category) {
        try {
            return await this.database.template.findMany({
                where: {
                    category,
                },
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    author: true,
                    style: true,
                },
            });
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // GET style by Template
    // =========================
    async getStyleByTemplateId(templateId) {
        try {
            const template = await this.database.template.findUnique({
                where: {
                    id: templateId,
                },
                select: {
                    style: true,
                },
            });
            return template?.style ?? null;
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // GET style by ID
    // =========================
    async getStyleById(styleId) {
        try {
            return await this.database.templateStyle.findUnique({
                where: {
                    id: styleId,
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
            return await this.database.template.create({
                data: {
                    // =========================
                    // Basic
                    // =========================
                    id: data.id,
                    slug: data.slug,
                    title: data.title,
                    description: data.description,
                    thumbnail: data.thumbnail,
                    // =========================
                    // Images
                    // =========================
                    coverImage: data.coverImage ?? null,
                    images: data.images ?? [],
                    gallery: data.gallery ?? [],
                    // =========================
                    // Category / Tags
                    // =========================
                    category: data.category,
                    tags: data.tags ?? [],
                    relatedTemplateIds: data.relatedTemplateIds ?? [],
                    // =========================
                    // Author
                    // =========================
                    authorId: data.authorId,
                    // =========================
                    // Technology
                    // =========================
                    techStack: data.techStack ?? [],
                    // =========================
                    // Template Style
                    // =========================
                    styleId: data.styleId ?? null,
                    // =========================
                    // Detail
                    // =========================
                    includedFiles: data.includedFiles === null
                        ? client_1.Prisma.JsonNull
                        : (data.includedFiles ?? undefined),
                    features: data.features ?? [],
                    installationSteps: data.installationSteps ?? [],
                    requirements: data.requirements ?? [],
                    changelog: data.changelog === null
                        ? client_1.Prisma.JsonNull
                        : (data.changelog ?? undefined),
                    // =========================
                    // Statistics
                    // =========================
                    rating: data.rating ?? 0,
                    reviews: data.reviews ?? 0,
                    downloads: data.downloads ?? 0,
                    favorites: data.favorites ?? 0,
                    views: data.views ?? 0,
                    // =========================
                    // Pricing
                    // =========================
                    price: data.price,
                    originalPrice: data.originalPrice ?? null,
                    discountPrice: data.discountPrice ?? null,
                    // =========================
                    // Status
                    // =========================
                    featured: data.featured ?? false,
                    newest: data.newest ?? false,
                    isFeatured: data.isFeatured ?? false,
                    isPremium: data.isPremium ?? false,
                    status: data.status ?? "published",
                    stock: data.stock ?? null,
                    license: data.license ?? null,
                    // =========================
                    // Demo / Version
                    // =========================
                    demoUrl: data.demoUrl ?? undefined,
                    version: data.version ?? undefined,
                    createdAt: data.createdAt ?? undefined,
                    updatedAt: data.updatedAt ?? undefined,
                },
                include: {
                    author: true,
                    style: true,
                },
            });
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // Update
    // =========================
    async update(id, data) {
        try {
            return await this.database.template.update({
                where: {
                    id,
                },
                data: {
                    // =========================
                    // Basic
                    // =========================
                    ...(data.slug !== undefined && {
                        slug: data.slug,
                    }),
                    ...(data.title !== undefined && {
                        title: data.title,
                    }),
                    ...(data.description !== undefined && {
                        description: data.description,
                    }),
                    ...(data.thumbnail !== undefined && {
                        thumbnail: data.thumbnail,
                    }),
                    // =========================
                    // Images
                    // =========================
                    ...(data.coverImage !== undefined && {
                        coverImage: data.coverImage,
                    }),
                    ...(data.images !== undefined && {
                        images: data.images,
                    }),
                    ...(data.gallery !== undefined && {
                        gallery: data.gallery,
                    }),
                    // =========================
                    // Category / Tags
                    // =========================
                    ...(data.category !== undefined && {
                        category: data.category,
                    }),
                    ...(data.tags !== undefined && {
                        tags: data.tags,
                    }),
                    ...(data.relatedTemplateIds !== undefined && {
                        relatedTemplateIds: data.relatedTemplateIds,
                    }),
                    // =========================
                    // Technology
                    // =========================
                    ...(data.techStack !== undefined && {
                        techStack: data.techStack,
                    }),
                    // =========================
                    // Template Style
                    // =========================
                    ...(data.styleId !== undefined && {
                        styleId: data.styleId,
                    }),
                    // =========================
                    // Detail
                    // =========================
                    ...(data.includedFiles !== undefined && {
                        includedFiles: data.includedFiles === null
                            ? client_1.Prisma.JsonNull
                            : data.includedFiles,
                    }),
                    ...(data.features !== undefined && {
                        features: data.features,
                    }),
                    ...(data.installationSteps !== undefined && {
                        installationSteps: data.installationSteps,
                    }),
                    ...(data.requirements !== undefined && {
                        requirements: data.requirements,
                    }),
                    ...(data.changelog !== undefined && {
                        changelog: data.changelog === null
                            ? client_1.Prisma.JsonNull
                            : data.changelog,
                    }),
                    // =========================
                    // Statistics
                    // =========================
                    ...(data.rating !== undefined && {
                        rating: data.rating,
                    }),
                    ...(data.reviews !== undefined && {
                        reviews: data.reviews,
                    }),
                    ...(data.downloads !== undefined && {
                        downloads: data.downloads,
                    }),
                    ...(data.favorites !== undefined && {
                        favorites: data.favorites,
                    }),
                    ...(data.views !== undefined && {
                        views: data.views,
                    }),
                    // =========================
                    // Pricing
                    // =========================
                    ...(data.price !== undefined && {
                        price: data.price,
                    }),
                    ...(data.originalPrice !== undefined && {
                        originalPrice: data.originalPrice,
                    }),
                    ...(data.discountPrice !== undefined && {
                        discountPrice: data.discountPrice,
                    }),
                    // =========================
                    // Status
                    // =========================
                    ...(data.featured !== undefined && {
                        featured: data.featured,
                    }),
                    ...(data.newest !== undefined && {
                        newest: data.newest,
                    }),
                    ...(data.isFeatured !== undefined && {
                        isFeatured: data.isFeatured,
                    }),
                    ...(data.isPremium !== undefined && {
                        isPremium: data.isPremium,
                    }),
                    ...(data.status !== undefined && {
                        status: data.status,
                    }),
                    ...(data.stock !== undefined && {
                        stock: data.stock,
                    }),
                    ...(data.license !== undefined && {
                        license: data.license,
                    }),
                    // =========================
                    // Demo / Version
                    // =========================
                    ...(data.demoUrl !== undefined && {
                        demoUrl: data.demoUrl,
                    }),
                    ...(data.version !== undefined && {
                        version: data.version,
                    }),
                    ...(data.createdAt !== undefined && {
                        createdAt: data.createdAt,
                    }),
                    ...(data.updatedAt !== undefined && {
                        updatedAt: data.updatedAt,
                    }),
                },
                include: {
                    author: true,
                    style: true,
                },
            });
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
    // =========================
    // Delete
    // =========================
    async delete(id) {
        try {
            return await this.database.template.delete({
                where: {
                    id,
                },
                include: {
                    author: true,
                    style: true,
                },
            });
        }
        catch (error) {
            (0, prisma_exception_1.handlePrismaException)(error);
        }
    }
};
exports.TemplateRepository = TemplateRepository;
exports.TemplateRepository = TemplateRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(database_service_1.DatabaseService)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], TemplateRepository);
