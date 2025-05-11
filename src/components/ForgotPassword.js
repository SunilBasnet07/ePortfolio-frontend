'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import loginImage from "../Image/login.png"
import Link from 'next/link'
import { LOGIN_ROUTE } from '@/routes'
import { useForm } from 'react-hook-form'
import { forgotPassword } from '@/api/auth'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  // const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  const submitForm = async (data) => {

    setIsSubmitting(true)
    try {
      const response = await forgotPassword(data);
      toast.success("Password reset link sent to your email")
    } catch (error) {
      toast.error(error.response?.data)
    } finally {
      setIsSubmitting(false)
      reset();
    }

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="flex min-h-screen bg-indigo-950">
      {/* Left side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative hidden w-1/2 overflow-hidden lg:block"
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-indigo-950 via-indigo-900/70 to-transparent"></div>
        <Image
          src={loginImage}
          alt="Forgot Password"
          className="h-full w-full object-cover"
          priority
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute inset-0 z-20 flex items-center justify-center p-12"
        >
          <div className="max-w-xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-6 font-Poppins-Bold text-5xl font-bold tracking-tight"
            >
              Reset Your Password
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-xl font-Nunito text-indigo-200"
            >
              Don't worry! It happens. Please enter your email address and we'll send you a link to reset your password.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right side - Form */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2 lg:px-12"
      >
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center lg:justify-start"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20"
            >
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-purple-400" fill="currentColor">
                <path d="M12,0 L14.59,8.41 L23,12 L14.59,15.59 L12,24 L9.41,15.59 L1,12 L9.41,8.41 Z" />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mb-8 text-center lg:text-left"
          >
            <h2 className="mb-2 font-Poppins-Bold text-3xl font-bold text-white">Forgot Password</h2>
            <p className="font-Nunito text-indigo-300">Enter your email to reset your password</p>
          </motion.div>

          {!isSubmitted ? (
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit(submitForm)}
              className="space-y-6"
            >
              <div>
                <label htmlFor="email" className="block text-sm font-Nunito-SemiBold text-indigo-300 mb-2">
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  id="email"
                  // value={email}
                  {...register("email")}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-indigo-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito"
                  placeholder="Enter your email"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-Nunito-Bold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </motion.button>

              <div className="text-center">
                <Link href={LOGIN_ROUTE} className="text-indigo-400 hover:text-indigo-300 font-Nunito text-sm transition-colors">
                  Back to Login
                </Link>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-Poppins-Bold text-white">Check Your Email</h3>
              <p className="text-indigo-300 font-Nunito">
                We have sent a password reset link to your email address. Please check your inbox and follow the instructions.
              </p>
              <Link href={LOGIN_ROUTE}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 px-6 py-2 bg-indigo-600/20 text-indigo-300 rounded-lg hover:bg-indigo-600/30 transition-all"
                >
                  Return to Login
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword 