'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import projectImage from "../Image/team5.jpeg"
import { Pencil, Trash2 } from 'lucide-react'
import Modal from './Modal'
import { PROJECT_ROUTE } from '@/routes'
import Link from 'next/link'
import { deleteProject } from '@/api/project'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ProjectCard = ({ project }) => {
  const [showOption, setShowOption] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteProject(project._id);
      toast.success("Project deleted successfully");
      // Close the options menu and modal
      setShowOption(false);
      setShowDeleteModal(false);
      // Force a hard reload of the page
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data || "Failed to delete project");
      setShowDeleteModal(false);
    }
  }

  // For design purposes, using dummy project if not provided
  const demoProject = {
    _id: project?._id,
    title: project?.title,
    description: project?.description,
    techStack: project?.techStach,
    imageUrl: project?.imgeUrl || projectImage,
    githubUrl: project?.githubUrl,
    liveUrl: project?.liveUrl,
    createdAt: project?.createdAt
  }

  // Use provided project or demo project for design
  const { title, description, techStack, imageUrl, githubUrl, liveUrl } = project || demoProject

  return (
    <>
      <motion.div
        className="bg-gray-900/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl overflow-hidden shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        {/* Project Image */}
        <Link href={`${PROJECT_ROUTE}/${project._id}`} >
          <div className="relative h-52 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60 z-10" />

            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                height={400}
                width={400}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-800/50 to-purple-900/50 flex items-center justify-center">
                <div className="text-indigo-300/70 text-9xl font-Poppins-Bold opacity-30 select-none">
                  {title.charAt(0)}
                </div>
              </div>
            )}

            {/* Tech stack badges - positioned over the image */}
            <div className="absolute bottom-3 left-3 z-20 flex flex-wrap gap-2">
              {Array.isArray(project.techStack) 
                ? project.techStack.map((item, index) => (
                    <span 
                      key={index}
                      className="text-xs font-Nunito-SemiBold px-2 py-1 bg-gray-900/80 text-indigo-300 rounded-full backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ))
                : project.techStack?.split(',').map((item, index) => (
                    <span 
                      key={index}
                      className="text-xs font-Nunito-SemiBold px-2 py-1 bg-gray-900/80 text-indigo-300 rounded-full backdrop-blur-sm"
                    >
                      {item.trim()}
                    </span>
                  ))
              }
            </div>
          </div>
        </Link>

        {/* Content */}
        <div className="p-6">
          <Link href={`${PROJECT_ROUTE}/${project._id}`}>
            <h3 className="text-xl font-Poppins-Bold text-white mb-2 hover:underline">
              {title}
            </h3>
          </Link>

          <p className="text-indigo-200 font-Nunito text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Action buttons */}
          <div className="flex space-x-3 mt-auto">
            <a
              href={liveUrl}
              onClick={() => (window.location.href)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <motion.button
                className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-Nunito-Bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Deployment Project
              </motion.button>
            </a>

            <a
              href={githubUrl}
              onClick={() => (window.location.href)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center py-2 px-4 border border-indigo-500/30 text-indigo-300 text-sm font-Nunito rounded-lg hover:bg-indigo-900/30 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <div className="relative">
              <button
                onClick={() => setShowOption(!showOption)}
                className="flex relative items-center justify-center py-2 px-2 border border-indigo-500/30 text-indigo-300 text-sm font-Nunito rounded-lg hover:bg-indigo-900/30 transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h.01M12 12h.01M19 12h.01"
                  />
                </svg>
              </button>

              <div
                className={`absolute bottom-14 right-1 flex-col gap-2 text-white transition-all duration-300 ease-in-out transform ${showOption ? 'opacity-100 scale-100 flex' : 'opacity-0 scale-95 pointer-events-none'}`}
              >
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setShowOption(false);
                  }}
                  className="bg-red-500 p-1 rounded-md hover:bg-red-600 transition"
                >
                  <Trash2 />
                </button>
                <Link
                  href={`${PROJECT_ROUTE}/edit/${project._id}`}
                  className="bg-blue-500 p-1 rounded-md hover:bg-blue-600 transition"
                >
                  <Pencil />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Created date tag */}
        <div className="absolute top-3 right-3 z-20">
          <span className="text-xs font-Nunito-SemiBold px-2 py-1 bg-gray-900/80 text-indigo-300 rounded-full backdrop-blur-sm">
            {new Date(project?.createdAt || demoProject.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
      </motion.div>

      {/* Full Page Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900/95 border border-indigo-500/20 rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <h2 className="text-2xl font-Poppins-Bold text-white mb-6">Delete Project</h2>
            <p className="text-indigo-200 font-Nunito mb-8">
              Are you sure you want to delete "{title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 font-Nunito-Bold rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 font-Nunito-Bold rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export { ProjectCard }
export default ProjectCard 