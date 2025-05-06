'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import profileImage from "../Image/team5.jpeg"

const HomePortfolio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 overflow-hidden">
      {/* Header section */}
      <div className="container mx-auto px-6 py-16 relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-purple-700/10 -top-20 -left-20"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute w-96 h-96 rounded-full bg-blue-500/10 bottom-0 right-0"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute w-48 h-48 rounded-full border border-indigo-500/20 top-1/3 right-1/4"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-6 gap-4 opacity-10">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-full w-px bg-gradient-to-b from-transparent via-purple-400 to-transparent" style={{left: `${(i+1) * (100/6)}%`}} />
            ))}
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" style={{top: `${(i+1) * (100/6)}%`}} />
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 z-10 relative">
          {/* Text content area */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-Nunito-SemiBold mb-4">
                Your Professional Portfolio
              </span>
              <h1 className="text-5xl lg:text-7xl font-Poppins-Bold text-white leading-tight mb-6">
                Design. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Create.</span> Inspire.
              </h1>
              <p className="text-lg font-Nunito text-gray-300 max-w-2xl">
                Showcase your professional journey with a stunning portfolio that highlights your skills, experience, and accomplishments.
              </p>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="grid grid-cols-3 gap-4 py-6 mb-8"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-3xl lg:text-4xl font-Poppins-Bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-400 font-Nunito">{stat.label}</p>
                </div>
              ))}
            </motion.div>
            
            {/* CTA buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-Nunito-Bold hover:opacity-90 transition-all shadow-lg shadow-purple-900/30">
                Explore Projects
              </button>
              <button className="px-8 py-3 rounded-lg border border-indigo-500/30 hover:bg-indigo-900/30 text-indigo-300 font-Nunito transition-all">
                View Resume
              </button>
            </motion.div>
          </motion.div>
          
          {/* Image area */}
          <motion.div 
            className="lg:col-span-5 flex justify-center lg:justify-end items-center relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Main image with masking effect */}
              <div className="relative z-10 overflow-hidden w-[300px] h-[400px] lg:w-[380px] lg:h-[500px] rounded-2xl shadow-2xl shadow-purple-900/30">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-purple-900/40 mix-blend-overlay z-10"></div>
                <Image 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P//fwAJZwPXzMuO4wAAAABJRU5ErkJggg=="
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 -left-4 w-full h-full border-2 border-indigo-500/30 rounded-2xl -z-10"></div>
              
              {/* Floating UI elements */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg border border-indigo-500/20 shadow-xl z-20 w-48"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-green-500 text-xs font-Nunito-SemiBold">Available for work</p>
                </div>
                <p className="text-white text-sm font-Nunito-SemiBold">Digital Designer & Developer</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-gray-900/90 backdrop-blur-sm py-2 px-4 rounded-full border border-indigo-500/20 shadow-xl z-20"
              >
                <div className="text-white text-sm font-Nunito-SemiBold flex items-center space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span>4.9/5.0</span>
                </div>
              </motion.div>
            </div>
            
            {/* Skill tags */}
            <motion.div 
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 space-y-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              {['Design', 'UI/UX', 'Code'].map((skill, index) => (
                <div 
                  key={index} 
                  className="px-4 py-2 rounded-full border border-indigo-500/30 bg-gray-900/50 text-indigo-300 text-sm font-Nunito backdrop-blur-sm"
                >
                  {skill}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Stats data
const stats = [
  { value: '60+', label: 'Projects Completed' },
  { value: '12+', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction' }
]

export default HomePortfolio 