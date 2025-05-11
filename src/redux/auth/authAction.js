import { login, signUp } from "@/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

const userLogin=createAsyncThunk("auth/login",async(data,{rejectWithValue})=>{
   try {
    const response= await login(data);
  
    if(typeof window !== undefined){
        localStorage.setItem("authToken",response.data?.token)
    }
    return response.data;
   } catch (error) {
   return rejectWithValue(error.response?.data);
   }
})




const userRegister = createAsyncThunk("auth/register",async(data,{rejectWithValue})=>{
   try {
    const response = await  signUp(data);
     console.log(data);
    if(typeof window !== undefined){
        localStorage.setItem("authToken",response.data?.token)
    }
    return response.data;
   } catch (error) {
   return rejectWithValue(error.response?.data);
   }

})

export {userLogin,userRegister}