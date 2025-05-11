'use client'
import Image from "next/image"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import loginImage from "../Image/login.png"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation"
import { FORGOT_PASSWORD_ROUTE, HOME_ROUTE } from "@/routes"
import Spinner from '@/components/Spinner'
import { useDispatch, useSelector } from "react-redux"
import { userLogin } from "@/redux/auth/authAction"


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { user,error, loading } = useSelector((state) => state.auth)
  const { register, handleSubmit } = useForm();

  const submitForm = async (body) => {
    dispatch(userLogin(body));
}
useEffect(() => {
  if (user) {
    toast.success("Login successful");
    router.push(HOME_ROUTE);
  }
  if (error) {
    toast.error(error || "Login failed");
  }
}, [user, error]);


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
          alt="Login"
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
              Welcome to ePortfolio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-xl font-Nunito text-indigo-200"
            >
              Showcase your achievements, connect with professionals, and unlock new opportunities.
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
        <div className="w-full max-w-md ">
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center lg:justify-start"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-12 w-12 items-center justify-center lg:ml-40 rounded-full bg-purple-500/20"
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
            <h2 className="mb-2 font-Poppins-Bold text-3xl font-bold text-white">Sign in to your account</h2>
            <p className="font-Nunito text-indigo-300">Enter your credentials to access your portfolio</p>
          </motion.div>

          <form className="space-y-6" onSubmit={handleSubmit(submitForm)}>
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
                  {...register("email")}
                  placeholder="name@example.com"
                  className="w-full rounded-lg border border-indigo-700 bg-indigo-900 py-3 pl-10 pr-4 font-Nunito text-white placeholder-indigo-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </motion.div>

            {/* Password input */}
            <motion.div variants={formItemVariants}>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="block font-Nunito-SemiBold text-sm text-indigo-300">
                  Password
                </label>
                <motion.a
                  whileHover={{ scale: 1.05, color: "#a855f7" }}
                  whileTap={{ scale: 0.95 }}
                  href={FORGOT_PASSWORD_ROUTE}
                  className="text-xs font-medium text-purple-400 hover:text-purple-300"
                >
                  Forgot Password?
                </motion.a>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400">
                  <Lock className="h-5 w-5" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  id="password"
                  name="password"
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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

            {/* Remember me */}
            <motion.div variants={formItemVariants} className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-indigo-700 bg-indigo-900 text-purple-500 focus:ring-purple-500 focus:ring-offset-indigo-950"
              />
              <label htmlFor="remember" className="ml-2 block font-Nunito text-sm text-indigo-300">
                Remember me for 30 days
              </label>
            </motion.div>
            {/* Buttons */}
            <div className="space-y-4">
              <motion.button
                variants={formItemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed bg-purple-600 flex justify-center items-center py-3 font-Nunito-Bold text-base font-medium text-white shadow-sm hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-indigo-950 disabled:opacity-70"
              >
                {loading ? (
                  <Spinner size="20px" color="#ffffff" />
                ) : (
                  "Sign In"
                )}
              </motion.button>

              <motion.div variants={formItemVariants} className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-indigo-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-indigo-950 px-4 font-Nunito text-indigo-400">Or continue with</span>
                </div>
              </motion.div>

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
                Sign in with Google
              </motion.button>
            </div>

            {/* Sign up */}
            <motion.div
              variants={formItemVariants}
              className="mt-8 text-center"
            >
              <p className="font-Nunito text-sm text-indigo-300">
                Don't have an account?{" "}
                <motion.a
                  whileHover={{ scale: 1.05, color: "#a855f7" }}
                  href="/auth/register"
                  className="font-Nunito-SemiBold text-purple-400 hover:text-purple-300"
                >
                  Create one now
                </motion.a>
              </p>
            </motion.div>
          </form>
        </div>
      </motion.div>

    </div>
  )
}
