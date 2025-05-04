import { baseApiUrl } from "@/config/apiUrl"
import axios from "axios"

const login =async(data)=>{
   try {
    const response = await axios.post(`${baseApiUrl}/api/auth/login`,data)
    return response.data;
   } catch (error) {
    console.log(error.mesage);
   }
}

export {login}