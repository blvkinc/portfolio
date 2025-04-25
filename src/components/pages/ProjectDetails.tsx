import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './Work';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

// Helper function to check if the file is a video
const isVideoFile = (url: string): boolean => {
  if (!url) return false;
  return url.toLowerCase().endsWith('.mp4') || 
         url.toLowerCase().endsWith('.webm') || 
         url.toLowerCase().endsWith('.ogg');
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Use gallery images if provided, otherwise use an empty array
  const galleryImages = project.galleryImages || [];
  
  return (
    <motion.div 
      className="project-details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="project-details-header">
        <button className="back-button" onClick={onBack} aria-label="Back to projects">← Back</button>
        <h1>{project.title}</h1>
      </div>
      
      <div className="project-details-content">
        <div className="project-details-main-image">
          {project.image ? (
            isVideoFile(project.image) ? (
              <video 
                src={project.image} 
                autoPlay 
                loop 
                muted 
                playsInline
                controls
                className="main-media"
                onContextMenu={(e) => e.preventDefault()} 
                controlsList="nodownload"
              />
            ) : (
              <img 
                src={project.image} 
                alt={`${project.title} main visual`} 
                className="main-media" 
                onContextMenu={(e) => e.preventDefault()} 
                draggable="false"
              />
            )
          ) : (
            <div className="project-image-placeholder">
              <span>No image available</span>
            </div>
          )}
        </div>
        
        <div className="project-details-info">
          <div className="project-services-large">
            {project.services.map((service, index) => (
              <span key={index} className="service-tag">{service}</span>
            ))}
          </div>
          
          <div className="project-description-full">
            <p>{project.description}</p>
          </div>
        </div>
        
        {galleryImages.length > 0 && (
          <div className="project-gallery">
            <h2>Project Gallery</h2>
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <motion.div 
                  key={index} 
                  className="gallery-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedImage(image)}
                  whileHover={{ scale: 1.02 }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View larger version of gallery image ${index + 1}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedImage(image);
                    }
                  }}
                >
                  {isVideoFile(image) ? (
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="gallery-media"
                      onContextMenu={(e) => e.preventDefault()} 
                      controlsList="nodownload"
                    >
                      <source src={image} type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src={image} 
                      alt={`${project.title} gallery ${index + 1}`}
                      className="gallery-media"
                      onContextMenu={(e) => e.preventDefault()} 
                      draggable="false"
                    />
                  )}
                  <div className="gallery-item-overlay">
                    <span className="view-full">{isVideoFile(image) ? 'Play Video' : 'View Full'}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              {isVideoFile(selectedImage) ? (
                <video 
                  src={selectedImage} 
                  autoPlay 
                  loop 
                  controls
                  className="lightbox-media"
                  onContextMenu={(e) => e.preventDefault()} 
                  controlsList="nodownload"
                />
              ) : (
                <img 
                  src={selectedImage} 
                  alt={`${project.title} full size view`} 
                  className="lightbox-media" 
                  onContextMenu={(e) => e.preventDefault()} 
                  draggable="false"
                />
              )}
              <button 
                className="lightbox-close" 
                onClick={() => setSelectedImage(null)}
                aria-label="Close full view"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectDetails; 