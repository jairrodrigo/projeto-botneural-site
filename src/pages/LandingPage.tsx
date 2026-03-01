import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Problems from '../components/Problems';
import Services from '../components/Services';
import Methodology from '../components/Methodology';
import CasesCarousel from '../components/CasesCarousel';
import PositioningFilter from '../components/PositioningFilter';
import InvestmentSection from '../components/InvestmentSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import AutomatedBackground from '../components/AnimatedBackground';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10">
                <Header />
                <Hero />
                <Problems />
                <Services />
                <Methodology />
                <CasesCarousel />
                <PositioningFilter />
                <InvestmentSection />
                <FinalCTA />
                <Footer />
            </div>
        </div>
    );
};

export default LandingPage;
