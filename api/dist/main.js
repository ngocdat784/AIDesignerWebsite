"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // =========================
    // CORS
    // =========================
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3001";
    app.enableCors({
        origin: [
            frontendUrl,
            "http://localhost:3000",
            "http://localhost:3001",
        ],
        credentials: true,
    });
    // =========================
    // Global Validation
    // =========================
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    // =========================
    // Global Response Interceptor
    // =========================
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    // =========================
    // Global Exception Filter
    // =========================
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    // =========================
    // Start Server
    // =========================
    const port = Number(process.env.PORT) || 3000;
    await app.listen(port, "0.0.0.0");
    console.log(`NestJS API running on port ${port}`);
}
bootstrap();
