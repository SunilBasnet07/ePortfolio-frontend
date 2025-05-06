import { baseApiUrl } from "@/config/apiUrl"
import axios from "axios"
import { authToken } from "./token"

const getProjectByUser = async () => {
    const response = await axios.get(`${baseApiUrl}/api/project`, {
        headers: {
            Authorization: `Bearer ${authToken}`
            
        }

    })
    return response.data
}

const getProjectById = async (id) => {
    console.log(id);
    const response = await axios.get(`${baseApiUrl}/api/project/${id}`)
    return response.data
}
const deleteProject = async (id) => {
  
    const response = await axios.delete(`${baseApiUrl}/api/project/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`
            
        }

    })
    return response.data
}
const createProject = async(data)=>{
   
  
    const response = await axios.post(`${baseApiUrl}/api/project`,data,{
        headers: {
            Authorization: `Bearer ${authToken}`
            
        }

    })
    return response.data
}

const contactMessage = async(data)=>{
 const response = await axios.post(`${baseApiUrl}/api/contact`,data)
 return response.data;
}
export { getProjectByUser ,createProject,contactMessage,getProjectById,deleteProject }