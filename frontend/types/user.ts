export interface User {
  id: string;

  name: string;

  avatar: string;

  email: string;

  role: "USER" | "CREATOR" | "ADMIN";
}