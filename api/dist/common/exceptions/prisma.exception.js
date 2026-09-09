"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePrismaException = handlePrismaException;
const common_1 = require("@nestjs/common");
function isPrismaKnownError(exception) {
    if (typeof exception !== "object" ||
        exception === null) {
        return false;
    }
    const error = exception;
    return (typeof error.code === "string" &&
        /^P\d{4}$/.test(error.code));
}
function handlePrismaException(exception) {
    if (!isPrismaKnownError(exception)) {
        throw exception;
    }
    switch (exception.code) {
        // =========================
        // Record not found
        // =========================
        case "P2025":
            throw new common_1.NotFoundException("Resource not found.");
        // =========================
        // Unique constraint violation
        // =========================
        case "P2002":
            throw new common_1.ConflictException("Resource already exists.");
        // =========================
        // Foreign key constraint
        // =========================
        case "P2003":
            throw new common_1.BadRequestException("Related resource does not exist.");
        // =========================
        // Invalid value
        // =========================
        case "P2006":
        case "P2011":
        case "P2012":
        case "P2013":
        case "P2014":
        case "P2015":
        case "P2016":
        case "P2019":
            throw new common_1.BadRequestException("Invalid database operation.");
        // =========================
        // Other Prisma errors
        // =========================
        default:
            throw new common_1.InternalServerErrorException("Database operation failed.");
    }
}
