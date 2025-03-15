import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Terminal from './components/Terminal';
import NoiseOverlay from './components/NoiseOverlay';
import About from './components/pages/About';
import Work from './components/pages/Work';
import Contact from './components/pages/Contact';

type Page = 'none' | 'about' | 'work' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('none');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const touchStartY = useRef(0);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsTerminalVisible(currentPage === 'none');
    }
  }, [currentPage, isMobile]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (currentPage !== 'none') {
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (currentPage === 'none') return;
    
    const touchY = e.touches[0].clientY;
    const diff = touchY - touchStartY.current;
    
    if (diff > 0 && pageRef.current) {
      pageRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (currentPage === 'none') return;
    
    const touchY = e.changedTouches[0].clientY;
    const diff = touchY - touchStartY.current;
    
    if (diff > 100) {
      setCurrentPage('none');
      setTerminalHistory(prev => [...prev, 'Returning to home...']);
      if (isMobile) {
        setIsTerminalVisible(true);
      }
    } else if (pageRef.current) {
      pageRef.current.style.transform = 'translateY(0)';
    }
  };

  const handleCommand = (command: string) => {
    console.log('Command received:', command);
    const cmd = command.toLowerCase().trim();
    
    switch (cmd) {
      case 'help':
        setTerminalHistory(prev => [...prev, 
          'Available commands:',
          'about    - Learn about me',
          'work     - View my projects',
          'contact  - Get in touch',
          'clear    - Clear terminal',
          'home     - Return to home',
          'help     - Show this help message'
        ]);
        break;
      case 'about':
        setCurrentPage('about');
        setTerminalHistory(prev => [...prev, 'Opening about page...']);
        break;
      case 'work':
        setCurrentPage('work');
        setTerminalHistory(prev => [...prev, 'Opening work page...']);
        break;
      case 'contact':
        setCurrentPage('contact');
        setTerminalHistory(prev => [...prev, 'Opening contact page...']);
        break;
      case 'clear':
        setTerminalHistory([]);
        setCurrentPage('none');
        break;
      case 'home':
        setCurrentPage('none');
        setTerminalHistory(prev => [...prev, 'Returning to home...']);
        break;
      default:
        setTerminalHistory(prev => [...prev, `Command not found: ${command}`]);
        break;
    }
  };

  return (
    <div className="App">
      <div className="logo">BLVK_INC</div>
      <div className="video-background">
        <iframe 
          src="https://player.vimeo.com/video/1066085229?background=1&autoplay=1&loop=1&byline=0&title=0&controls=0&quality=1080p"
          allow="autoplay; fullscreen"
          className="bg-video"
          title="Background Video"
          frameBorder="0"
          style={{ width: '177.77777778vh', /* 16:9 */ minWidth: '100vw', minHeight: '56.25vw' /* 16:9 */ }}
        />
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
            {currentPage === 'about' && <About />}
            {currentPage === 'work' && <Work />}
            {currentPage === 'contact' && <Contact />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
