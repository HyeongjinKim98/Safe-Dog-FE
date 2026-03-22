const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface RequestOptions extends RequestInit {
  token?: string;
  onUnauthorized?: () => Promise<string | null>;
}

export const apiClient = async <T>(
  endpoint: string,
  options: RequestOptions = {},
  reissue = true,
): Promise<T> => {
  const { token, onUnauthorized, ...fetchOptions } = options;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...fetchOptions.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (response.status === 401 && reissue && onUnauthorized) {
    const newToken = await onUnauthorized();
    if (newToken) {
      return apiClient<T>(endpoint, { ...options, token: newToken }, false);
    }
    throw new Error("SESSION EXPIRED");
  }

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: "GET" }),
  post: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),
  put: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: "DELETE" }),
  patch: <T>(endpoint: string, body: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),
};
