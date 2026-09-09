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
exports.TemplateService = void 0;
const common_1 = require("@nestjs/common");
const repository_tokens_1 = require("../common/constants/repository.tokens");
let TemplateService = class TemplateService {
    constructor(templateRepository, templateStyleRepository) {
        this.templateRepository = templateRepository;
        this.templateStyleRepository = templateStyleRepository;
    }
    // =========================================================
    // Query
    // =========================================================
    async getAll() {
        return this.templateRepository.getAll();
    }
    // =========================================================
    // GET /templates/:id
    // =========================================================
    async getById(id) {
        const template = await this.templateRepository.getById(id);
        if (!template) {
            throw new common_1.NotFoundException(`Template with id ${id} not found.`);
        }
        return template;
    }
    // =========================================================
    // GET /templates/slug/:slug
    // =========================================================
    async getBySlug(slug) {
        const template = await this.templateRepository.getBySlug(slug);
        if (!template) {
            throw new common_1.NotFoundException(`Template with slug ${slug} not found.`);
        }
        return template;
    }
    // =========================================================
    // GET /templates/author/:authorId
    // =========================================================
    async getByAuthorId(authorId) {
        return this.templateRepository.getByAuthorId(authorId);
    }
    // =========================================================
    // GET /templates/category/:category
    // =========================================================
    async getByCategory(category) {
        return this.templateRepository.getByCategory(category);
    }
    // =========================================================
    // Validate Template Style
    // =========================================================
    async validateStyle(styleId) {
        /*
         * Không truyền styleId:
         * Không cần kiểm tra.
         */
        if (styleId === undefined) {
            return;
        }
        /*
         * styleId = null:
         * Cho phép template không sử dụng style.
         */
        if (styleId === null) {
            return;
        }
        /*
         * styleId có giá trị:
         * Kiểm tra TemplateStyle tồn tại.
         */
        const style = await this.templateStyleRepository.findById(styleId);
        if (!style) {
            throw new common_1.NotFoundException(`Template style with id ${styleId} not found.`);
        }
        /*
         * Không cho gán style đã bị inactive.
         */
        if (!style.isActive) {
            throw new common_1.ForbiddenException(`Template style with id ${styleId} is inactive.`);
        }
    }
    // =========================================================
    // Create
    // =========================================================
    async create(dto, user) {
        /*
         * RoleGuard đã đảm bảo user là:
         *
         * CREATOR hoặc ADMIN
         *
         * Không lấy authorId từ request body.
         * Template luôn được gắn với user hiện tại.
         */
        /*
         * Kiểm tra style trước khi tạo template.
         */
        await this.validateStyle(dto.styleId);
        const data = {
            ...dto,
            authorId: user.id,
        };
        return this.templateRepository.create(data);
    }
    // =========================================================
    // Update
    // =========================================================
    async update(id, dto, user) {
        /*
         * Kiểm tra template tồn tại trước.
         */
        const template = await this.templateRepository.getById(id);
        if (!template) {
            throw new common_1.NotFoundException(`Template with id ${id} not found.`);
        }
        /*
         * Nếu request muốn thay đổi style,
         * kiểm tra style mới trước.
         *
         * Nếu styleId không xuất hiện trong request,
         * giữ nguyên style hiện tại.
         */
        if (dto.styleId !== undefined) {
            await this.validateStyle(dto.styleId);
        }
        /*
         * ADMIN:
         *
         * Có quyền sửa mọi template.
         */
        if (user.role === "ADMIN") {
            return this.templateRepository.update(id, dto);
        }
        /*
         * CREATOR:
         *
         * Chỉ được sửa template của chính mình.
         */
        if (user.role === "CREATOR" &&
            template.authorId !== user.id) {
            throw new common_1.ForbiddenException("You can only update your own templates.");
        }
        return this.templateRepository.update(id, dto);
    }
    // =========================================================
    // Delete
    // =========================================================
    async delete(id, user) {
        /*
         * Kiểm tra template tồn tại.
         */
        const template = await this.templateRepository.getById(id);
        if (!template) {
            throw new common_1.NotFoundException(`Template with id ${id} not found.`);
        }
        /*
         * ADMIN:
         *
         * Có quyền xóa mọi template.
         */
        if (user.role === "ADMIN") {
            return this.templateRepository.delete(id);
        }
        /*
         * CREATOR:
         *
         * Chỉ được xóa template của chính mình.
         */
        if (user.role === "CREATOR" &&
            template.authorId !== user.id) {
            throw new common_1.ForbiddenException("You can only delete your own templates.");
        }
        return this.templateRepository.delete(id);
    }
};
exports.TemplateService = TemplateService;
exports.TemplateService = TemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(repository_tokens_1.TEMPLATE_REPOSITORY)),
    __param(1, (0, common_1.Inject)("TEMPLATE_STYLE_REPOSITORY")),
    __metadata("design:paramtypes", [Object, Object])
], TemplateService);
