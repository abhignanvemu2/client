import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, X, Instagram, Send } from 'lucide-react';

const ContactSection = ({ data }) => {
  const contact = data?.contact || {
    email: 'hello@videoeditor.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    social: {
      linkedin: 'linkedin.com/in/videoeditor',
      twitter: 'twitter.com/videoeditor',
      instagram: 'instagram.com/videoeditor'
    }
  };

  return (
    <div className="w-full h-full p-8">
      <div className="max-w-6xl mx-auto h-full flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Contact Info */}
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
                Let's <span className="text-purple-400">Connect</span>
              </motion.h2>
              
              <motion.p
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Ready to bring your vision to life? Let's discuss your next video project.
              </motion.p>
            </div>

            {/* Contact Details */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {[
                { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
                { icon: Phone, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
                { icon: MapPin, label: 'Location', value: contact.location || "Kormangala, Banglore" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 group cursor-pointer"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(168, 85, 247, 0.1)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  onClick={() => item.href && window.open(item.href)}
                >
                  <div className="bg-purple-500/20 p-3 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                    <item.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            {/* <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <h3 className="text-white font-semibold">Follow Me</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, href: contact?.social?.linkedin, color: 'hover:text-blue-400' },
                  // { icon: X, href: contact?.social?.twitter, color: 'hover:text-sky-400' },
                  { icon: Instagram, href: contact?.social?.instagram, color: 'hover:text-pink-400' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-white/10 p-3 rounded-full text-white/70 transition-all duration-300 ${social.color} hover:scale-110`}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div> */}
          </motion.div>

          {/* Right side - Contact Form */}
          {/* <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.h3
              className="text-2xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Start a Project
            </motion.h3>

            <motion.form
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Project Type"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={20} />
                <span>Send Message</span>
              </motion.button>
            </motion.form>

            {
            <motion.div
              className="mt-8 p-4 bg-green-500/20 border border-green-500/30 rounded-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-300 font-semibold">Available for new projects</span>
              </div>
              <p className="text-green-200 text-sm mt-1">
                I typically respond within 24 hours
              </p>
            </motion.div>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;