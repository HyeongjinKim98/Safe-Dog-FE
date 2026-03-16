'use server'
import { cookies } from "next/headers";
import { apiClient,RequestOptions } from "../lib/api";

const getToken= async()=>{
      const cookieStore = await cookies();
      return cookieStore.get('token')?.value;
}

const setToken = async (token: string) => {
  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  })
}

export const serverApi = {
  get: async <T>(endpoint: string, options?: RequestOptions) => {
    const token = await getToken()
    return apiClient<T>(endpoint, { ...options, method: 'GET', token })
  },
  post: async <T>(endpoint: string, body: unknown, options?: RequestOptions) => {
    const token = await getToken()
    return apiClient<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body), token })
  },
  put: async <T>(endpoint: string, body: unknown, options?: RequestOptions) => {
    const token = await getToken()
    return apiClient<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body), token })
  },
  delete: async <T>(endpoint: string, options?: RequestOptions) => {
    const token = await getToken()
    return apiClient<T>(endpoint, { ...options, method: 'DELETE', token })
  },
  patch: async <T>(endpoint: string, body: unknown, options?: RequestOptions) => {
    const token = await getToken()
    return apiClient<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body), token })
  },
  setToken,
}