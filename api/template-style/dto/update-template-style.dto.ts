import { PartialType } from "@nestjs/mapped-types";
import { CreateTemplateStyleDto } from "./create-template-style.dto";

export class UpdateTemplateStyleDto extends PartialType(
  CreateTemplateStyleDto,
) {}