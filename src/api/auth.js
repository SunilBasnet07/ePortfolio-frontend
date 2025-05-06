import { baseApiUrl } from "@/config/apiUrl"
import axios from "axios"

const login = async ({email,password}) => {
    const response = await axios.post(`${baseApiUrl}/api/auth/login`,{email,password})
   return response.data;
 
}
const signUp = async ({confirmPassword,email,name,password,number}) => {
     const response = await axios.post(`${baseApiUrl}/api/auth/register`, {
        confirmPassword,
        email,
        name,
        password,
        number,
     })
     return response.data

}
export { login ,signUp}