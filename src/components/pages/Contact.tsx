import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div
      className="page-container"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <h1>Contact</h1>
      {/* Add your contact content here */}
    </motion.div>
  );
};

export default Contact; 