import { motion } from 'framer-motion';
import { Play, Award, Users } from 'lucide-react';

const AboutSection = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div>
            <motion.h1
              className="text-5xl lg:text-7xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Creative
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Video Editor
              </span>
            </motion.h1>
            
            <motion.p
              className="text-md text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {data?.about || "Passionate about storytelling through video. I create compelling visual narratives that engage, inspire, and leave lasting impressions. Every frame tells a story."}
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            className="flex space-x-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: Play, label: '100+ Projects', value: '100+' },
              { icon: Award, label: 'Years Experience', value: '5+' },
              { icon: Users, label: 'Happy Clients', value: '50+' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full p-4 mb-2 w-16 h-16 flex items-center justify-center mx-auto">
                  <stat.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {(data?.skills || ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro', 'Motion Graphics', 'Color Grading']).map((skill, index) => (
                <motion.span
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Visual element */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-full h-96 lg:h-[500px]">
            {/* Main card */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl border border-white/20 p-8"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 flex items-center justify-center"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Play className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Create</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Let's bring your vision to life with cutting-edge video editing and creative storytelling.
                  </p>
                </div>

                <motion.div
                  className="bg-white/10 rounded-xl p-4"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-purple-300 text-sm font-semibold">Currently Available</p>
                  <p className="text-white text-xs mt-1">Open for new projects</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-30"
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;