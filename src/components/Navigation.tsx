import { motion } from 'framer-motion';
import { Home, Briefcase, Award, Mail } from 'lucide-react';

const navItems = [
  { id: 'about', label: 'About', icon: Home },
  { id: 'works', label: 'Works', icon: Briefcase },
  { id: 'experience', label: 'Experience', icon: Award },
  { id: 'contact', label: 'Contact', icon: Mail }
];

const Navigation = ({ activeSection, setActiveSection, portfolioData }) => {
  return (
    <>
      {/* Header with name */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-30 p-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <motion.div
            className="text-white"
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              {portfolioData?.name || 'Video Editor'}
            </h1>
            <p className="text-purple-300 text-sm mt-1">
              {portfolioData?.title || 'Creative Professional'}
            </p>
            <a className='text-white' href='/login'>Login</a>
          </motion.div>

          {/* <motion.a
            href="/register"
            className="text-white/60 hover:text-white text-sm transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.a> */}
        </div>
      </motion.header>

      {/* Floating Navigation */}
      <motion.nav
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <div className="flex flex-col space-y-4">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative p-3 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-purple-500/30 text-white' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                >
                  <Icon size={20} />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-sm whitespace-nowrap">
                      {item.label}
                    </div>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;