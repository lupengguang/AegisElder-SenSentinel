import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RobotAShowcase from '../components/RobotAShowcase';
import BrandsBar from '../components/BrandsBar';
import MovieGradeSection from '../components/MovieGradeSection';
import NewArrivals from '../components/NewArrivals';
import FeaturedAccessories from '../components/FeaturedAccessories';
import AgriculturalDrones from '../components/AgriculturalDrones';
import IndustrySection from '../components/IndustrySection';
import PromoBanner from '../components/PromoBanner';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page-enter"
    >
      <Navbar />
      <main className="pt-16 md:pt-20">
        <Hero />
        <RobotAShowcase />
        <BrandsBar />
        <MovieGradeSection />
        <NewArrivals />
        <FeaturedAccessories />
        <AgriculturalDrones />
        <IndustrySection />
        <PromoBanner />
        <Newsletter />
      </main>
      <Footer />
    </motion.div>
  );
}
