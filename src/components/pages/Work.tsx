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

// Helper function to check if the file is a video
const isVideoFile = (url: string): boolean => {
  if (!url) return false;
  return url.toLowerCase().endsWith('.mp4') || 
         url.toLowerCase().endsWith('.webm') || 
         url.toLowerCase().endsWith('.ogg');
};

interface WorkProps {
  onBack: () => void; // Add prop for handling the back action
}

const Work: React.FC<WorkProps> = ({ onBack }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Environmental Study",
      services: ["Blender", "houdini"],
      description: "Created using Blender and Houdini, this scene explores realistic fluid simulation and environmental interaction. The focus was on natural water behavior around static geometry, such as rocks and driftwood, with attention to surface tension, light reflection, and refraction. This project served as a technical and artistic study in achieving photorealistic water dynamics within a natural setting.",
      image: "https://blvkportfolio.b-cdn.net/envfinal.mp4",
      galleryImages: [
        "https://blvkportfolio.b-cdn.net/Enviostud/envclay.png",
        "https://blvkportfolio.b-cdn.net/Enviostud/envfinal.png"
      ]
    },
    {
      id: 2,
      title: "Road to Houdini",
      services: ["Blender", "houdini"],
      description: "This cinematic shot was crafted using a hybrid Blender and Houdini workflow to explore rigid body simulations. The scene depicts a submarine forcefully breaking through a frozen landscape, showcasing dynamic interactions between ice shards and fluid elements. The focus was on achieving realistic collision behavior, fracture dynamics, and environmental storytelling through simulation.",
      image: "https://blvkportfolio.b-cdn.net/subsim/subsim/smosske.mp4",
      galleryImages: [
        "https://blvkportfolio.b-cdn.net/subsim/subsim/rKFLkoGnB8Ka307sLs9QpHNR8bA.webp",
        "https://blvkportfolio.b-cdn.net/subsim/subsim/Vq2fIhT89zpxShcfsNTNharRKk.webp"
      ]
    },
    {
      id: 3,
      title: "Product Animation",
      services: ["3D modeling", "Animation", "Commercial"],
      description: "A curated series of product animations created in Blender, covering a wide range of industries—from sleek tech devices to vibrant beverage branding. Each animation explores different material properties, lighting setups, and dynamic motion to enhance product appeal and storytelling. This collection highlights versatility in visual direction, shading, and simulation to bring both hard-surface and liquid-based products to life.",
      image: "https://blvkportfolio.b-cdn.net/productani/recorderthub.mp4",
      galleryImages: [
        "https://blvkportfolio.b-cdn.net/productani/recoder.mp4",
        "https://blvkportfolio.b-cdn.net/productani/mousemain.mp4",
        "https://blvkportfolio.b-cdn.net/productani/headphones.mp4",
        "https://blvkportfolio.b-cdn.net/productani/flipside.mp4"
      ]
    
    },
    {
      id: 4,
      title: "Digital Fashion Simulation",
      services: ["Blender", "Marvelous Designer"],
      description: "A series of dress animations created using Marvelous Designer for cloth simulation and Blender for rendering and dynamics. This project focuses on achieving realistic fabric movement, draping, and collision across various dress styles. From flowing gowns to structured fashion pieces, each animation showcases attention to material behavior, physics accuracy, and visual elegance in motion."
      ,image: "https://blvkportfolio.b-cdn.net/clothsim/dresswalk.mp4",
      galleryImages: [
        "https://blvkportfolio.b-cdn.net/clothsim/dresswalk.mp4",
        "https://blvkportfolio.b-cdn.net/productani/mousemain.mp4",
        "https://blvkportfolio.b-cdn.net/productani/headphones.mp4",
        "https://blvkportfolio.b-cdn.net/productani/flipside.mp4"
      ]
    
    
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
        <button className="back-button" onClick={onBack}>← Back</button>
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