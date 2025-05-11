'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import loginImage from "../Image/login.png"
import Link from 'next/link'
import { LOGIN_ROUTE } from '@/routes'
import { useForm } from 'react-hook-form'
import { resetPassword } from '@/api/auth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'


const ResetPassword = ({ userId, token }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm()

  const password = watch('password')

  const submitForm = async (data) => {
    setIsSubmitting(true);
   try {
    await resetPassword(userId,token,data);
    toast.success("Password reset Successfully")
     router.push(LOGIN_ROUTE)
   } catch (error) {
    toast.error(error.response?.data)
   }finally{
    setIsSubmitting(false);
    reset();
   }

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
          alt="Reset Password"
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
              Set New Password
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-xl font-Nunito text-indigo-200"
            >
              Please enter your new password below. Make sure it's strong and secure.
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
            <h2 className="mb-2 font-Poppins-Bold text-3xl font-bold text-white">Reset Password</h2>
            <p className="font-Nunito text-indigo-300">Enter your new password below</p>
          </motion.div>

          {!isSubmitted ? (
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit(submitForm)}
              className="space-y-6"
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm font-Nunito"
                >
                  {error}
                </motion.div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-Nunito-SemiBold text-indigo-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                      }
                    })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-indigo-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito pr-10"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-300"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-Nunito-SemiBold text-indigo-300 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: value => value === password || "Passwords do not match"
                    })}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-indigo-500/20 rounded-lg text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all font-Nunito pr-10"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-400 hover:text-indigo-300"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
                )}
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
                    Resetting...
                  </div>
                ) : (
                  'Reset Password'
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
              <h3 className="text-xl font-Poppins-Bold text-white">Password Reset Successful</h3>
              <p className="text-indigo-300 font-Nunito">
                Your password has been successfully reset. You can now login with your new password.
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

export default ResetPassword 