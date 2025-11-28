import React from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Linkedin, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-light-bg dark:bg-shadowed-green relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-emerald-600 dark:text-mint-green font-mono mb-4">04. What's Next?</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-shadowed-green dark:text-white mb-6">Get In Touch</h2>
                    <p className="text-gray-900 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
                        I'll try my best to get back to you!
                    </p>
                    <div className="flex justify-center gap-6 mt-8">
                        <a href="https://github.com/ojasjain112" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-mint-green transition-colors hover:-translate-y-1 transform duration-300">
                            <Github size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/sushiljain112/" target="_blank" rel="noopener noreferrer" className="text-gray-900 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-mint-green transition-colors hover:-translate-y-1 transform duration-300">
                            <Linkedin size={24} />
                        </a>
                        <a href="mailto:ojasjain012@gmail.com" className="text-gray-900 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-mint-green transition-colors hover:-translate-y-1 transform duration-300">
                            <Mail size={24} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-leafy-dark dark:bg-gray-800/30 border border-gray-700 rounded-2xl p-8 md:p-12 shadow-2xl"
                >
                    <form
                        name="contact"
                        method="POST"
                        data-netlify="true"
                        className="space-y-6"
                    >
                        <input type="hidden" name="form-name" value="contact" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-mint-green focus:ring-1 focus:ring-mint-green outline-none text-white transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-mint-green focus:ring-1 focus:ring-mint-green outline-none text-white transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows="5"
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:border-mint-green focus:ring-1 focus:ring-mint-green outline-none text-white transition-all resize-none"
                                placeholder="Hello, I'd like to talk about..."
                            ></textarea>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-8 py-4 bg-mint-green text-shadowed-green font-bold rounded-lg hover:bg-white transition-colors flex items-center gap-2"
                            >
                                Send Message
                                <Send size={18} />
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
