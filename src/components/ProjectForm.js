'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { createProject } from '@/api/project'
import toast from 'react-hot-toast'
import Spinner from './spinner'

const ProjectForm = ({ project, isEditing = false }) => {
  // Default empty project structure if none provided

  const { register, handleSubmit ,reset} = useForm();
  const [fileName, setFileName] = useState(null);
  const[loading,setLoading]= useState(false);


  async function submitForm(data) {
    const formData = new FormData();
    formData.append("title", data?.title)
    formData.append("description", data?.description)
    formData.append("techStack", data?.techStack)
    formData.append("githubUrl", data?.githubUrl)
    formData.append("liveUrl", data?.liveUrl)
    if (fileName) {
      formData.append("image", fileName);
    }


    try {
    setLoading(true)
      const response = await createProject(formData);

      toast.success("Project added successfull.");
    } catch (error) {
      toast.error(error?.response?.data);
     
    }finally{
      setLoading(false)
      reset();
    }
  }
  // const defaultProject = {
  //   title: '',
  //   description: '',
  //   techStack: [],
  //   imageUrl: '',
  //   githubUrl: '',
  //   liveUrl: ''
  // }

  // Use provided project or default empty one
  // const projectData = project || defaultProject

  return (
    <div className="bg-gray-900/60 backdrop-blur-sm border border-indigo-500/20 rounded-2xl overflow-hidden shadow-xl p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-Poppins-Bold text-white mb-2">
            {isEditing ? 'Edit Project' : 'Create New Project'}
          </h2>
          <p className="text-indigo-300 font-Nunito">
            {isEditing
              ? 'Update your project details below'
              : 'Share your work with the world by adding a new project'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
          {/* Project Title */}
          <div>
            <label htmlFor="title" className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
              Project Title <span className="text-red-400">*</span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              type="text"
              id="title"
              {...register("title")}
              className="w-full bg-gray-800/50 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
              placeholder="Portfolio Website"
            // defaultValue={projectData.title}
            />
          </div>

          {/* Project Description */}
          <div>
            <label htmlFor="description" className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
              Description <span className="text-red-400">*</span>
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              id="description"
              rows="4"
              {...register("description")}
              className="w-full bg-gray-800/50 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito resize-none"
              placeholder="A brief description of your project and what technologies you used..."
            // defaultValue={projectData.description}
            ></motion.textarea>
          </div>

          {/* Tech Stack Tags */}
          <div>
            <label htmlFor="techStack" className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
              Tech Stack <span className="text-red-400">*</span>
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              type="text"
              id="techStack"
              {...register("techStack")}
              className="w-full bg-gray-800/50 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
              placeholder="React, Node.js, MongoDB (comma separated)"
            // defaultValue={projectData.techStack.join(', ')}
            />

            {/* Tech Preview */}
            <div className="flex flex-wrap gap-2 mt-3">
              {['React', 'Next.js', 'Tailwind CSS'].map((tech, index) => (
                <span
                  key={index}
                  className="text-xs font-Nunito-SemiBold px-2 py-1 bg-indigo-900/80 text-indigo-300 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
                Image URL
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                type="text"
                id="imageUrl"
                // {...register("imageUrl")}
                className="w-full bg-gray-800/50 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
                placeholder="https://example.com/image.jpg"
              // defaultValue={projectData.imageUrl}
              />
            </div>

            {/* File Upload Alternative */}
            <div className="w-full">
              <label className="w-full bg-gray-800/50 border border-dashed border-indigo-500/40 rounded-lg px-4 py-3 text-white transition-all font-Nunito flex items-center justify-center cursor-pointer hover:bg-indigo-900/20">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFileName(file);
                  }}
                />
                <svg
                  className="w-5 h-5 text-indigo-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-indigo-300 text-sm">
                  Choose file or drag & drop
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Github URL */}
            <div>
              <label htmlFor="githubUrl" className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
                GitHub URL
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                type="text"
                id="githubUrl"
                {...register("githubUrl")}
                className="w-full bg-gray-800/50 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
                placeholder="https://github.com/yourusername/project"
              // defaultValue={projectData.githubUrl}
              />
            </div>

            {/* Live URL */}
            <div>
              <label htmlFor="liveUrl" className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
                Live Demo URL
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                type="text"
                id="liveUrl"
                {...register("liveUrl")}
                className="w-full bg-gray-800/50 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
                placeholder="https://your-project-demo.com"
              // defaultValue={projectData.liveUrl}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-end gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="py-3 px-6 border border-indigo-500/30 text-indigo-300 text-sm font-Nunito rounded-lg hover:bg-indigo-900/30 transition-all"
            >
              Cancel
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(124, 58, 237, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="py-3 px-8 bg-gradient-to-r disabled:cursor-not-allowed disabled:bg-slate-200 flex justify-center items-center from-indigo-600 to-purple-600 text-white text-sm font-Nunito-Bold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-purple-900/30"
            >
              { loading?(<Spinner size="25px" color="#ffffff" />)  : (isEditing ? 'Update Project' : 'Create Project')}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default ProjectForm 