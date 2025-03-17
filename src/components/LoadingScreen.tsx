import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  videoLoaded: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete, videoLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [showScreen, setShowScreen] = useState(true);
  
  // Simulate loading progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!videoLoaded) {
      // Increment progress up to 90% while waiting for video
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (Math.random() * 2);
          return Math.min(newProgress, 90);
        });
      }, 100);
    } else {
      // When video is loaded, quickly reach 100%
      setProgress(100);
      
      // After reaching 100%, wait a moment then trigger exit animation
      setTimeout(() => {
        setShowScreen(false);
        setTimeout(onLoadComplete, 1000); // Allow exit animation to complete
      }, 500);
    }
    
    return () => clearInterval(interval);
  }, [videoLoaded, onLoadComplete]);
  
  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: showScreen ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="loading-content">
        <div className="loading-title">BLVK_INC</div>
        
        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <motion.div 
              className="loading-progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <div className="loading-percentage">
            <span className="loading-percentage-number">{Math.floor(progress)}</span>
            <span className="loading-percentage-symbol">%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 