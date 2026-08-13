import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";

import {
  AuthServiceResponse,
  LoginResponse,
} from "./auth.service-response.interface";

export interface AuthServiceInterface {
  register(dto: RegisterDto): Promise<AuthServiceResponse>;

  login(dto: LoginDto): Promise<LoginResponse>;
}