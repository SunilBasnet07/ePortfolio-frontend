'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import navLinks from '@/constant/navbar';

const Navbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                    <nav className="hidden md:flex space-x-8">
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
                </div>
            </motion.div>
        </header>
    )
}

export default Navbar
