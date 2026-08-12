export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  error: string;
  details?: string[];
  timestamp: string;
  path: string;
}