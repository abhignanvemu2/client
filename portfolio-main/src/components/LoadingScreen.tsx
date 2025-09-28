import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="relative">
        {/* Main loading animation */}
        <motion.div
          className="w-32 h-32 border-4 border-purple-500/30 rounded-full"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <motion.div
            className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-500 rounded-full"
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Center logo/text */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="text-2xl font-bold text-white tracking-wider">
            <motion.span
              className="inline-block"
              animate={{
                color: ['#fff', '#a855f7', '#ec4899', '#fff'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              SONU
            </motion.span>
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.p
            className="text-white text-sm tracking-widest"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            LOADING EXPERIENCE...
          </motion.p>
        </motion.div>

        {/* Particle effects */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: `${60 + i * 20}px 0px`,
            }}
            animate={{
              rotate: 360,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LoadingScreen;