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
exports.TemplateStyleService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const repository_tokens_1 = require("../common/constants/repository.tokens");
let TemplateStyleService = class TemplateStyleService {
    constructor(templateStyleRepository) {
        this.templateStyleRepository = templateStyleRepository;
    }
    // =========================
    // Create
    // =========================
    async create(createTemplateStyleDto) {
        // =========================
        // Check duplicate slug
        // =========================
        const existingStyle = await this.templateStyleRepository.findBySlug(createTemplateStyleDto.slug);
        if (existingStyle) {
            throw new common_1.ConflictException("Template style with this slug already exists");
        }
        // =========================
        // Create
        // =========================
        return this.templateStyleRepository.create({
            id: (0, crypto_1.randomUUID)(),
            slug: createTemplateStyleDto.slug,
            name: createTemplateStyleDto.name,
            description: createTemplateStyleDto.description ?? null,
            colors: createTemplateStyleDto.colors ?? null,
            gradients: createTemplateStyleDto.gradients ?? null,
            typography: createTemplateStyleDto.typography ?? null,
            layout: createTemplateStyleDto.layout ?? null,
            previewImage: createTemplateStyleDto.previewImage ?? null,
            isActive: createTemplateStyleDto.isActive ?? true,
        });
    }
    // =========================
    // Find all
    // =========================
    async findAll() {
        return this.templateStyleRepository.findAll();
    }
    // =========================
    // Find active
    // =========================
    async findActive() {
        return this.templateStyleRepository.findActive();
    }
    // =========================
    // Find one
    // =========================
    async findOne(id) {
        const style = await this.templateStyleRepository.findById(id);
        if (!style) {
            throw new common_1.NotFoundException(`Template style with ID "${id}" not found`);
        }
        return style;
    }
    // =========================
    // Find by slug
    // =========================
    async findBySlug(slug) {
        const style = await this.templateStyleRepository.findBySlug(slug);
        if (!style) {
            throw new common_1.NotFoundException(`Template style with slug "${slug}" not found`);
        }
        return style;
    }
    // =========================
    // Update
    // =========================
    async update(id, updateTemplateStyleDto) {
        // =========================
        // Check existing style
        // =========================
        const existingStyle = await this.templateStyleRepository.findById(id);
        if (!existingStyle) {
            throw new common_1.NotFoundException(`Template style with ID "${id}" not found`);
        }
        // =========================
        // Check duplicate slug
        // =========================
        if (updateTemplateStyleDto.slug &&
            updateTemplateStyleDto.slug !==
                existingStyle.slug) {
            const slugExists = await this.templateStyleRepository.findBySlug(updateTemplateStyleDto.slug);
            if (slugExists) {
                throw new common_1.ConflictException("Template style with this slug already exists");
            }
        }
        // =========================
        // Update
        // =========================
        return this.templateStyleRepository.update(id, updateTemplateStyleDto);
    }
    // =========================
    // Remove
    // =========================
    async remove(id) {
        // =========================
        // Check existing style
        // =========================
        const existingStyle = await this.templateStyleRepository.findById(id);
        if (!existingStyle) {
            throw new common_1.NotFoundException(`Template style with ID "${id}" not found`);
        }
        // =========================
        // Delete
        // =========================
        return this.templateStyleRepository.delete(id);
    }
};
exports.TemplateStyleService = TemplateStyleService;
exports.TemplateStyleService = TemplateStyleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(repository_tokens_1.TEMPLATE_STYLE_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], TemplateStyleService);
