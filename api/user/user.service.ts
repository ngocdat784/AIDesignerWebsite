import {
  Injectable,
  Inject,
  NotFoundException,
} from "@nestjs/common";

import * as bcrypt from "bcrypt";

import { UserServiceInterface } from "./interfaces/user.service.interface";
import { UserRepositoryInterface } from "./interfaces/user.repository.interface";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { USER_REPOSITORY } from "../common/constants/repository.tokens";

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  // =========================
  // Query
  // =========================

  async getAll() {
    return this.userRepository.getAll();
  }

  async getById(id: string) {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundException(
        `User with id ${id} not found.`,
      );
    }

    return user;
  }

  async getByEmail(email: string) {
    const user =
      await this.userRepository.getByEmail(email);

    if (!user) {
      throw new NotFoundException(
        `User with email ${email} not found.`,
      );
    }

    return user;
  }

  // =========================
  // Create
  // =========================

  async create(dto: CreateUserDto) {
    /*
     * Không xử lý P2002 ở đây.
     *
     * Nếu id/email đã tồn tại:
     *
     * Prisma P2002
     *      ↓
     * UserRepository
     *      ↓
     * handlePrismaException()
     *      ↓
     * ConflictException
     */
    const passwordHash = await bcrypt.hash(dto.password, 10);

    return this.userRepository.create({
      id: dto.id,
      name: dto.name,
      avatar: dto.avatar ?? null,
      email: dto.email,
      passwordHash,
      role: dto.role,
    });
  }

  // =========================
  // Update
  // =========================

  async update(
    id: string,
    dto: UpdateUserDto,
  ) {
    /*
     * Kiểm tra User trước khi update.
     *
     * Nếu không tồn tại:
     * → NotFoundException
     */
    await this.getById(id);

    /*
     * Nếu email mới bị trùng:
     *
     * Prisma P2002
     *      ↓
     * Repository
     *      ↓
     * ConflictException
     */
    return this.userRepository.update(id, dto);
  }

  // =========================
  // Delete
  // =========================

  async delete(id: string) {
    /*
     * Kiểm tra User trước khi delete.
     *
     * Nếu không tồn tại:
     * → NotFoundException
     */
    await this.getById(id);

    return this.userRepository.delete(id);
  }
}