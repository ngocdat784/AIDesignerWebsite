import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { AuthRepository } from "../repositories/auth.repository";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const secret = configService.get<string>("JWT_SECRET");

        if (!secret) {
          throw new Error("JWT_SECRET is not configured.");
        }

        return {
          secret,

          signOptions: {
            expiresIn: "1d" as const,
          },
        };
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    AuthRepository,

    {
      provide: "AuthRepositoryInterface",
      useExisting: AuthRepository,
    },

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

    JwtModule,
  ],
})
export class AuthModule {}