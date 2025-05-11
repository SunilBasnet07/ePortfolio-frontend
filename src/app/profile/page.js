'use client'
import EditProfile from '@/components/EditProfile'
// import Profile from '@/components/Profile'
import React from 'react'
import { motion } from 'framer-motion'

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 pt-24 pb-16 px-6">
      <div className="container mx-auto max-w-4xl relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-72 h-72 rounded-full bg-purple-700/10 -top-20 -right-20"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-blue-500/5 -bottom-32 -left-32"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [45, 0, 45],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent top-1/3"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent bottom-1/3"
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          />
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
            <h1 className="text-3xl font-Poppins-Bold text-white">Edit Profile</h1>
          </div>
          <p className="text-indigo-300 ml-4 pl-4 border-l border-indigo-500/30 font-Nunito">
            Update your personal information and customize your portfolio profile.
          </p>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <EditProfile />
        </motion.div>
      </div>
    </div>
  )
}

export default ProfilePage