import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-200/20 dark:bg-mint-green/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl"
                >
                    <motion.p variants={itemVariants} className="text-emerald-600 dark:text-mint-green font-medium mb-4 text-lg">
                        Hi, my name is
                    </motion.p>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-shadowed-green dark:text-white mb-6 leading-tight">
                        Sushil Jain.
                        <span className="block text-gray-900 dark:text-gray-400">I build things for the web & mobile.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-gray-900 dark:text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                        I'm a CSE Student specializing in building exceptional digital experiences.
                        Currently, I'm focused on building accessible, human-centered products using
                        <span className="text-emerald-600 dark:text-mint-green"> Flutter</span> and <span className="text-emerald-600 dark:text-mint-green">React</span>.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                        <Link to="projects" smooth={true} duration={500}>
                            <button className="px-8 py-4 bg-emerald-600 dark:bg-mint-green text-white dark:text-shadowed-green font-bold rounded-lg hover:bg-emerald-700 dark:hover:bg-white transition-colors flex items-center gap-2 group">
                                Check out my work
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>

                        <Link to="contact" smooth={true} duration={500}>
                            <button className="px-8 py-4 border border-emerald-600 dark:border-mint-green text-emerald-600 dark:text-mint-green font-bold rounded-lg hover:bg-emerald-50 dark:hover:bg-mint-green/10 transition-colors">
                                Contact Me
                            </button>
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-12 flex items-center gap-6 text-gray-900 dark:text-gray-400">
                        <a href="https://github.com/ojasjain112" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-mint-green transition-colors hover:-translate-y-1 transform duration-300">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/sushiljain112/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 dark:hover:text-mint-green transition-colors hover:-translate-y-1 transform duration-300">
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:ojasjain012@gmail.com" className="hover:text-emerald-600 dark:hover:text-mint-green transition-colors hover:-translate-y-1 transform duration-300">
                            <Mail size={24} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
