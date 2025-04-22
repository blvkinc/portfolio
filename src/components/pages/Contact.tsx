import React from 'react';
import { motion } from 'framer-motion';

interface ContactProps {
  onBack: () => void; // Add prop for handling the back action
}

const Contact: React.FC<ContactProps> = ({ onBack }) => {
  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contact-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>Contact</h1>
      </div>
      
      {/* Add your contact content here */}
    </motion.div>
  );
};

export default Contact; 