import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Folder } from 'lucide-react';

const projects = [
    {
        title: 'E-Commerce App',
        description: 'A fully functional e-commerce mobile application built with Flutter and Firebase. Features include user authentication, product catalog, cart management, and payment integration.',
        tech: ['Flutter', 'Firebase', 'Stripe'],
        github: '#',
        demo: '#',
        year: '2024'
    },
    {
        title: 'Portfolio V1',
        description: 'My first portfolio website built with React and Tailwind CSS. Showcasing my journey as a developer and highlighting my key projects.',
        tech: ['React', 'Tailwind', 'Framer Motion'],
        github: '#',
        demo: '#',
        year: '2024'
    },
    {
        title: 'Task Manager',
        description: 'A productivity tool for managing daily tasks and projects. Includes features like drag-and-drop organization, dark mode, and local storage persistence.',
        tech: ['React', 'TypeScript', 'Vite'],
        github: '#',
        demo: '#',
        year: '2023'
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-light-bg dark:bg-shadowed-green relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <p className="text-emerald-600 dark:text-mint-green font-mono mb-4">02. My Work</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-shadowed-green dark:text-white mb-6">Featured Projects</h2>
                    <p className="text-gray-900 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        A collection of projects I've worked on.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-leafy-dark dark:bg-gray-800/30 border border-gray-700 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300 group shadow-2xl"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <Folder size={40} className="text-mint-green" />
                                <div className="flex gap-4">
                                    <a href={project.github} className="text-gray-400 hover:text-mint-green transition-colors">
                                        <Github size={20} />
                                    </a>
                                    <a href={project.demo} className="text-gray-400 hover:text-mint-green transition-colors">
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-mint-green transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-3 mt-auto">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-mint-green/10 text-mint-green rounded-full text-sm font-medium">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
