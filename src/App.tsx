import React, { useState } from 'react';
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

  const handleCommand = (command: string) => {
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
      <img src="/bg.webp" alt="bg" className='bg-image' />
      <NoiseOverlay />
      
      <motion.div
        className='terminal-container'
        initial={{ x: '-50%', y: '-50%' }}
        animate={{
          x: currentPage === 'none' ? '-50%' : '-150%',
          y: '-50%',
          scale: currentPage === 'none' ? 1 : 0.8,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <Terminal onCommand={handleCommand} history={terminalHistory} />
      </motion.div>

      <AnimatePresence mode="wait">
        {currentPage === 'about' && <About />}
        {currentPage === 'work' && <Work />}
        {currentPage === 'contact' && <Contact />}
      </AnimatePresence>
    </div>
  );
}

export default App;
