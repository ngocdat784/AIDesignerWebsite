import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import { Request, Response } from "express";

import { ApiErrorResponse } from "../interfaces/api-error.interface";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(
    exception: unknown,
    host: ArgumentsHost,
  ): void {
    console.error(
      "HttpExceptionFilter caught exception:",
      exception,
    );

    const ctx = host.switchToHttp();

    const response =
      ctx.getResponse<Response>();

    const request =
      ctx.getRequest<Request>();

    let statusCode =
      HttpStatus.INTERNAL_SERVER_ERROR;

    let message = "Internal server error";

    let error = "Internal Server Error";

    let details: string[] | undefined;

    // =========================
    // HTTP EXCEPTION
    // =========================

    if (exception instanceof HttpException) {
      console.error("HttpExceptionFilter HttpException response:", exception.getStatus(), exception.getResponse());
      if (exception instanceof Error) {
        console.error("HttpExceptionFilter stack:", exception.stack);
      }
      statusCode = exception.getStatus();

      const exceptionResponse =
        exception.getResponse();

      // =========================
      // Response là string
      // =========================

      if (
        typeof exceptionResponse === "string"
      ) {
        message = exceptionResponse;
      }

      // =========================
      // Response là object
      // =========================

      else if (
        typeof exceptionResponse === "object" &&
        exceptionResponse !== null
      ) {
        const responseData =
          exceptionResponse as {
            message?: string | string[];
            error?: string;
          };

        // =========================
        // Validation errors
        // =========================

        if (
          Array.isArray(responseData.message)
        ) {
          message = "Validation failed";

          details =
            responseData.message;
        }

        // =========================
        // Normal HTTP error
        // =========================

        else if (
          typeof responseData.message ===
          "string"
        ) {
          message =
            responseData.message;
        }

        // =========================
        // Error name
        // =========================

        if (
          typeof responseData.error ===
          "string"
        ) {
          error =
            responseData.error;
        }
      }
    }

    // =========================
    // PRISMA CLIENT VALIDATION ERROR
    // =========================

    if (
      exception instanceof Error &&
      exception.name === "PrismaClientValidationError"
    ) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = "Validation failed";
      error = "Bad Request";
      details = [exception.message];
    }

    // =========================
    // UNKNOWN ERROR
    // =========================

    const errorResponse: ApiErrorResponse = {
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
}