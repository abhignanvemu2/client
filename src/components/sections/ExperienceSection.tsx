import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, TrendingUp } from 'lucide-react';

const ExperienceSection = ({ data }) => {
  const experiences = data?.experience || [
    {
      company: 'Creative Studios Inc.',
      position: 'Senior Video Editor',
      duration: '2022 - Present',
      description: 'Lead video editor for high-profile commercial campaigns and documentaries. Managed a team of 3 junior editors and collaborated with directors on creative vision.'
    },
    {
      company: 'Media Production House',
      position: 'Video Editor',
      duration: '2020 - 2022',
      description: 'Specialized in music videos and short films. Developed expertise in motion graphics and color grading. Worked with various artists and independent filmmakers.'
    },
    {
      company: 'Freelance',
      position: 'Video Editor & Motion Graphics Designer',
      duration: '2018 - 2020',
      description: 'Provided video editing services for small businesses and content creators. Built a diverse portfolio across multiple industries including fashion, technology, and entertainment.'
    }
  ];

  return (
    <div className="w-full h-full p-8">
      <div className="max-w-6xl mx-auto h-full flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Header */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.h2
                className="text-5xl lg:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                My <span className="text-purple-400">Journey</span>
              </motion.h2>
              
              <motion.p
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Years of dedication, growth, and creative evolution in the world of video editing.
              </motion.p>
            </div>

            {/* Achievement Cards */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { icon: Award, label: 'Awards Won', value: '12+' },
                { icon: TrendingUp, label: 'Projects', value: '100+' },
                { icon: Calendar, label: 'Experience', value: '5+ Years' },
                { icon: MapPin, label: 'Locations', value: '15+' }
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <achievement.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{achievement.value}</div>
                  <div className="text-sm text-gray-400">{achievement.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Experience Timeline */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              >
                {/* Timeline line */}
                <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent" />
                
                {/* Experience Card */}
                <motion.div
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 ml-12 relative"
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-12 top-6 w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
                  
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white">{experience.position}</h3>
                      <p className="text-purple-300 font-semibold">{experience.company}</p>
                    </div>
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {experience.duration}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {experience.description}
                  </p>

                  {/* Hover effect line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Current status */}
            <motion.div
              className="ml-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-white font-semibold">Currently Available for New Projects</span>
                </div>
                <p className="text-gray-300 mt-2">
                  Ready to bring your creative vision to life with cutting-edge video editing techniques.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;