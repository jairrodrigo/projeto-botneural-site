import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import Problems from './components/Problems';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import AIDemo from './components/AIDemo';
import Differentials from './components/Differentials';
import About from './components/About';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-black min-h-screen relative overflow-x-hidden">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Problems />
        <Services />
        <Portfolio />
        <AIDemo />
        <Differentials />
        <About />
        <Testimonials />
        <FinalCTA />
        <Contact />
        <FAQ />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;