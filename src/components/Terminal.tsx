import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalProps {
  onCommand: (command: string) => void;
  history?: string[];
}

const Terminal: React.FC<TerminalProps> = ({ onCommand, history = [] }) => {
  const [input, setInput] = useState<string>('');
  const [localHistory, setLocalHistory] = useState<string[]>(['Welcome to the terminal.', 'Type "<span class="terminal-command">help</span>" for available commands']);
  const [commandCount, setCommandCount] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [localHistory, history]);

  // Auto-clear local history if too many commands
  useEffect(() => {
    if (commandCount > 2) {
      // Keep only the most recent command
      const recentCommand = localHistory.filter(line => line.startsWith('>'))[commandCount - 1];
      setLocalHistory([recentCommand]);
      setCommandCount(1);
    }
  }, [commandCount, localHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const cmd = input.trim().toLowerCase();
      if (cmd === 'clear') {
        setLocalHistory([]);
        setCommandCount(0);
      } else {
        setLocalHistory(prev => [...prev, `> ${input}`]);
        setCommandCount(prev => prev + 1);
      }
      onCommand(cmd);
      setInput('');
    }
  };

  const handleClick = () => {
    inputRef.current?.focus();
  };

  // Combine local history with app history, but avoid duplicates
  const displayHistory = [...localHistory, ...history];

  return (
    <div className="terminal" onClick={handleClick} ref={terminalRef}>
      <div className="terminal-content">
        <AnimatePresence mode="popLayout">
          {displayHistory.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="terminal-line"
            >
              {line.startsWith('>') ? (
                <span className="terminal-command">{line}</span>
              ) : (
                line.includes('<span') ? (
                  <div dangerouslySetInnerHTML={{ __html: line }} />
                ) : (
                  line
                )
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <form onSubmit={handleSubmit} className="terminal-input-line">
          <motion.span
            className="prompt"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {'>'}
          </motion.span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal; 