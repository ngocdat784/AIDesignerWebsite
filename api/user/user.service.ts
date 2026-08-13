import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { UserServiceInterface } from "./interfaces/user.service.interface";
import { USER_REPOSITORY } from "../common/constants/repository.tokens";
import { UserRepositoryInterface } from "./interfaces/user.repository.interface";

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async getAll() {
    return this.userRepository.getAll();
  }

  async getById(id: string) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundException(
        `User with id ${id} not found`,
      );
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundException(
        `User with email ${email} not found`,
      );
    }

    return user;
  }

  async create(data: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
    role?: "USER" | "CREATOR" | "ADMIN";
  }) {
    return this.userRepository.create(data);
  }

  async update(
    id: string,
    data: {
      name?: string;
      avatar?: string | null;
      email?: string;
      role?: "USER" | "CREATOR" | "ADMIN";
    },
  ) {
    return this.userRepository.update(id, data);
  }

  async delete(id: string) {
    return this.userRepository.delete(id);
  }
}