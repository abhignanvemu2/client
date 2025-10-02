import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye, Calendar, User } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Works' },
  { id: 'Teasers', label: 'Teasers' },
  { id: 'Promos', label: 'Promos' },
  { id: 'Reels', label: 'Reels' },
  { id: 'short-film', label: 'Short Films' }
];

const WorksSection = ({ videos = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [thumbnails, setThumbnails] = useState({}); // { videoId: thumbnailDataUrl }

  const filteredVideos = selectedCategory === 'all'
    ? videos
    : videos.filter(video => video.category === selectedCategory);

  // Generate thumbnails
  useEffect(() => {
    videos.forEach((video) => {
      if (video.filename && !thumbnails[video._id]) {
        generateThumbnail(`https://client-o7ls.onrender.com/uploads/${video.filename}`)
          .then((thumbnail) => {
            setThumbnails((prev) => ({ ...prev, [video._id]: thumbnail }));
          })
          .catch((err) => console.error('Thumbnail error:', err));
      }
    });
  }, [videos]);

const generateThumbnail = (videoUrl) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'metadata';
    video.muted = true; // Required for autoplay in some browsers

    video.onerror = () => reject(new Error('Failed to load video'));

    video.onloadedmetadata = () => {
      // Seek to 1 second (or 0 if video is very short)
      const seekTime = Math.min(5, video.duration / 2);
      video.currentTime = seekTime;
    };

    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Use natural dimensions or scale down for performance
      const width = video.videoWidth || 320;
      const height = video.videoHeight || (width * 9) / 16;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(video, 0, 0, width, height);
      resolve(canvas.toDataURL('image/png'));
    };

    video.src = videoUrl;
  });
};

  return (
    <div className="w-full h-full p-8">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Featured <span className="text-purple-400">Works</span>
          </h2>
          <p className="text-gray-300 text-lg">
            A collection of my best video editing projects
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Video Grid */}
        <div className="flex-1 overflow-hidden">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full overflow-y-auto pr-4"
            layout
          >
            <AnimatePresence>
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video?._id}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 cursor-pointer group"
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  onClick={() => setSelectedVideo(video)}
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <img
                      src={thumbnails[video._id] || ""}
                      alt={video?.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </motion.div>
                    </div>

                    {/* Featured badge */}
                    {video?.featured && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        {video.client && (
                          <div className="flex items-center space-x-1">
                            <User size={12} />
                            <span>{video.client}</span>
                          </div>
                        )}
                        {video.year && (
                          <div className="flex items-center space-x-1">
                            <Calendar size={12} />
                            <span>{video.year}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-purple-400">
                        <Eye size={12} />
                        <span>View</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-lg rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Video Player */}
                <div className="aspect-video bg-black">
                  <video
                    controls
                    autoPlay
                    className="w-full h-full"
                    src={`https://client-o7ls.onrender.com/uploads/${selectedVideo.filename}`}
                    // poster={thumbnails[video._id] || ""}
                  />
                </div>

                {/* Video Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                  <p className="text-gray-300 mb-4">{selectedVideo.description}</p>

                  <div className="flex items-center space-x-6 text-sm text-gray-400">
                    {selectedVideo.client && <span>Client: {selectedVideo.client}</span>}
                    {selectedVideo.year && <span>Year: {selectedVideo.year}</span>}
                    <span className="capitalize">Category: {selectedVideo.category}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorksSection;
