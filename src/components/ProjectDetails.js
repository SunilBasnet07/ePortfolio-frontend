'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Github, ExternalLink, Calendar, Code2 } from 'lucide-react'
import Link from 'next/link'
import { PROJECT_ROUTE } from '@/routes'

const ProjectFullDetails = ({ project }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto px-4 py-8"
    >
      {/* Project Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl md:text-4xl font-Poppins-Bold text-white">
            {project.title}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm font-Nunito text-indigo-300 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(project.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Project Image */}
      <motion.div 
        variants={itemVariants}
        className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8 shadow-xl"
      >
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-800/50 to-purple-900/50 flex items-center justify-center">
            <div className="text-indigo-300/70 text-9xl font-Poppins-Bold opacity-30 select-none">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
      </motion.div>

      {/* Project Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-Poppins-Bold text-white mb-4">Description</h2>
            <p className="text-indigo-200 font-Nunito leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-Poppins-Bold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5" />
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(project.techStack) 
                ? project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-900/80 text-indigo-300 rounded-full text-sm font-Nunito-SemiBold"
                    >
                      {tech}
                    </span>
                  ))
                : project.techStack?.split(',').map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-900/80 text-indigo-300 rounded-full text-sm font-Nunito-SemiBold"
                    >
                      {tech.trim()}
                    </span>
                  ))
              }
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Links */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-Poppins-Bold text-white mb-4">Project Links</h2>
            <div className="space-y-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-300 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="font-Nunito">Live Demo</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-300 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="font-Nunito">GitHub Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Back Button */}
          <Link
            href={PROJECT_ROUTE}
            className="block w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center font-Nunito-Bold rounded-lg hover:opacity-90 transition-all"
          >
            Back to Projects
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProjectFullDetails 