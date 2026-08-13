import { Module } from "@nestjs/common";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserRepository } from "../repositories/user.repository";

import { USER_REPOSITORY } from "../common/constants/repository.tokens";

@Module({
  controllers: [UserController],

  providers: [
    UserService,

    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],

  exports: [
    UserService,
  ],
})
export class UserModule {}