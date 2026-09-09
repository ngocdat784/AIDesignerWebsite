"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        console.error("HttpExceptionFilter caught exception:", exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal server error";
        let error = "Internal Server Error";
        let details;
        // =========================
        // HTTP EXCEPTION
        // =========================
        if (exception instanceof common_1.HttpException) {
            console.error("HttpExceptionFilter HttpException response:", exception.getStatus(), exception.getResponse());
            if (exception instanceof Error) {
                console.error("HttpExceptionFilter stack:", exception.stack);
            }
            statusCode = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            // =========================
            // Response là string
            // =========================
            if (typeof exceptionResponse === "string") {
                message = exceptionResponse;
            }
            // =========================
            // Response là object
            // =========================
            else if (typeof exceptionResponse === "object" &&
                exceptionResponse !== null) {
                const responseData = exceptionResponse;
                // =========================
                // Validation errors
                // =========================
                if (Array.isArray(responseData.message)) {
                    message = "Validation failed";
                    details =
                        responseData.message;
                }
                // =========================
                // Normal HTTP error
                // =========================
                else if (typeof responseData.message ===
                    "string") {
                    message =
                        responseData.message;
                }
                // =========================
                // Error name
                // =========================
                if (typeof responseData.error ===
                    "string") {
                    error =
                        responseData.error;
                }
            }
        }
        // =========================
        // PRISMA CLIENT VALIDATION ERROR
        // =========================
        if (exception instanceof Error &&
            exception.name === "PrismaClientValidationError") {
            statusCode = common_1.HttpStatus.BAD_REQUEST;
            message = "Validation failed";
            error = "Bad Request";
            details = [exception.message];
        }
        // =========================
        // UNKNOWN ERROR
        // =========================
        const errorResponse = {
            success: false,
            statusCode,
            message,
            error,
            timestamp: new Date().toISOString(),
            path: request.url,
            ...(details
                ? { details }
                : {}),
        };
        response
            .status(statusCode)
            .json(errorResponse);
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
