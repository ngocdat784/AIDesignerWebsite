const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  error?: string;
  details?: unknown;
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("accessToken");
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAccessToken();

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    },
  );

  let result: ApiResponse<T>;

  try {
    result = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new Error(
      `API returned invalid JSON (${response.status}).`,
    );
  }

  // =========================
  // Validate API response
  // =========================

  if (!result) {
    throw new Error(
      `API returned an empty response (${response.status}).`,
    );
  }

  // =========================
  // Handle API errors
  // =========================

  if (!response.ok || !result.success) {
    if (response.status === 401) {
      throw new Error(
        result.message || "Unauthorized.",
      );
    }

    if (response.status === 403) {
      throw new Error(
        result.message || "Forbidden.",
      );
    }

    throw new Error(
      result.message ||
        result.error ||
        "Request failed.",
    );
  }

  // =========================
  // Return API data
  // =========================

  return result.data;
}