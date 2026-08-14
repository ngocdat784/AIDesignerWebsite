import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { AuthRepository } from "../repositories/auth.repository";
import { DatabaseModule } from "../database/database.module";
import { RoleGuard } from "./guards/role.guard";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    DatabaseModule,

    // Passport + Config + JWT
    PassportModule.register({ defaultStrategy: "jwt" }),
    ConfigModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const secret =
          configService.get<string>("JWT_SECRET");

        if (!secret) {
          throw new Error(
            "JWT_SECRET is not configured.",
          );
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
    RoleGuard,
    // JWT Strategy
    JwtStrategy,

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

    // Export JwtModule để các module khác
    // có thể sử dụng JwtService khi cần
    JwtModule,
  ],
})
export class AuthModule {}