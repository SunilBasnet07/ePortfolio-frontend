'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { contactMessage } from '@/api/project'
import toast from 'react-hot-toast'
import Spinner from './spinner'
import { useSelector } from 'react-redux'

const ContactUs = () => {
  const { register, handleSubmit ,reset} = useForm();
  const [loading,setLoading]= useState(false);
  const {user}=useSelector((state)=>state.auth)
  async function submitForm(data) {
   try {
    setLoading(true)
    const response = await contactMessage(data);
     toast.success("Message sent successfull.",{
      autoClose:1500,
     })
   } catch (error) {
    toast.error(error.response.data)
   }finally{
    setLoading(false);
    reset();
   }
  }
  const contactInfo = [
    {
      title: "Email",
      content: user ? user?.email : "hello@portfolio.com",
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Phone",
      content: user? user?.number : "+1 (555) 123-4567",
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      )
    },
    {
      title: "Location",
      content: user?.address || "New York, NY, USA",
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 py-20 px-6">
      <div className="container mx-auto max-w-6xl relative">
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

        {/* Section heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-Nunito-SemiBold mb-4">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-Poppins-Bold text-white mb-4">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Connect</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-Nunito">
            Have a project in mind or want to collaborate? Drop me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Contact form and info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
          {/* Form */}
          <motion.div
            className="lg:col-span-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-indigo-500/20 p-8 shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
                    Your Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    type="text"
                    id="name"
                    {...register("name")}
                    className="w-full bg-gray-800/50 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full bg-gray-800/50 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
                  Subject
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  type="text"
                  id="subject"
                  {...register("subject")}
                  className="w-full bg-gray-800/50 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
                  placeholder="Project Discussion"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-indigo-300 font-Nunito-SemiBold mb-2 text-sm">
                  Your Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  id="message"
                  rows="6"
                  {...register("message")}
                  className="w-full bg-gray-800/50 border border-indigo-500/20 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito resize-none"
                  placeholder="Tell me about your project, ideas, or questions..."
                ></motion.textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(124, 58, 237, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-lg bg-gradient-to-r flex justify-center items-center disabled:cursor-not-allowed disabled:bg-slate-200 from-indigo-600 to-purple-600 text-white font-Nunito-Bold hover:opacity-90 transition-all shadow-lg shadow-purple-900/30 w-full md:w-auto"
              >
              {loading?(<Spinner size="20px" color="#ffffff" />) : ("Send Message")}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="lg:col-span-4 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact cards */}
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5 shadow-lg"
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-Nunito-Bold text-lg mb-1">{item.title}</h3>
                    <p className="text-indigo-300 font-Nunito">{item.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social media */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-indigo-500/20 p-5 shadow-lg">
              <h3 className="text-white font-Nunito-Bold text-lg mb-3">Connect on Social</h3>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 hover:bg-indigo-500 hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Response time note */}
        <motion.div
          className="mt-12 text-center text-indigo-300 font-Nunito opacity-80 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="inline-flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
            <p>Usually responds within 24 hours</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Contact info data
// const contactInfo = [
//   {
//     title: "Email",
//     content: "hello@portfolio.com",
//     icon: (
//       <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//       </svg>
//     )
//   },
//   {
//     title: "Phone",
//     content: "+1 (555) 123-4567",
//     icon: (
//       <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//       </svg>
//     )
//   },
//   {
//     title: "Location",
//     content: "New York, NY, USA",
//     icon: (
//       <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//       </svg>
//     )
//   }
// ]

// Social media links
const socialLinks = [
  {
    name: "Twitter",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    )
  },
  {
    name: "LinkedIn",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    )
  },
  {
    name: "GitHub",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  },
  {
    name: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2c-2.714 0-3.055.012-4.122.06-1.064.049-1.791.218-2.427.465a4.902 4.902 0 00-1.772 1.153A4.902 4.902 0 002.525 5.45c-.247.636-.416 1.363-.465 2.427C2.012 8.945 2 9.286 2 12s.012 3.055.06 4.122c.049 1.064.218 1.791.465 2.427a4.902 4.902 0 001.153 1.772 4.902 4.902 0 001.772 1.153c.636.247 1.363.416 2.427.465 1.067.048 1.408.06 4.122.06s3.055-.012 4.122-.06c1.064-.049 1.791-.218 2.427-.465a4.902 4.902 0 001.772-1.153 4.902 4.902 0 001.153-1.772c.247-.636.416-1.363.465-2.427.048-1.067.06-1.408.06-4.122s-.012-3.055-.06-4.122c-.049-1.064-.218-1.791-.465-2.427a4.902 4.902 0 00-1.153-1.772 4.902 4.902 0 00-1.772-1.153c-.636-.247-1.363-.416-2.427-.465C15.055 2.012 14.714 2 12 2zm0 1.802c2.67 0 2.986.01 4.04.058.975.045 1.504.207 1.857.345.466.182.8.399 1.15.748.35.35.566.684.748 1.15.138.353.3.882.344 1.857.048 1.054.059 1.37.059 4.04 0 2.67-.01 2.986-.059 4.04-.044.975-.206 1.504-.344 1.857a3.1 3.1 0 01-.748 1.15c-.35.35-.684.566-1.15.748-.353.138-.882.3-1.857.344-1.054.048-1.37.059-4.04.059-2.67 0-2.986-.01-4.04-.059-.975-.044-1.504-.206-1.857-.344a3.1 3.1 0 01-1.15-.748 3.1 3.1 0 01-.748-1.15c-.138-.353-.3-.882-.345-1.857-.047-1.054-.058-1.37-.058-4.04 0-2.67.01-2.986.058-4.04.045-.975.207-1.504.345-1.857.182-.466.399-.8.748-1.15.35-.35.684-.566 1.15-.748.353-.138.882-.3 1.857-.345 1.054-.047 1.37-.058 4.04-.058z" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12 15.333a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm0-8.469a5.136 5.136 0 100 10.272 5.136 5.136 0 000-10.272z" />
        <circle cx="17.334" cy="6.666" r="1.2" />
      </svg>
    )
  }
]

export default ContactUs 