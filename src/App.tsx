import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Terminal from './components/Terminal';
import NoiseOverlay from './components/NoiseOverlay';
import About from './components/pages/About';
import Work from './components/pages/Work';
import Contact from './components/pages/Contact';
import Artworks from './components/pages/Artworks';
import LoadingScreen from './components/LoadingScreen';

type Page = 'none' | 'about' | 'work' | 'contact' | 'artworks';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('none');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const touchStartY = useRef(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Simulate video loading
    const videoLoadTimeout = setTimeout(() => {
      setVideoLoaded(true);
    }, 3000); // Adjust this time as needed

    return () => clearTimeout(videoLoadTimeout);
  }, []);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const handleCommand = (command: string) => {
    console.log('Command received:', command);
    
    // Create a new history array for responses only
    let newHistory = [...terminalHistory];
    
    const commandLower = command.toLowerCase().trim();
    
    if (commandLower === 'about') {
      newHistory.push('Loading about page...');
      setCurrentPage('about');
      if (isMobile) {
        setIsTerminalVisible(false);
      }
    } else if (commandLower === 'work') {
      newHistory.push('Loading work page...');
      setCurrentPage('work');
      if (isMobile) {
        setIsTerminalVisible(false);
      }
    } else if (commandLower === 'contact') {
      newHistory.push('Loading contact page...');
      setCurrentPage('contact');
      if (isMobile) {
        setIsTerminalVisible(false);
      }
    } else if (commandLower === 'artworks' || commandLower === 'art') {
      newHistory.push('Loading artworks page...');
      setCurrentPage('artworks');
      if (isMobile) {
        setIsTerminalVisible(false);
      }
    } else if (commandLower === 'clear') {
      setTerminalHistory([]);
      return;
    } else if (commandLower === 'help') {
      newHistory.push('Available commands:');
      newHistory.push('- about : View About Me');
      newHistory.push('- work : View My work');
      newHistory.push('- art : View My Artistic Projects');
      newHistory.push('- contact : Contact Me');
      newHistory.push('- clear : Clear terminal');
      newHistory.push('- exit : Close current page');
    } else if (commandLower === 'exit') {
      if (currentPage !== 'none') {
        newHistory.push('Closing page...');
        setCurrentPage('none');
        setIsTerminalVisible(true);
      } else {
        newHistory.push('No page is currently open.');
      }
    } else {
      newHistory.push(`Command not found: ${command}`);
      newHistory.push('Type "help" for available commands.');
    }
    
    setTerminalHistory(newHistory);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    
    const touchY = e.touches[0].clientY;
    const diff = touchY - touchStartY.current;
    
    if (diff > 50) {
      // Swiping down
      if (pageRef.current) {
        pageRef.current.style.transform = `translateY(${diff}px)`;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return;
    
    const touchY = e.changedTouches[0].clientY;
    const diff = touchY - touchStartY.current;
    
    if (diff > 100) {
      // Swipe down completed - close the page
      setCurrentPage('none');
      setIsTerminalVisible(true);
    }
    
    if (pageRef.current) {
      pageRef.current.style.transform = '';
    }
  };

  return (
    <div className="App">
      {isLoading ? (
        <LoadingScreen onLoadComplete={handleLoadComplete} videoLoaded={videoLoaded} />
      ) : (
        <>
          <div className="logo">BLVK_INC</div>
          <div className="video-background">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="bg-video"
              style={{ width: '177.77777778vh', minWidth: '100vw', minHeight: '56.25vw' }}
              onContextMenu={(e) => e.preventDefault()}
              controlsList="nodownload"
            >
              <source src="https://blvkportfolio.b-cdn.net/envfinal.mp4" type="video/mp4" />
            </video>
          </div>
          <NoiseOverlay />
          
          <motion.div
            className={`terminal-container ${!isTerminalVisible ? 'hidden' : ''}`}
            initial={{ x: '-50%', y: '-50%' }}
            animate={{
              x: currentPage === 'none' ? '-50%' : (isMobile ? '-50%' : '-150%'),
              y: isMobile ? '20px' : '-50%',
              scale: currentPage === 'none' ? 1 : (isMobile ? 1 : 0.8),
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <Terminal onCommand={handleCommand} history={terminalHistory} />
          </motion.div>

          <AnimatePresence mode="wait">
            {currentPage !== 'none' && (
              <motion.div
                ref={pageRef}
                className={`page-container ${currentPage}-page`}
                initial={{ 
                  x: isMobile ? 0 : '100%',
                  opacity: 0,
                  transform: isMobile ? 'translateY(100%)' : 'none'
                }}
                animate={{ 
                  x: 0,
                  opacity: 1,
                  transform: isMobile ? 'translateY(0)' : 'none'
                }}
                exit={{ 
                  x: isMobile ? 0 : '100%',
                  opacity: 0,
                  transform: isMobile ? 'translateY(100%)' : 'none'
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {currentPage === 'about' && <About onBack={() => {
                  setCurrentPage('none');
                  setIsTerminalVisible(true);
                }} />}
                {currentPage === 'work' && <Work onBack={() => {
                  setCurrentPage('none');
                  setIsTerminalVisible(true);
                }} />}
                {currentPage === 'contact' && <Contact onBack={() => {
                  setCurrentPage('none');
                  setIsTerminalVisible(true);
                }} />}
                {currentPage === 'artworks' && <Artworks onBack={() => {
                  setCurrentPage('none');
                  setIsTerminalVisible(true);
                }} />}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default App;
