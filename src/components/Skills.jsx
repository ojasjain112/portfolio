import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Database, Globe, Terminal, Layout } from 'lucide-react';

const skills = [
    { name: 'Flutter', icon: <Smartphone size={24} />, category: 'Mobile' },
    { name: 'React', icon: <Code2 size={24} />, category: 'Frontend' },
    { name: 'JavaScript', icon: <Globe size={24} />, category: 'Language' },
    { name: 'TypeScript', icon: <Terminal size={24} />, category: 'Language' },
    { name: 'Firebase', icon: <Database size={24} />, category: 'Backend' },
    { name: 'Tailwind CSS', icon: <Layout size={24} />, category: 'Styling' },
];

const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-light-bg dark:bg-shadowed-green relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <p className="text-emerald-600 dark:text-mint-green font-mono mb-4">01. My Skills</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-shadowed-green dark:text-white mb-6">Skills & Technologies</h2>
                    <p className="text-gray-900 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Here are a few technologies I've been working with recently:
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5, borderColor: '#A1D1B1' }}
                            className="bg-leafy-dark dark:bg-gray-800/50 border border-gray-700 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-gray-900 transition-colors group cursor-default shadow-xl"
                        >
                            <div className="text-mint-green group-hover:scale-110 transition-transform duration-300">
                                {skill.icon}
                            </div>
                            <span className="text-gray-300 font-medium">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
