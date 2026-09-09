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
exports.TemplateController = void 0;
const common_1 = require("@nestjs/common");
const template_service_1 = require("./template.service");
const create_template_dto_1 = require("./dto/create-template.dto");
const update_template_dto_1 = require("./dto/update-template.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let TemplateController = class TemplateController {
    constructor(templateService) {
        this.templateService = templateService;
    }
    // =========================================================
    // Public Query
    // =========================================================
    // GET /templates
    async getAll() {
        return this.templateService.getAll();
    }
    // GET /templates/slug/:slug
    async getBySlug(slug) {
        return this.templateService.getBySlug(slug);
    }
    // GET /templates/author/:authorId
    async getByAuthorId(authorId) {
        return this.templateService.getByAuthorId(authorId);
    }
    // GET /templates/category/:category
    async getByCategory(category) {
        return this.templateService.getByCategory(category);
    }
    // GET /templates/:id
    async getById(id) {
        return this.templateService.getById(id);
    }
    // =========================================================
    // Create
    // =========================================================
    // POST /templates
    //
    // CREATOR / ADMIN only
    //
    // authorId được xác định từ JWT,
    // không tin authorId do client gửi lên.
    async create(dto, user) {
        return this.templateService.create(dto, user);
    }
    // =========================================================
    // Update
    // =========================================================
    // PATCH /templates/:id
    //
    // CREATOR:
    //   chỉ sửa template của mình
    //
    // ADMIN:
    //   sửa mọi template
    async update(id, dto, user) {
        return this.templateService.update(id, dto, user);
    }
    // =========================================================
    // Delete
    // =========================================================
    // DELETE /templates/:id
    //
    // CREATOR:
    //   chỉ xóa template của mình
    //
    // ADMIN:
    //   xóa mọi template
    async delete(id, user) {
        return this.templateService.delete(id, user);
    }
};
exports.TemplateController = TemplateController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)("slug/:slug"),
    __param(0, (0, common_1.Param)("slug")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "getBySlug", null);
__decorate([
    (0, common_1.Get)("author/:authorId"),
    __param(0, (0, common_1.Param)("authorId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "getByAuthorId", null);
__decorate([
    (0, common_1.Get)("category/:category"),
    __param(0, (0, common_1.Param)("category")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "getByCategory", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "getById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)("CREATOR", "ADMIN"),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_template_dto_1.CreateTemplateDto, Object]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)("CREATOR", "ADMIN"),
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_template_dto_1.UpdateTemplateDto, Object]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, roles_decorator_1.Roles)("CREATOR", "ADMIN"),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TemplateController.prototype, "delete", null);
exports.TemplateController = TemplateController = __decorate([
    (0, common_1.Controller)("templates"),
    __param(0, (0, common_1.Inject)(template_service_1.TemplateService)),
    __metadata("design:paramtypes", [template_service_1.TemplateService])
], TemplateController);
