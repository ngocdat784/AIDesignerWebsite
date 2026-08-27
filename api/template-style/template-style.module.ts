import { Module } from "@nestjs/common";

import { TemplateStyleController } from "./template-style.controller";
import { TemplateStyleService } from "./template-style.service";

import { TemplateStyleRepository } from "../repositories/template-style.repository";

@Module({
  controllers: [TemplateStyleController],

  providers: [
    TemplateStyleService,
    TemplateStyleRepository,
  ],

  exports: [
    TemplateStyleService,
    TemplateStyleRepository,
  ],
})
export class TemplateStyleModule {}