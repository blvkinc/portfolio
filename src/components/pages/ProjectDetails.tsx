import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from './Work';

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

// Helper function to check if the file is a video
const isVideoFile = (url: string): boolean => {
  return url.toLowerCase().endsWith('.mp4') || 
         url.toLowerCase().endsWith('.webm') || 
         url.toLowerCase().endsWith('.ogg');
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Generate placeholder gallery images if none provided
  const galleryImages = project.galleryImages || Array(4).fill(null);
  
  return (
    <motion.div 
      className="project-details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="project-details-header">
        <button className="back-button" onClick={onBack}>← Back</button>
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
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <img src={project.image} alt={project.title} />
            )
          ) : (
            <div className="project-image-placeholder">
              Image placeholder for {project.title}
            </div>
          )}
        </div>
        
        <div className="project-details-info">
          <div className="project-services-large">
            {project.services.map((service, index) => (
              <span key={index}>{service}</span>
            ))}
          </div>
          
          <div className="project-description-full">
            <p>{project.description}</p>
            <p>This is an extended description of the project that provides more details about the work, challenges faced, and solutions implemented.</p>
          </div>
        </div>
        
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
                onClick={() => setSelectedImage(image || `placeholder-${index}`)}
                whileHover={{ scale: 1.02 }}
              >
                {image ? (
                  isVideoFile(image) ? (
                    <video 
                      src={image} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <img 
                      src={image} 
                      alt={`${project.title} gallery ${index + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  )
                ) : (
                  <div className="project-image-placeholder">
                    Gallery image {index + 1} for {project.title}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
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
              {selectedImage.includes('placeholder') ? (
                <div className="lightbox-placeholder">
                  Full size gallery image for {project.title}
                </div>
              ) : (
                isVideoFile(selectedImage) ? (
                  <video 
                    src={selectedImage} 
                    autoPlay 
                    loop 
                    muted 
                    controls
                    style={{ width: '100%', maxHeight: '90vh' }} 
                  />
                ) : (
                  <img src={selectedImage} alt={`${project.title} full size`} />
                )
              )}
              <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectDetails; 