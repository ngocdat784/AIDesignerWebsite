import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";
import { OrderRepository } from "../repositories/order.repository";

import { ORDER_REPOSITORY } from "../common/constants/repository.tokens";

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
    OrderService,

    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepository,
    },
  ],

  exports: [
    OrderService,
  ],
})
export class OrderModule {}