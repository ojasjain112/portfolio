import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
    return (
        <ThemeProvider>
            <Layout>
                <Hero />
                <Skills />
                <Projects />
                <Contact />
            </Layout>
        </ThemeProvider>
    );
}

export default App;
