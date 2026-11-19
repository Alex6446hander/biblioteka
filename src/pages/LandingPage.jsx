import React from 'react';
import Hero from '../components/Hero';
import Advantages from '../components/Advantages';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Advantages />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
