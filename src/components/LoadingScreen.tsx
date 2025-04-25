import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadComplete: () => void;
  videoLoaded: boolean;
}

// Function to get a random character from a defined set
const getRandomChar = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;"<>,.?/~`';
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete, videoLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [showScreen, setShowScreen] = useState(true);
  const [titleText, setTitleText] = useState('');
  const [scrambleTitle, setScrambleTitle] = useState(true);
  
  const finalTitle = 'BLVK_INC';
  const scrambleRef = useRef<NodeJS.Timeout | null>(null);
  
  // Scramble text effect for title only
  useEffect(() => {
    let titleIndex = 0;
    let delay = 0;
    
    // Clear previous interval if it exists
    if (scrambleRef.current) {
      clearInterval(scrambleRef.current);
    }
    
    scrambleRef.current = setInterval(() => {
      // Title animation
      if (scrambleTitle) {
        const randomLength = Math.min(finalTitle.length, titleIndex + 3);
        let newText = '';
        
        for (let i = 0; i < randomLength; i++) {
          if (i < titleIndex && Math.random() > 0.3) {
            // Keep correct character
            newText += finalTitle[i];
          } else {
            // Add random character
            newText += getRandomChar();
          }
        }
        
        setTitleText(newText);
        
        // Gradually reveal correct title
        if (delay > 15) {
          titleIndex = Math.min(titleIndex + 1, finalTitle.length);
          if (titleIndex === finalTitle.length) {
            // Let it scramble a bit more before settling
            if (Math.random() > 0.7) {
              setScrambleTitle(false);
            }
          }
        }
      } else {
        setTitleText(finalTitle);
      }
      
      delay++;
    }, 50);
    
    return () => {
      if (scrambleRef.current) {
        clearInterval(scrambleRef.current);
      }
    };
  }, [scrambleTitle]);
  
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
        <div className="loading-title">{titleText || ' '}</div>
        <div className="loading-description">Developer | Designer</div>
        
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