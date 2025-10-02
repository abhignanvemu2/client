import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import AboutSection from './sections/AboutSection';
import WorksSection from './sections/WorksSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';
import ParticleBackground from './ParticleBackground';

const sections = [
  { id: 'about', component: AboutSection },
  { id: 'works', component: WorksSection },
  { id: 'experience', component: ExperienceSection },
  { id: 'contact', component: ContactSection }
];

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [portfolioData, setPortfolioData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchPortfolioData();
    fetchVideos();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const response = await fetch('https://client-o7ls.onrender.com/api/portfolio/public');
      if (response.ok) {
        const data = await response.json();
        setPortfolioData(data);
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch('https://client-o7ls.onrender.com/api/videos');
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
        setIsLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      setIsLoaded(true);
    }
  };

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component;

  if (!isLoaded) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-white text-lg sm:text-xl text-center">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-black via-purple-900/10 to-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ParticleBackground />

      {/* Navigation - Ensure it's responsive */}
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        portfolioData={portfolioData}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4 sm:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            className="w-full max-w-6xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {ActiveComponent && (
              <ActiveComponent 
                data={portfolioData} 
                videos={videos}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating UI Elements - Responsive positioning */}
      <motion.div
        className="fixed bottom-6 left-4 sm:left-8 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-2 sm:px-6 sm:py-3 border border-white/20">
          <p className="text-white/80 text-xs sm:text-sm">Scroll-free Experience</p>
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-6 right-4 sm:right-8 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <div className="bg-purple-500/20 backdrop-blur-md rounded-full px-3 py-2 sm:px-6 sm:py-3 border border-purple-500/30">
          <p className="text-purple-300 text-xs sm:text-sm font-medium">Video Editor Portfolio</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;