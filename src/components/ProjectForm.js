'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { createProject, updateProject } from '@/api/project'
import toast from 'react-hot-toast'
import Spinner from '@/components/Spinner'
import { PROJECT_ROUTE } from '@/routes'
import { useRouter } from 'next/navigation'

const ProjectForm = ({ isEditing = false, project }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    values: project,
  });
  const [fileName, setFileName] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [techInput, setTechInput] = useState('');
  const router = useRouter();

  // Watch the techStack field for changes
  const techStack = watch('techStack') || [];

  // Initialize techStack from project data if editing
  useEffect(() => {
    if (isEditing && project?.techStack) {
      try {
        // Handle both string and array formats
        const techArray = typeof project.techStack === 'string' 
          ? JSON.parse(project.techStack)
          : project.techStack;
        setValue('techStack', techArray);
      } catch (error) {
        console.error('Error parsing techStack:', error);
        setValue('techStack', []);
      }
    }
  }, [isEditing, project, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file);
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
    }
  };

  const handleTechStackChange = (e) => {
    setTechInput(e.target.value);
  };

  const addTech = (e) => {
    e.preventDefault();
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      const newTechStack = [...techStack, techInput.trim()];
      setValue('techStack', newTechStack);
      setTechInput('');
    }
  };

  const removeTech = (techToRemove) => {
    const newTechStack = techStack.filter(tech => tech !== techToRemove);
    setValue('techStack', newTechStack);
  };

  async function submitForm(data) {
    const formData = new FormData();
    formData.append("title", data?.title)
    formData.append("description", data?.description)
    // Send techStack as a regular array, not stringified
    formData.append("techStack", data?.techStack)
    formData.append("githubUrl", data?.githubUrl)
    formData.append("liveUrl", data?.liveUrl)
    if (fileName) {
      formData.append("image", fileName);
    }

    try {
      setLoading(true)
      isEditing ? (await updateProject(project._id, formData)) : (await createProject(formData));
      toast.success(isEditing ? "Project updated successfully." : "Project added successfully.");
      if (isEditing) {
        router.push(PROJECT_ROUTE)
      }
    } catch (error) {
      toast.error(error?.response?.data);
    } finally {
      setLoading(false)
      reset();
      setFileName(null);
      setFilePreview(null);
    }
  }

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

        <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
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
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
              Tech Stack <span className="text-red-400">*</span>
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  type="text"
                  value={techInput}
                  onChange={handleTechStackChange}
                  onKeyPress={(e) => e.key === 'Enter' && addTech(e)}
                  className="flex-1 bg-gray-800/50 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
                  placeholder="Add a technology (e.g., React)"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={addTech}
                  type="button"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add
                </motion.button>
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="group relative bg-indigo-900/80 text-indigo-300 rounded-full px-3 py-1 text-sm font-Nunito-SemiBold flex items-center gap-1"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="text-indigo-400 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
              Project Image
            </label>
            <div className="space-y-4">
              <label className="w-full bg-gray-800/50 border border-dashed border-indigo-500/40 rounded-lg px-4 py-3 text-white transition-all font-Nunito flex items-center justify-center cursor-pointer hover:bg-indigo-900/20">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
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
                  {fileName ? fileName.name : 'Choose file or drag & drop'}
                </span>
              </label>

              {/* File Preview */}
              {filePreview && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFileName(null);
                      setFilePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

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
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => router.push(PROJECT_ROUTE)}
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
              {loading ? (<Spinner size="25px" color="#ffffff" />) : (isEditing ? 'Update Project' : 'Create Project')}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default ProjectForm 