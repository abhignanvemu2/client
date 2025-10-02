import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Video, Settings, LogOut, Save, Upload, Trash2, Plus, CreditCard as Edit3 } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchUserData();
    fetchVideos();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://client-o7ls.onrender.com/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch('https://client-o7ls.onrender.com/api/videos');
      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-black via-purple-900/20 to-black">
      <div className="flex h-full">
        {/* Sidebar */}
        <motion.div
          className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/20"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-8">Admin Panel</h2>
            
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'videos', label: 'Videos', icon: Video },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-purple-500/30 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="flex-1 overflow-y-auto p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {activeTab === 'profile' && (
            <ProfileTab user={user} setUser={setUser} />
          )}
          {activeTab === 'videos' && (
            <VideosTab videos={videos} setVideos={setVideos} />
          )}
          {activeTab === 'settings' && (
            <SettingsTab />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ user, setUser }) => {
  const [formData, setFormData] = useState(user || {});
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://client-o7ls.onrender.com/api/portfolio/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Profile Settings</h1>
      
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-sm mb-2">Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm mb-2">Title</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-white/80 text-sm mb-2">About</label>
            <textarea
              rows={4}
              value={formData.about || ''}
              onChange={(e) => setFormData({ ...formData, about: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
            />
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 text-sm mb-2">Email</label>
              <input
                type="email"
                value={formData.contact?.email || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, email: e.target.value }
                })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              />
            </div>
            
            <div>
              <label className="block text-white/80 text-sm mb-2">Phone</label>
              <input
                type="tel"
                value={formData.contact?.phone || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, phone: e.target.value }
                })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isSaving}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-2">
            <Save size={20} />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </div>
        </motion.button>
      </form>
    </div>
  );
};

// Videos Tab Component
const VideosTab = ({ videos, setVideos }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  const handleVideoUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setIsUploading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://client-o7ls.onrender.com/api/videos/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const newVideo = await response.json();
        setVideos([newVideo, ...videos]);
        setShowUploadForm(false);
        alert('Video uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteVideo = async (id) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://client-o7ls.onrender.com/api/videos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setVideos(videos.filter(video => video._id !== id));
        alert('Video deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting video:', error);
      alert('Error deleting video');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Video Management</h1>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Video</span>
        </button>
      </div>

      {showUploadForm && (
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Upload New Video</h3>
          
          <form onSubmit={handleVideoUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                />
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-2">Category</label>
                <select
                  name="category"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                >
                  <option value="Teasers">Teasers</option>
                  <option value="Promos">Promos</option>
                  <option value="Reels">Reels</option>
                  <option value="short-film">Short Film</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-white/80 text-sm mb-2">Description</label>
              <textarea
                name="description"
                rows={3}
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">Client</label>
                <input
                  type="text"
                  name="client"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                />
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-2">Year</label>
                <input
                  type="number"
                  name="year"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-white/80 text-sm mb-2">Video File</label>
              <input
                type="file"
                name="video"
                accept="video/*"
                required
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-white">
                <input type="checkbox" name="featured" className="rounded" />
                <span>Featured Video</span>
              </label>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isUploading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 flex items-center space-x-2"
              >
                <Upload size={20} />
                <span>{isUploading ? 'Uploading...' : 'Upload Video'}</span>
              </button>
              
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="bg-white/10 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/20 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <motion.div
            key={video._id}
            className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <video
                src={`https://client-o7ls.onrender.com/uploads/${video.filename}`}
                className="w-full h-full object-cover"
                controls
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{video.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">
                  {video.category}
                </span>
                
                <div className="flex space-x-2">
                  <button className="text-white/60 hover:text-white p-2">
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeleteVideo(video._id)}
                    className="text-red-400 hover:text-red-300 p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Settings Tab Component
const SettingsTab = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4">General Settings</h3>
        <p className="text-gray-300">Settings panel coming soon...</p>
      </div>
    </div>
  );
};

export default AdminPanel;