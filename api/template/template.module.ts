import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { TemplateRepository } from "../repositories/template.repository";

import { TEMPLATE_REPOSITORY } from "../common/constants/repository.tokens";

import { TemplateService } from "./template.service";
import { TemplateController } from "./template.controller";

@Module({
  imports: [
    DatabaseModule,
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
  ],
})
export class TemplateModule {}