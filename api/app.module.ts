import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import { TemplateModule } from "./template/template.module";
import { OrderModule } from "./order/order.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,
    UserModule,
    TemplateModule,
    OrderModule,
    AuthModule,
  ],
})
export class AppModule {}