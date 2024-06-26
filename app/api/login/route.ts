// Import necessary types and services
import type { NextApiRequest, NextApiResponse } from 'next';
import {  verifyJwt, signJwtAccessToken, decodeJwtToken } from '@/lib/jwtTokenUtils';
import { UserLoginDto } from '@/models/Dto/Users/user-login-dto';
import UserService from '@/service/UserService';

// Define the POST handler for the login route
export async function POST(body: Request) {

    const model : UserLoginDto = await body.json();
    const user = await UserService.loginUser(model);



  if (user.status == 200) {
    const accessToken = signJwtAccessToken(user.data);
  const decodeToken = decodeJwtToken(accessToken); 

  

    const result = {
      accessToken,
      ...decodeToken
    };


    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}