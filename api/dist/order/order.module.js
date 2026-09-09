"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const template_module_1 = require("../template/template.module");
const order_repository_1 = require("../repositories/order.repository");
const repository_tokens_1 = require("../common/constants/repository.tokens");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            template_module_1.TemplateModule,
        ],
        controllers: [
            order_controller_1.OrderController,
        ],
        providers: [
            order_service_1.OrderService,
            {
                provide: repository_tokens_1.ORDER_REPOSITORY,
                useClass: order_repository_1.OrderRepository,
            },
        ],
        exports: [
            order_service_1.OrderService,
        ],
    })
], OrderModule);
