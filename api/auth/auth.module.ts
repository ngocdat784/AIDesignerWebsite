import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { AuthRepository } from "../repositories/auth.repository";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],

  controllers: [AuthController],

  providers: [
    AuthService,
    AuthRepository,

    // Auth Repository Interface
    {
      provide: "AuthRepositoryInterface",
      useExisting: AuthRepository,
    },

    // Auth Service Interface
    {
      provide: "AuthServiceInterface",
      useExisting: AuthService,
    },
  ],

  exports: [
    AuthService,

    {
      provide: "AuthRepositoryInterface",
      useExisting: AuthRepository,
    },

    {
      provide: "AuthServiceInterface",
      useExisting: AuthService,
    },
  ],
})
export class AuthModule {}