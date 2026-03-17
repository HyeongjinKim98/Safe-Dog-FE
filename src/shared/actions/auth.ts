'use server'

import { serverApi } from "./api"

type LoginResponseType ={
      grantType : string;
      accessToken : string;
      refreshToken : string;
      accessTokenExpiresIn : number;
}
export const testLogin = async(email:string)=>{
      const {accessToken, refreshToken,accessTokenExpiresIn} = await serverApi.post<LoginResponseType>(
            `/api/auth/test-login?email=${email}`,{}
      )
      await serverApi.setToken(accessToken, refreshToken,accessTokenExpiresIn)
}