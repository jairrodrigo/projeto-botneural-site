import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Problems from './components/Problems';
import Services from './components/Services';
import About from './components/About';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import AIDemo from './components/AIDemo';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Problems />
        <Services />
        <Process />
        <Testimonials />
        <AIDemo />
        <Contact />
        <About />
        <Footer />
      </div>
    </div>
  );
}

export default App;