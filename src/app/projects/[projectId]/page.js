'use client'
import React, { useEffect, useState } from 'react'
import { getProjectById } from '@/api/project'
import ProjectFullDetails from '@/components/ProjectDetails'
import { useParams } from 'next/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'

const ProjectDetails = () => {
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(params.projectId)
        setProject(data)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.projectId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl font-Nunito">
          Project not found
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900">
      <div className="mt-16">
        <ProjectFullDetails project={project} />
      </div>
    </div>
  )
}

export default ProjectDetails