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
  onBack: () => void;
}

const Work: React.FC<WorkProps> = ({ onBack }) => {
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
      title: "Digital Fashion",
      services: ["Blender", "Marvelous Designer"],
      description: "A series of dress animations created using Marvelous Designer for cloth simulation and Blender for rendering and dynamics. This project focuses on achieving realistic fabric movement, draping, and collision across various dress styles. From flowing gowns to structured fashion pieces, each animation showcases attention to material behavior, physics accuracy, and visual elegance in motion."
      ,image: "https://blvkportfolio.b-cdn.net/clothsim/dresswalk.mp4",
      galleryImages: [
        "https://blvkportfolio.b-cdn.net/clothsim/dresswalk.mp4",
        "https://blvkportfolio.b-cdn.net/clothsim/dresstest.mp4",
        "https://blvkportfolio.b-cdn.net/clothsim/final.mp4"
      ]
     
     
    },
    {
      id: 4,
      title: "Road to houdini 2",
      services: ["Blender", "Houdini"],
      description: "This stylized miniature rocket launch scene was created as a personal study to explore the integration of Houdini's procedural effects with Blender's rendering capabilities. The project features a cartoon-style rocket taking off from a grid-paper launchpad, complete with smoke, fire, and dynamic lighting. Simulations for smoke and fire were crafted in Houdini, while modeling, shading, and final rendering were completed in Blender using Cycles."
      ,image: "https://blvkportfolio.b-cdn.net/rocketsim/rock.mp4",
      galleryImages: [
        "https://blvkportfolio.b-cdn.net/rocketsim/rock.mp4",
        "https://blvkportfolio.b-cdn.net/rocketsim/g.png"
        
      ]
     
     
    },
    {
      id: 4,
      title: "The Dubai Collection",
      services: ["Blender", "commercial"],
      description: "This 3D environment was created as a visual concept for The Dubai Collection, an archive-style website dedicated to showcasing vintage comic books. The scene is designed to represent a child's nostalgic bedroom—filled with collectibles, comic issues, action figures, and subtle lighting that captures the essence of late-night comic book reading.he website featured on the screen is a fictional landing page built into the scene to demonstrate the collection’s potential digital presentation. Modeled and rendered entirely in Blender using Cycles, with careful attention to storytelling through prop placement, lighting, and mood."
      ,image: "https://blvkportfolio.b-cdn.net/TDC/TDC1.png",
      galleryImages: [
        "https://blvkportfolio.b-cdn.net/TDC/TDC1.png",
        "https://blvkportfolio.b-cdn.net/TDC/TDC2.png",
        "https://blvkportfolio.b-cdn.net/TDC/TDC3.png",
        "https://blvkportfolio.b-cdn.net/TDC/TDC4.png",
        
      ]
     
     
    },
    {
      id: 4,
      title: "Modern Minimalist House",
      services: ["Blender", "Architecture","ongoing"],
      description: "A personal project exploring clean architectural lines and minimalist design principles through 3D visualization. This modern house was modeled and rendered entirely in Blender, focusing on open space, natural lighting, and a restrained color palette. The goal was to capture a serene, functional living environment with subtle details that emphasize form and materiality."
      ,image: "https://blvkportfolio.b-cdn.net/archi/archi.png",
      galleryImages: [
        "https://blvkportfolio.b-cdn.net/archi/1.png",
        "https://blvkportfolio.b-cdn.net/archi/2.png",
        "https://blvkportfolio.b-cdn.net/archi/3.png",
        "https://blvkportfolio.b-cdn.net/archi/4.png",
        "https://blvkportfolio.b-cdn.net/archi/5.png",
        
      ]
     
     
    },
    {
      id: 4,
      title: "AC Animation",
      services: ["Blender", "Product","Animation"],
      description: "This animation project was created to showcase an air conditioning unit in action within a modern interior setting. Modeled and animated in Blender, the scene focuses on realistic airflow simulation, subtle motion graphics, and thoughtful integration of the AC unit into a well-designed living space. Lighting and materials were carefully tuned to reflect a calm, ambient interior environment while keeping the product as the visual focal point."
      ,image: "https://blvkportfolio.b-cdn.net/acanim/ac%20animation.mp4",
      galleryImages: [
        "https://blvkportfolio.b-cdn.net/acanim/ac%20animation.mp4",
       "https://blvkportfolio.b-cdn.net/acanim/1.png"
        
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

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
            role="button"
            tabIndex={0}
            aria-label={`View details of ${project.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedProject(project);
              }
            }}
          >
            <div className="project-card-media">
              {project.image ? (
                isVideoFile(project.image) ? (
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="project-thumbnail"
                    aria-hidden="true"
                    onContextMenu={(e) => e.preventDefault()} 
                    controlsList="nodownload"
                  >
                    <source src={project.image} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={project.image} 
                    alt="" 
                    className="project-thumbnail" 
                    aria-hidden="true" 
                    onContextMenu={(e) => e.preventDefault()} 
                    draggable="false"
                  />
                )
              ) : (
                <div className="project-thumbnail-placeholder" aria-hidden="true">
                  <span>No preview available</span>
                </div>
              )}
              <div className="project-card-overlay">
                <span className="view-project">View Project</span>
              </div>
            </div>
            <div className="project-card-content">
              <h2 className="project-title">{project.title}</h2>
              <div className="project-services">
                {project.services.map((service, i) => (
                  <span key={i} className="project-service-tag">{service}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Work; 