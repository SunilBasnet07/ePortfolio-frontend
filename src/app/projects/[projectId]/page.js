import { getProjectById } from '@/api/project';
import React from 'react'

const ProjectDetails = async({params}) => {
    const id= (await params).projectId;
     try {
      const response = await getProjectById(id);
      
     } catch (error) {
      console.log(error.response.data) 
     }
  return (
    <div className='mt-16'>project details</div>
  )
}

export default ProjectDetails