import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Menu, X, Github, Linkedin, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import FlappyGame from './FlappyGame';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isGameOpen, setIsGameOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Skills', to: 'skills' },
        { name: 'Projects', to: 'projects' },
        { name: 'Contact', to: 'contact' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-light-bg/90 dark:bg-shadowed-green/90 backdrop-blur-md shadow-lg py-4'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl font-bold text-emerald-600 dark:text-mint-green cursor-pointer"
                >
                    <Link to="hero" smooth={true} duration={500}>
                        SJ.
                    </Link>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={link.to}
                                smooth={true}
                                duration={500}
                                className="text-gray-900 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-mint-green transition-colors cursor-pointer font-medium"
                            >
                                {link.name}
                            </Link>
                        </motion.div>
                    ))}

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsGameOpen(true)}
                        className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-300/50 dark:hover:bg-gray-700/50 text-emerald-600 dark:text-mint-green transition-colors"
                        title="Play Flappy Duck"
                    >
                        <Gamepad2 size={20} />
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 hover:bg-gray-300/50 dark:hover:bg-gray-700/50 text-emerald-600 dark:text-mint-green transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </motion.button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-emerald-600 dark:text-mint-green"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-gray-900 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-light-bg dark:bg-shadowed-green border-t border-gray-200 dark:border-gray-800"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.to}
                                    smooth={true}
                                    duration={500}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-900 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-mint-green text-lg font-medium"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    setIsGameOpen(true);
                                }}
                                className="text-left text-gray-900 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-mint-green text-lg font-medium flex items-center gap-2"
                            >
                                <Gamepad2 size={20} /> Play Game
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isGameOpen && <FlappyGame onClose={() => setIsGameOpen(false)} />}
            </AnimatePresence>
        </nav>
    );
};

const Footer = () => (
    <footer className="bg-light-bg dark:bg-shadowed-green py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-900 dark:text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Sushil Jain. Built with React & Tailwind.
            </div>
            <div className="flex items-center gap-6 text-gray-900 dark:text-gray-400">
                <a href="https://github.com/ojasjain112" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-mint-green transition-colors">
                    <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/sushiljain112/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-mint-green transition-colors">
                    <Linkedin size={20} />
                </a>
            </div>
        </div>
    </footer>
);

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-light-bg dark:bg-shadowed-green text-shadowed-green dark:text-white selection:bg-mint-green selection:text-shadowed-green">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
