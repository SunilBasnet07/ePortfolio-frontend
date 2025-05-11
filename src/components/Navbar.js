'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import navLinks from '@/constant/navbar';
import Image from 'next/image';
import { ChevronDown, LogOut, User, Settings } from 'lucide-react';
import profileImage from "../Image/placeholderImage.png"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/auth/authSlice';
import { LOGIN_ROUTE } from '@/routes';

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    function handleLogout() {
        dispatch(logout())
        toast.success("Logout Successfully", {
            authClose: 1500,
        })
        setIsProfileOpen(false)
        router.push(LOGIN_ROUTE)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-md border-b border-indigo-500/20 z-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="text-xl font-Nunito-Bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 hover:opacity-80 transition-all"
                        >
                            MyPortfolio
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((item, index) => (
                            <Link
                                key={index}
                                href={item.route}
                                className={`
                                    px-1 py-2 text-sm font-Poppins transition-all
                                    ${pathname === item.route
                                        ? 'text-purple-400 border-b-2 border-purple-500'
                                        : 'text-indigo-300 hover:text-white'}
                                `}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Profile Section */}
                    {user ? (<div className="hidden md:flex items-center  space-x-4">
                        {/* Profile Image */}
                        <div className="relative">
                            <button
                                onClick={toggleProfile}
                                className="flex items-center space-x-2 focus:outline-none"
                            >
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500/20 hover:border-indigo-500/40 transition-all">
                                    <Image
                                        src={user?.profileImageUrl || profileImage}
                                        alt="Profile"
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                        sizes="40px"
                                    />
                                </div>
                                <ChevronDown className={`w-4 h-4 text-indigo-300 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-indigo-500/20 rounded-xl shadow-lg py-2"
                                >
                                    <Link
                                        href="/profile"
                                        className="flex items-center px-4 py-2 text-sm text-indigo-300 hover:bg-indigo-900/30 hover:text-white transition-colors"
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="flex items-center px-4 py-2 text-sm text-indigo-300 hover:bg-indigo-900/30 hover:text-white transition-colors"
                                    >
                                        <Settings className="w-4 h-4 mr-2" />
                                        Settings
                                    </Link>
                                    <div className="border-t border-indigo-500/20 my-1" />
                                    <button onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>) : (<div className="hidden md:flex items-center space-x-8">
                        <Link
                            href={LOGIN_ROUTE}
                            className={`
                          inline-block px-4 py-2 rounded-xl text-sm font-medium font-Poppins transition-colors duration-200
                           ${pathname === LOGIN_ROUTE
                                    ? 'bg-purple-600 text-white border border-purple-700'
                                    : 'bg-indigo-500 text-white hover:bg-indigo-600'}
                               `}
                        >
                            Login
                        </Link></div>)}


                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-indigo-300 hover:text-white focus:outline-none"
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    height: isMenuOpen ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 border-t border-indigo-500/10 shadow-lg">
                    {/* Mobile Profile Section */}
                    {user && (<div className="px-3 py-2 mb-2">
                        <button
                            onClick={toggleProfile}
                            className="flex items-center space-x-3 w-full focus:outline-none"
                        >
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500/20 hover:border-indigo-500/40 transition-all">
                                <Image
                                    src={user?.profileImageUrl || profileImage}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="object-cover"
                                    sizes="40px"
                                />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-white font-Nunito-SemiBold">John Doe</p>
                                <p className="text-indigo-300 text-sm">View Profile</p>
                            </div>
                            <ChevronDown className={`w-5 h-5 text-indigo-300 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Mobile Profile Dropdown */}
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 space-y-1"
                            >
                                <Link
                                    href="/profile"
                                    className="flex items-center px-3 py-2 text-sm text-indigo-300 hover:bg-indigo-900/30 hover:text-white transition-colors rounded-md"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Profile
                                </Link>
                                <Link
                                    href="/settings"
                                    className="flex items-center px-3 py-2 text-sm text-indigo-300 hover:bg-indigo-900/30 hover:text-white transition-colors rounded-md"
                                >
                                    <Settings className="w-4 h-4 mr-2" />
                                    Settings
                                </Link>
                                <button onClick={handleLogout}
                                    className="flex items-center w-full px-3 py-2 text-sm text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors rounded-md"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </motion.div>
                        )}
                    </div>)}


                    <div className="border-t border-indigo-500/20 my-2" />

                    {/* Navigation Links */}
                    {navLinks.map((item, index) => (
                        <Link
                            key={index}
                            href={item.route}
                            className={`
                                block px-3 py-2 rounded-md text-base font-Poppins transition-all
                                ${pathname === item.route
                                    ? 'bg-indigo-900/70 text-purple-400'
                                    : 'text-indigo-300 hover:bg-indigo-900/40 hover:text-white'}
                            `}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    {!user && (<Link

                        href={LOGIN_ROUTE}
                        className={`
                                block px-3 py-2 rounded-md text-base font-Poppins transition-all
                                ${pathname === LOGIN_ROUTE
                                ? 'bg-indigo-900/70 text-purple-400'
                                : 'text-indigo-300 hover:bg-indigo-900/40 hover:text-white'}
                            `}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Login
                    </Link>)}
                </div>
            </motion.div>
        </header>
    )
}

export default Navbar
