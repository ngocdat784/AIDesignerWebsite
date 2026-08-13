import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { AuthServiceResponse } from "./auth.service-response.interface";

export interface AuthServiceInterface {
  register(dto: RegisterDto): Promise<AuthServiceResponse>;

  login(dto: LoginDto): Promise<AuthServiceResponse>;
}