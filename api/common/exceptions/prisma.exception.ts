import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

interface PrismaKnownError {
  code: string;
  meta?: Record<string, unknown>;
}

function isPrismaKnownError(
  exception: unknown,
): exception is PrismaKnownError {
  if (
    typeof exception !== "object" ||
    exception === null
  ) {
    return false;
  }

  const error = exception as Record<string, unknown>;

  return (
    typeof error.code === "string" &&
    /^P\d{4}$/.test(error.code)
  );
}

export function handlePrismaException(
  exception: unknown,
): never {
  if (!isPrismaKnownError(exception)) {
    throw exception;
  }

  switch (exception.code) {
    // =========================
    // Record not found
    // =========================
    case "P2025":
      throw new NotFoundException(
        "Resource not found.",
      );

    // =========================
    // Unique constraint violation
    // =========================
    case "P2002":
      throw new ConflictException(
        "Resource already exists.",
      );

    // =========================
    // Foreign key constraint
    // =========================
    case "P2003":
      throw new BadRequestException(
        "Related resource does not exist.",
      );

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
      throw new BadRequestException(
        "Invalid database operation.",
      );

    // =========================
    // Other Prisma errors
    // =========================
    default:
      throw new InternalServerErrorException(
        "Database operation failed.",
      );
  }
}