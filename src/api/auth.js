import { baseApiUrl } from "@/config/apiUrl"

import { authToken } from "./token";
import axios from "axios";


const login = async ({email,password}) => {
    const response = await axios.post(`${baseApiUrl}/api/auth/login`,{email,password})
   return response;
 
}
const signUp = async ({confirmPassword,email,name,password,number}) => {
     const response = await axios.post(`${baseApiUrl}/api/auth/register`, {
        confirmPassword,
        email,
        name,
        password,
        number,
     })
     return response

}
const updateUser =async(data)=>{
   const response = await axios.put(`${baseApiUrl}/api/user/profile/upload`,data,{
      headers:{
         Authorization:`Bearer ${authToken}`
      }
   })
   return response.data;
}
const forgotPassword =async(data)=>{
   const response = await axios.post(`${baseApiUrl}/api/auth/forgot-password`,data,{
     
   })
   return response.data;
}
const resetPassword = async (userId, token, newPassword) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        token,
        newPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to reset password');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to reset password. Please try again.');
  }
};
export { login ,signUp,updateUser,forgotPassword,resetPassword}