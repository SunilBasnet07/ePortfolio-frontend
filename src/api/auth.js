import { baseApiUrl } from "@/config/apiUrl"
import axios from "axios"
import { authToken } from "./token";

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
const resetPassword =async(userId,token,data)=>{
   console.log(userId,token,data);
   const response = await axios.put(`${baseApiUrl}/api/auth/reset-password/${userId}?token=${token}`,data,{
     
   })
   return response.data;
}
export { login ,signUp,updateUser,forgotPassword,resetPassword}