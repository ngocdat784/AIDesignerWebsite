import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { OrderRepository } from "../repositories/order.repository";

import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";

@Module({
  imports: [
    DatabaseModule,
  ],

  controllers: [
    OrderController,
  ],

  providers: [
    OrderRepository,
    OrderService,
  ],

  exports: [
    OrderRepository,
    OrderService,
  ],
})
export class OrderModule {}