'use client'
import React from 'react'
import { motion } from 'framer-motion'
import ProjectForm from '@/components/ProjectForm'

const AddProjectPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute w-72 h-72 rounded-full bg-purple-700/10 -top-20 -right-20"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute w-96 h-96 rounded-full bg-blue-500/5 -bottom-32 -left-32"
            animate={{ scale: [1.2, 1, 1.2], rotate: [45, 0, 45] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent top-1/3" />
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent bottom-1/3" />
        </div>
        
        {/* Page header */}
        <motion.div 
          className="relative mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <div className="h-8 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full mr-3"></div>
            <h1 className="text-3xl font-Poppins-Bold text-white">Add New Project</h1>
          </div>
          <p className="text-indigo-300 ml-4 pl-4 border-l border-indigo-500/30 font-Nunito">
            Showcase your work by creating a new project in your portfolio. Fill in the details below to get started.
          </p>
        </motion.div>
        
        {/* Project form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProjectForm />
        </motion.div>
        
        {/* Tips card */}
        <motion.div
          className="mt-8 bg-indigo-900/30 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-white font-Poppins-SemiBold text-lg mb-3 flex items-center">
            <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tips for a Great Project
          </h3>
          <ul className="text-indigo-300 font-Nunito space-y-2 pl-5">
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">•</span>
              <span>Use high-quality screenshots or images that clearly show your project</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">•</span>
              <span>Include technologies used and highlight your specific contributions</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-400 mr-2">•</span>
              <span>Keep descriptions concise but informative, focusing on what makes your project unique</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default AddProjectPage