'use client'
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import loginImage from "../Image/login.png"
import { useForm } from "react-hook-form"

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const{register,handleSubmit,formState:{errors}}=useForm();

  const submitForm=(data)=>{
    console.log(data)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3 
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  const formItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
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
          alt="Register"
          className="h-full w-full object-cover"
          priority
        />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute inset-0 z-20 flex items-center justify-center p-12 mb-10"
        >
          <div className="max-w-xl text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-6 font-Poppins-Bold text-5xl font-bold tracking-tight"
            >
              Join ePortfolio Today
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-xl font-Nunito text-indigo-200"
            >
              Create your account and start building your professional portfolio to showcase your skills and achievements.
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
              className="flex h-12 w-12 items-center justify-center ml-40 rounded-full bg-purple-500/20"
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
            <h2 className="mb-2 font-Poppins-Bold text-3xl font-bold text-white">Create an account</h2>
            <p className="font-Nunito text-indigo-300">Fill in your details to get started</p>
          </motion.div>

          <form className="space-y-5" onSubmit={handleSubmit(submitForm)}>
            {/* Full Name input */}
            <motion.div variants={formItemVariants}>
              <label htmlFor="fullName" className="mb-2 block font-Nunito-SemiBold text-sm text-indigo-300">
                Full Name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
                  <User className="h-5 w-5" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className="w-full rounded-lg border border-indigo-700 bg-indigo-900 py-3 pl-10 pr-4 font-Nunito text-white placeholder-indigo-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </motion.div>

            {/* Email input */}
            <motion.div variants={formItemVariants}>
              <label htmlFor="email" className="mb-2 block font-Nunito-SemiBold text-sm text-indigo-300">
                Email Address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
                  <Mail className="h-5 w-5" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className="w-full rounded-lg border border-indigo-700 bg-indigo-900 py-3 pl-10 pr-4 font-Nunito text-white placeholder-indigo-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </motion.div>

            {/* Password input */}
            <motion.div variants={formItemVariants}>
              <label htmlFor="password" className="mb-2 block font-Nunito-SemiBold text-sm text-indigo-300">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
                  <Lock className="h-5 w-5" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full rounded-lg border border-indigo-700 bg-indigo-900 py-3 pl-10 pr-10 font-Nunito text-white placeholder-indigo-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-indigo-400 hover:text-indigo-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Confirm Password input */}
            <motion.div variants={formItemVariants}>
              <label htmlFor="confirmPassword" className="mb-2 block font-Nunito-SemiBold text-sm text-indigo-300">
                Confirm Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
                  <Check className="h-5 w-5" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className="w-full rounded-lg border border-indigo-700 bg-indigo-900 py-3 pl-10 pr-10 font-Nunito text-white placeholder-indigo-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-indigo-400 hover:text-indigo-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </motion.button>
              </div>
            </motion.div>

            {/* Terms and conditions */}
            <motion.div variants={formItemVariants} className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-indigo-700 bg-indigo-900 text-purple-500 focus:ring-purple-500 focus:ring-offset-indigo-950"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="terms" className="font-Nunito text-sm text-indigo-300">
                  I agree to the <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Terms of Service</span> and <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Privacy Policy</span>
                </label>
              </div>
            </motion.div>

            {/* Sign Up button */}
            <motion.button
              variants={formItemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full rounded-lg bg-purple-600 py-3 font-Nunito-Bold text-base font-medium text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-indigo-950"
            >
              Create Account
            </motion.button>
            
            <motion.div variants={formItemVariants} className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-indigo-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-indigo-950 px-4 font-Nunito text-indigo-400">Or continue with</span>
              </div>
            </motion.div>
            
            {/* Google sign-up */}
            <motion.button
              variants={formItemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-indigo-700 bg-indigo-900 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-800"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="#4285F4"
                />
                <path
                  d="M6.44 14.08l7.227-2.933c.307-.12.547-.4.547-.76 0-.4-.24-.733-.587-.88l-7.227-2.933c-.387-.16-.827.13-.827.547v6.413c0 .437.44.717.827.547z"
                  fill="#34A853"
                />
              </svg>
              Sign up with Google
            </motion.button>
            
            {/* Sign in link */}
            <motion.div 
              variants={formItemVariants}
              className="mt-6 text-center"
            >
              <p className="font-Nunito text-sm text-indigo-300">
                Already have an account?{" "}
                <motion.a 
                  whileHover={{ scale: 1.05, color: "#a855f7" }}
                  href="/auth/login" 
                  className="font-Nunito-SemiBold text-purple-400 hover:text-purple-300"
                >
                  Sign in instead
                </motion.a>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}