import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectDetails from './ProjectDetails';

export interface Project {
  id: number;
  title: string;
  services: string[];
  description: string;
  image?: string;
  galleryImages?: string[];
}

const Work: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Portfolio Website",
      services: ["Web Design", "Development", "UI/UX"],
      description: "A minimalist portfolio website built with React and Framer Motion.",
      image: "/images/project1.jpg"
    },
    {
      id: 2,
      title: "E-commerce Platform",
      services: ["Web Development", "Backend", "API Integration"],
      description: "A full-stack e-commerce platform with payment processing and inventory management."
    },
    {
      id: 3,
      title: "Mobile App Design",
      services: ["UI/UX", "Mobile Design", "Prototyping"],
      description: "A sleek mobile app design for a fitness tracking application."
    },
    {
      id: 4,
      title: "Brand Identity",
      services: ["Branding", "Logo Design", "Style Guide"],
      description: "Complete brand identity design for a tech startup."
    }
  ];

  if (selectedProject) {
    return <ProjectDetails project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <motion.div
      className="work-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="work-header">
        <h1>Selected Projects</h1>
      </div>

      <div className="projects-container">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-item"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => setSelectedProject(project)}
            whileHover={{ x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="project-number">{(index + 1).toString().padStart(2, '0')}</div>
            <div className="project-content">
              <h2>{project.title}</h2>
              <div className="project-services">
                {project.services.map((service, i) => (
                  <span key={i}>{service}</span>
                ))}
              </div>
              <p className="project-description">{project.description}</p>
              
              <motion.div 
                className="project-image-container"
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: hoveredProject === project.id ? 'auto' : 0,
                  opacity: hoveredProject === project.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="project-image-placeholder">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    `Image placeholder for ${project.title}`
                  )}
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