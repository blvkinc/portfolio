import React from 'react';
import { motion } from 'framer-motion';

const NoiseOverlay = () => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.08,
        mixBlendMode: 'overlay',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 2048 2048' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
      animate={{
        filter: [
          'brightness(100%) contrast(200%)',
          'brightness(150%) contrast(200%)',
          'brightness(90%) contrast(200%)',
          'brightness(120%) contrast(200%)',
          'brightness(100%) contrast(200%)',
        ],
      }}
      transition={{
        repeat: Infinity,
        duration: 0.3,
        ease: "linear",
        times: [0, 0.25, 0.5, 0.75, 1]
      }}
    />
  );
};

export default NoiseOverlay; 