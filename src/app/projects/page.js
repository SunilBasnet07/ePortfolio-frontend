'use client'
import ProjectCard from '@/components/ProjectCard'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {  getProjectByUser } from '@/api/project'
import { useSelector } from 'react-redux'

import { LOGIN_ROUTE } from '@/routes'
import { useRouter } from 'next/navigation'




const ProjectsPage = () => {
const {user}=useSelector((state)=>state.auth)
const router = useRouter();

const [getData,setGetData]=useState([]);


  useEffect(() => {
    getProjectByUser().then((response) => {
      setGetData(response);
    
    }).catch(error => {
      console.log(error.message);
    });

  }, [])

  // Example projects data - in a real app this would come from an API or database


  const projects = Array(9).fill(null).map((_, index) => ({
    _id: `project-${index}`,
    title: `Project ${index + 1}`,
    description: "A modern portfolio website built with Next.js and Tailwind CSS. Features responsive design, animations, and contact form.",
    techStack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    // No need to specify imageUrl - ProjectCard has fallback
    githubUrl: "#",
    liveUrl: "#",
    createdAt: new Date(Date.now() - Math.random() * 10000000000)
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-7xl relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-purple-700/10 -top-20 right-0"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-blue-500/5 -bottom-32 -left-32"
            animate={{ scale: [1.2, 1, 1.2], rotate: [45, 0, 45] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent top-1/3" />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent bottom-1/4" />
        </div>

        {/* Section heading with Create Project button */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <motion.div
            className="text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-Nunito-SemiBold mb-4">
              My Work
            </span>
            <h2 className="text-4xl md:text-5xl font-Poppins-Bold text-white mb-4">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Projects</span>
            </h2>
            <p className="text-gray-300 max-w-2xl font-Nunito">
              Explore my latest work showcasing my skills in web development, design, and problem-solving.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href={user?("/projects/add"): LOGIN_ROUTE}>
              <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(124, 58, 237, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-Nunito-Bold rounded-lg shadow-lg shadow-purple-900/30 hover:opacity-90 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Create Project</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {getData.map((project, index) => (
            <ProjectCard key={project._id} project={project}  />
          ))}
        </motion.div>
      </div>
     
    </div>
  )
}

export default ProjectsPage