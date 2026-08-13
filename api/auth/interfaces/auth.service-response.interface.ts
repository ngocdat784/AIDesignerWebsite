export interface AuthServiceResponse {
  id: string;
  name: string;
  avatar: string | null;
  email: string;
  role: "USER" | "CREATOR" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}