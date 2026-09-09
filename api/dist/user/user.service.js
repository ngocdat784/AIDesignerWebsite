"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const repository_tokens_1 = require("../common/constants/repository.tokens");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    // =========================
    // Query
    // =========================
    async getAll() {
        return this.userRepository.getAll();
    }
    async getById(id) {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found.`);
        }
        return user;
    }
    async getByEmail(email) {
        const user = await this.userRepository.getByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException(`User with email ${email} not found.`);
        }
        return user;
    }
    // =========================
    // Create
    // =========================
    async create(dto) {
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
    async update(id, dto) {
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
    async delete(id) {
        /*
         * Kiểm tra User trước khi delete.
         *
         * Nếu không tồn tại:
         * → NotFoundException
         */
        await this.getById(id);
        return this.userRepository.delete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(repository_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], UserService);
