import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, MessageCircle, Youtube, Clock, Eye, EyeOff, RefreshCw } from 'lucide-react';

// Mock data for demonstration
const mockUniversityNotifications = [
  {
    id: 1,
    title: "Mid-semester Examination Schedule Released",
    date: "2025-05-29T10:30:00Z",
    link: "#",
    content: "The mid-semester examination schedule has been published on the university portal."
  },
  {
    id: 2,
    title: "Library Hours Extended During Exam Period",
    date: "2025-05-29T08:15:00Z",
    link: "#",
    content: "Central library will remain open 24/7 starting June 1st through June 15th."
  },
  {
    id: 3,
    title: "Guest Lecture on AI and Machine Learning",
    date: "2025-05-28T16:45:00Z",
    link: "#",
    content: "Dr. Sarah Johnson will deliver a guest lecture on June 5th at 2 PM in the main auditorium."
  }
];

const mockTelegramMessages = {
  channelA: [
    {
      id: 1,
      text: "Important: Assignment submission deadline extended to June 2nd for CS101 students.",
      date: "2025-05-29T11:20:00Z",
      channel: "University Updates"
    },
    {
      id: 2,
      text: "Weather Alert: Heavy rain expected tomorrow. Indoor activities recommended.",
      date: "2025-05-29T09:45:00Z",
      channel: "University Updates"
    }
  ],
  channelB: [
    {
      id: 1,
      text: "Student Council meeting postponed to Friday 3 PM. New agenda will be shared soon.",
      date: "2025-05-29T10:15:00Z",
      channel: "Student Affairs"
    },
    {
      id: 2,
      text: "Cafeteria menu updated with new vegetarian options. Check the notice board for details.",
      date: "2025-05-29T07:30:00Z",
      channel: "Student Affairs"
    }
  ]
};

// Utility function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

// Utility function to get time ago
const getTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);
  
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// Confirmation Modal Component
const ConfirmationModal = ({ onConfirm }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -50 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md mx-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <Bell className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            University Notifications
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            This portal aggregates notifications from university announcements, 
            Telegram channels, and live news streams. Please confirm you are 
            authorized to access this information.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg"
          >
            I Confirm Access
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// University Notifications Component
const UniversityNotifications = ({ notifications, isVisible, lastUpdated }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">University Notifications</h3>
        </div>
        {lastUpdated && (
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Updated {getTimeAgo(lastUpdated)}</span>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-700 p-4 rounded-lg hover:bg-gray-650 transition-colors cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-white font-medium group-hover:text-blue-300 transition-colors">
                {notification.title}
              </h4>
              <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                {formatDate(notification.date)}
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {notification.content}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Telegram Messages Component
const TelegramMessages = ({ messages, isVisible, lastUpdated }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentChannel, setCurrentChannel] = useState('channelA');
  
  const allMessages = [...messages.channelA, ...messages.channelB].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  useEffect(() => {
    if (!isVisible || allMessages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % allMessages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isVisible, allMessages.length]);

  if (!isVisible) return null;

  const currentMessage = allMessages[currentMessageIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Telegram Updates</h3>
        </div>
        {lastUpdated && (
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Updated {getTimeAgo(lastUpdated)}</span>
          </div>
        )}
      </div>
      
      {currentMessage && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-700 p-4 rounded-lg"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-green-400 text-sm font-medium">
                {currentMessage.channel}
              </span>
              <span className="text-xs text-gray-400">
                {formatDate(currentMessage.date)}
              </span>
            </div>
            <p className="text-gray-200 leading-relaxed">
              {currentMessage.text}
            </p>
          </motion.div>
        </AnimatePresence>
      )}
      
      <div className="flex justify-center mt-4 space-x-2">
        {allMessages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMessageIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentMessageIndex ? 'bg-green-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

// YouTube Live Component
const YouTubeLive = ({ isVisible, lastUpdated }) => {
  const [currentStream, setCurrentStream] = useState(0);
  
  // Mock YouTube channel IDs (replace with actual channel IDs)
  const liveStreams = [
    { id: 'UC_x5XG1OV2P6uZZ5FSM9Ttw', name: 'Google Developers' },
    { id: 'UCsT0YIqwnpJCM-mx7-gSA4Q', name: 'TechCrunch' }
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Youtube className="w-5 h-5 text-red-400" />
          <h3 className="text-xl font-semibold text-white">Live News Streams</h3>
        </div>
        {lastUpdated && (
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Updated {getTimeAgo(lastUpdated)}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex space-x-2 mb-4">
          {liveStreams.map((stream, index) => (
            <button
              key={stream.id}
              onClick={() => setCurrentStream(index)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                currentStream === index 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {stream.name}
            </button>
          ))}
        </div>
        
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/live_stream?channel=${liveStreams[currentStream].id}&autoplay=1&mute=1`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Live Stream - ${liveStreams[currentStream].name}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Toggle Controls Component
const ToggleControls = ({ visibilityState, onToggle }) => {
  const controls = [
    { key: 'university', label: 'University', icon: Bell, color: 'blue' },
    { key: 'telegram', label: 'Telegram', icon: MessageCircle, color: 'green' },
    { key: 'youtube', label: 'YouTube', icon: Youtube, color: 'red' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 mb-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Display Controls</h3>
        <div className="flex space-x-4">
          {controls.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => onToggle(key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                visibilityState[key]
                  ? `bg-${color}-600 text-white`
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
              }`}
            >
              {visibilityState[key] ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <Icon className="w-4 h-4" />
              <span className="text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main App Component
export default function UniversityNotificationsApp() {
  const [confirmed, setConfirmed] = useState(false);
  const [visibilityState, setVisibilityState] = useState({
    university: true,
    telegram: true,
    youtube: true
  });
  
  // Mock last updated times
  const lastUpdated = {
    university: "2025-05-29T11:25:00Z",
    telegram: "2025-05-29T11:23:00Z",
    youtube: "2025-05-29T11:20:00Z"
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const handleToggle = (key) => {
    setVisibilityState(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <AnimatePresence>
        {!confirmed && (
          <ConfirmationModal onConfirm={handleConfirm} />
        )}
      </AnimatePresence>

      {confirmed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8 max-w-6xl"
        >
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              University Notifications Hub
            </h1>
            <p className="text-gray-400">
              Real-time updates from university announcements, Telegram channels, and live news
            </p>
          </motion.header>

          <ToggleControls 
            visibilityState={visibilityState} 
            onToggle={handleToggle} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <UniversityNotifications
                notifications={mockUniversityNotifications}
                isVisible={visibilityState.university}
                lastUpdated={lastUpdated.university}
              />
              
              <TelegramMessages
                messages={mockTelegramMessages}
                isVisible={visibilityState.telegram}
                lastUpdated={lastUpdated.telegram}
              />
            </div>
            
            <div>
              <YouTubeLive
                isVisible={visibilityState.youtube}
                lastUpdated={lastUpdated.youtube}
              />
            </div>
          </div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center mt-12 text-gray-500 text-sm"
          >
            <p>Updates refresh automatically every 30 seconds</p>
          </motion.footer>
        </motion.div>
      )}
    </div>
  );
}