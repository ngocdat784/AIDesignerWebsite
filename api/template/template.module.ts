import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { TemplateRepository } from "../repositories/template.repository";

import { TEMPLATE_REPOSITORY } from "../common/constants/repository.tokens";

import { TemplateStyleModule } from "../template-style/template-style.module";

import { TemplateService } from "./template.service";
import { TemplateController } from "./template.controller";

@Module({
  imports: [
    DatabaseModule,
    TemplateStyleModule,
  ],

  controllers: [
    TemplateController,
  ],

  providers: [
    TemplateService,

    {
      provide: TEMPLATE_REPOSITORY,
      useClass: TemplateRepository,
    },
  ],

  exports: [
    TemplateService,
    TEMPLATE_REPOSITORY,
  ],
})
export class TemplateModule {}