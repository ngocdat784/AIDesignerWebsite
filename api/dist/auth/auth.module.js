"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const auth_repository_1 = require("../repositories/auth.repository");
const database_module_1 = require("../database/database.module");
const role_guard_1 = require("./guards/role.guard");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            // Passport + Config + JWT
            passport_1.PassportModule.register({ defaultStrategy: "jwt" }),
            config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const secret = configService.get("JWT_SECRET");
                    if (!secret) {
                        throw new Error("JWT_SECRET is not configured.");
                    }
                    return {
                        secret,
                        signOptions: {
                            expiresIn: "1d",
                        },
                    };
                },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            auth_repository_1.AuthRepository,
            role_guard_1.RoleGuard,
            // JWT Strategy
            jwt_strategy_1.JwtStrategy,
            // Auth Repository Interface
            {
                provide: "AuthRepositoryInterface",
                useExisting: auth_repository_1.AuthRepository,
            },
            // Auth Service Interface
            {
                provide: "AuthServiceInterface",
                useExisting: auth_service_1.AuthService,
            },
        ],
        exports: [
            auth_service_1.AuthService,
            // Auth Repository Interface
            {
                provide: "AuthRepositoryInterface",
                useExisting: auth_repository_1.AuthRepository,
            },
            // Auth Service Interface
            {
                provide: "AuthServiceInterface",
                useExisting: auth_service_1.AuthService,
            },
            // Export JwtModule để các module khác
            // có thể sử dụng JwtService khi cần
            jwt_1.JwtModule,
        ],
    })
], AuthModule);
