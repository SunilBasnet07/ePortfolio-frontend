'use client'
import React from 'react';
import Image from 'next/image';
import { User, Code2, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const About = () => {
  const {user}= useSelector((state)=>state.auth)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

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

        {/* Content */}
        <motion.div 
          className="relative"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Hero Section */}
          <motion.div 
            className="text-center mb-16"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl font-bold text-white sm:text-5xl mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Me</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A passionate full-stack developer dedicated to creating beautiful and functional web applications
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Personal Info */}
            <motion.div 
              className="bg-gray-900/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div 
                className="flex items-center mb-6"
                variants={itemVariants}
              >
                <User className="text-indigo-400 w-6 h-6 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Personal Information</h2>
              </motion.div>
              <motion.div 
                className="space-y-4"
                variants={itemVariants}
              >
                <p className="text-gray-300">
               {user?.bio || "Add bio from your profile"}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="font-medium text-white">{user ?user?.name : "your name"}</p>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium text-white">{user ? user?.email:"your.email@example.com"}</p>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-medium text-white">{user?.location || "Your Location"}</p>
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <p className="text-sm text-gray-400">Availability</p>
                    <p className="font-medium text-white">{user?.job || "Available for work"}</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Skills */}
            <motion.div 
              className="bg-gray-900/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div 
                className="flex items-center mb-6"
                variants={itemVariants}
              >
                <Code2 className="text-indigo-400 w-6 h-6 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Skills & Expertise</h2>
              </motion.div>
              <motion.div 
                className="space-y-6"
                variants={itemVariants}
              >
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Frontend Development</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'].map((skill, index) => (
                      <motion.span 
                        key={skill} 
                        className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Backend Development</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication'].map((skill, index) => (
                      <motion.span 
                        key={skill} 
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Experience Section */}
            <motion.div 
              className="bg-gray-900/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-8 md:col-span-2"
              variants={cardVariants}
              whileHover="hover"
            >
              <motion.div 
                className="flex items-center mb-6"
                variants={itemVariants}
              >
                <Briefcase className="text-indigo-400 w-6 h-6 mr-3" />
                <h2 className="text-2xl font-semibold text-white">Professional Experience</h2>
              </motion.div>
              <motion.div 
                className="space-y-8"
                variants={itemVariants}
              >
                <motion.div 
                  className="border-l-4 border-indigo-500 pl-4 hover:bg-indigo-500/10 transition-colors duration-200 rounded-r-lg"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-white">Senior Full Stack Developer</h3>
                  <p className="text-indigo-400">Company Name • 2020 - Present</p>
                  <p className="mt-2 text-gray-300">
                    Led the development of multiple web applications using React and Node.js.
                    Implemented modern UI/UX practices and optimized application performance.
                  </p>
                </motion.div>
                <motion.div 
                  className="border-l-4 border-indigo-500 pl-4 hover:bg-indigo-500/10 transition-colors duration-200 rounded-r-lg"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-white">Web Developer</h3>
                  <p className="text-indigo-400">Previous Company • 2018 - 2020</p>
                  <p className="mt-2 text-gray-300">
                    Developed and maintained various web applications. Collaborated with
                    cross-functional teams to deliver high-quality solutions.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 