"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateStyleModule = void 0;
const common_1 = require("@nestjs/common");
const template_style_controller_1 = require("./template-style.controller");
const template_style_service_1 = require("./template-style.service");
const database_module_1 = require("../database/database.module");
const template_style_repository_1 = require("../repositories/template-style.repository");
const repository_tokens_1 = require("../common/constants/repository.tokens");
let TemplateStyleModule = class TemplateStyleModule {
};
exports.TemplateStyleModule = TemplateStyleModule;
exports.TemplateStyleModule = TemplateStyleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
        ],
        controllers: [
            template_style_controller_1.TemplateStyleController,
        ],
        providers: [
            template_style_service_1.TemplateStyleService,
            {
                provide: repository_tokens_1.TEMPLATE_STYLE_REPOSITORY,
                useClass: template_style_repository_1.TemplateStyleRepository,
            },
        ],
        exports: [
            template_style_service_1.TemplateStyleService,
            // Cho TemplateModule / module khác sử dụng
            repository_tokens_1.TEMPLATE_STYLE_REPOSITORY,
        ],
    })
], TemplateStyleModule);
