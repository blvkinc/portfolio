import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  number: string;
  title: string;
  services: string[];
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 'project1',
    number: '01',
    title: 'Project One',
    services: ['UI Design', 'Development', 'Branding'],
    description: 'A minimalist e-commerce platform focusing on user experience and conversion optimization. The project doubled its revenue following the launch.',
    image: '/images/project1.jpg'
  },
  {
    id: 'project2',
    number: '02',
    title: 'Project Two',
    services: ['Web Design', 'UX Research', 'Digital Direction'],
    description: 'Redesigned digital presence with focus on storytelling and brand identity. Completed in record time while maintaining high quality.',
    image: '/images/project2.jpg'
  },
  {
    id: 'project3',
    number: '03',
    title: 'Project Three',
    services: ['Frontend', 'UI/UX', 'Development'],
    description: 'An innovative web application that pushes the boundaries of interactive design while maintaining accessibility and performance.',
    image: '/images/project3.jpg'
  }
];

const Work: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <motion.div 
      className="page-container work-page"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="work-header">
        <h1>Selected work ({projects.length.toString().padStart(2, '0')})</h1>
      </div>
      
      <div className="projects-container">
        {projects.map((project) => (
          <motion.div 
            key={project.id}
            className="project-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onHoverStart={() => setHoveredProject(project.id)}
            onHoverEnd={() => setHoveredProject(null)}
          >
            <div className="project-number">({project.number})</div>
            <div className="project-content">
              <h2>{project.title}</h2>
              <div className="project-services">
                {project.services.map((service, index) => (
                  <span key={index}>{service}</span>
                ))}
              </div>
              <p className="project-description">{project.description}</p>
              <motion.div 
                className="project-image-container"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: hoveredProject === project.id ? 1 : 0,
                  height: hoveredProject === project.id ? 300 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="project-image-placeholder">
                  <span>Image placeholder for {project.title}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Work; 