"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTemplateStyleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_template_style_dto_1 = require("./create-template-style.dto");
class UpdateTemplateStyleDto extends (0, mapped_types_1.PartialType)(create_template_style_dto_1.CreateTemplateStyleDto) {
}
exports.UpdateTemplateStyleDto = UpdateTemplateStyleDto;
