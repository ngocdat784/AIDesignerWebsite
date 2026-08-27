import { Module } from "@nestjs/common";

import { TemplateStyleController } from "./template-style.controller";
import { TemplateStyleService } from "./template-style.service";

import { DatabaseModule } from "../database/database.module";
import { TemplateStyleRepository } from "../repositories/template-style.repository";

import { TEMPLATE_STYLE_REPOSITORY } from "../common/constants/repository.tokens";

@Module({
  imports: [
    DatabaseModule,
  ],

  controllers: [
    TemplateStyleController,
  ],

  providers: [
    TemplateStyleService,

    {
      provide: TEMPLATE_STYLE_REPOSITORY,
      useClass: TemplateStyleRepository,
    },
  ],

  exports: [
    TemplateStyleService,

    // Cho TemplateModule / module khác sử dụng
    TEMPLATE_STYLE_REPOSITORY,
  ],
})
export class TemplateStyleModule {}