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
exports.TemplateStyleController = void 0;
const common_1 = require("@nestjs/common");
const create_template_style_dto_1 = require("./dto/create-template-style.dto");
const update_template_style_dto_1 = require("./dto/update-template-style.dto");
const template_style_service_1 = require("./template-style.service");
let TemplateStyleController = class TemplateStyleController {
    constructor(templateStyleService) {
        this.templateStyleService = templateStyleService;
    }
    // =========================
    // Create
    // POST /template-styles
    // =========================
    async create(createTemplateStyleDto) {
        return this.templateStyleService.create(createTemplateStyleDto);
    }
    // =========================
    // Find all
    // GET /template-styles
    // =========================
    async findAll() {
        return this.templateStyleService.findAll();
    }
    // =========================
    // Find active styles
    // GET /template-styles/active
    // =========================
    async findActive() {
        return this.templateStyleService.findActive();
    }
    // =========================
    // Find by slug
    // GET /template-styles/slug/:slug
    // =========================
    async findBySlug(slug) {
        return this.templateStyleService.findBySlug(slug);
    }
    // =========================
    // Find one
    // GET /template-styles/:id
    // =========================
    async findOne(id) {
        return this.templateStyleService.findOne(id);
    }
    // =========================
    // Update
    // PATCH /template-styles/:id
    // =========================
    async update(id, updateTemplateStyleDto) {
        return this.templateStyleService.update(id, updateTemplateStyleDto);
    }
    // =========================
    // Delete
    // DELETE /template-styles/:id
    // =========================
    async remove(id) {
        return this.templateStyleService.remove(id);
    }
};
exports.TemplateStyleController = TemplateStyleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_template_style_dto_1.CreateTemplateStyleDto]),
    __metadata("design:returntype", Promise)
], TemplateStyleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TemplateStyleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("active"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TemplateStyleController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)("slug/:slug"),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemplateStyleController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemplateStyleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_template_style_dto_1.UpdateTemplateStyleDto]),
    __metadata("design:returntype", Promise)
], TemplateStyleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemplateStyleController.prototype, "remove", null);
exports.TemplateStyleController = TemplateStyleController = __decorate([
    (0, common_1.Controller)("template-styles"),
    __param(0, (0, common_1.Inject)(template_style_service_1.TemplateStyleService)),
    __metadata("design:paramtypes", [template_style_service_1.TemplateStyleService])
], TemplateStyleController);
