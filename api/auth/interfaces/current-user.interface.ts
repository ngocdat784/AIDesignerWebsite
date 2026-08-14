export interface CurrentUserPayload {
  id: string;
  email: string;
  role: "USER" | "CREATOR" | "ADMIN";
}

export type CurrentUser = CurrentUserPayload;