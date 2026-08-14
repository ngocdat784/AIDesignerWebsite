import "reflect-metadata";

import {
  ValidationPipe,
} from "@nestjs/common";

import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

import { ResponseInterceptor } from "./common/interceptors/response.interceptor";


async function bootstrap() {
  const app =
    await NestFactory.create(AppModule);


  // =========================
  // CORS
  // =========================

  app.enableCors({
    origin: [
      "http://localhost:3001",
      "http://localhost:3000",
    ],
    credentials: true,
  });


  // =========================
  // Global Validation
  // =========================

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );


  // =========================
  // Global Response Interceptor
  // =========================

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
  );


  // =========================
  // Global Exception Filter
  // =========================

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );


  // =========================
  // Start Server
  // =========================

  const port =
    Number(process.env.PORT) || 3000;

  await app.listen(port);


  console.log(
    `NestJS API running at http://localhost:${port}`,
  );
}


bootstrap();