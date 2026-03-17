import { cookies } from "next/headers";
import { RequestOptions, apiClient } from "../lib/api";
type LoginResponseType ={
      grantType : string;
      accessToken : string;
      refreshToken : string;
      accessTokenExpiresIn : number;
}
const getToken= async()=>{
      const cookieStore = await cookies();
      return cookieStore.get('accessToken')?.value;
}

const setToken = async (accessToken: string, refreshToken : string, accessTokenExpiresIn: number) => {
  const cookieStore = await cookies()
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: accessTokenExpiresIn,
    path: '/',
  })
  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: accessTokenExpiresIn * 7,
    path: '/',
  })
}

const removeTokens = async()=>{
      const cookieStore = await cookies();
      cookieStore.delete('accessToken');
      cookieStore.delete('refreshToken');
}

const reissueToken = async (): Promise<string | null> => {
  const cookieStore = await cookies()
  const refreshToken = cookieStore.get('refreshToken')?.value
  if (!refreshToken) return null

  try {
    const data = await apiClient<LoginResponseType>('/api/auth/reissue', {
      method: 'POST',
      token: refreshToken,
    })
    await setToken(data.accessToken, data.refreshToken, data.accessTokenExpiresIn)
    return data.accessToken
  } catch {
    await removeTokens()
    return null
  }
}
const protechedFetch = async<T>(
      endpoint : string,
      options : RequestOptions
      ):Promise<T> =>{
            return apiClient<T>(endpoint, {
                  ...options,
                  onUnauthorized: reissueToken
            })
}
export const serverApi = {
  get: async <T>(endpoint: string, options?: RequestOptions) => {
    const token = await getToken()
    return protechedFetch<T>(endpoint, { ...options, method: 'GET', token })
  },
  post: async <T>(endpoint: string, body: unknown, options?: RequestOptions) => {
    const token = await getToken()
    return protechedFetch<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body), token })
  },
  put: async <T>(endpoint: string, body: unknown, options?: RequestOptions) => {
    const token = await getToken()
    return protechedFetch<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body), token })
  },
  delete: async <T>(endpoint: string, options?: RequestOptions) => {
    const token = await getToken()
    return protechedFetch<T>(endpoint, { ...options, method: 'DELETE', token })
  },
  patch: async <T>(endpoint: string, body: unknown, options?: RequestOptions) => {
    const token = await getToken()
    return protechedFetch<T>(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body), token })
  },
  setToken,
}