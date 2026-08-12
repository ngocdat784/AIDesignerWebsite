import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { TemplateRepository } from "../repositories/template.repository";

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
    TemplateRepository,
    TemplateService,
  ],
  exports: [
    TemplateRepository,
    TemplateService,
  ],
})
export class TemplateModule {}