import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";

export interface RegisterResponse {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  role: "USER" | "CREATOR" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthServiceInterface {
  register(dto: RegisterDto): Promise<RegisterResponse>;

  login(dto: LoginDto): Promise<void>;
}