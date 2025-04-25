import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArtworkProps {
  onBack: () => void;
}

// Define the artwork interface
interface Artwork {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  category: 'process' | 'project' | 'sound' | 'files' | 'human';
  isVideo?: boolean;
}

// Sample artwork data
const artworks: Artwork[] = [

  {
    id: '#0527',
    date: 'May 27, 2024',
    title: 'Animation Study',
    description: 'An experimental animation exploring fluid dynamics and particle physics, showcasing the interplay between motion and form in a controlled digital space.',
    image: 'https://blvkportfolio.b-cdn.net/misc/2_Animation_3_f69f76e172.mp4',
    category: 'process',
    isVideo: true
  },
  {
    id: '#0601',
    date: 'June 1, 2024',
    title: 'Link Frame Animation',
    description: 'A technical study of chain link mechanics and interconnected motion, visualizing the relationship between individual elements in a connected system.',
    image: 'https://blvkportfolio.b-cdn.net/misc/linkframe.mp4',
    category: 'project',
    isVideo: true
  },
  {
    id: '#0615',
    date: 'June 15, 2024',
    title: 'Two Tulips Study',
    description: 'A botanical animation study focusing on the subtle movements and growth patterns of tulips, rendered with attention to natural physics and organic flow.',
    image: 'https://blvkportfolio.b-cdn.net/misc/two%20tuplis.mp4',
    category: 'human',
    isVideo: true
  },
  {
    id: '#0112',
    date: 'January 12, 2024',
    title: 'Abstract Composition',
    description: 'A study in digital abstract composition, exploring the interplay of organic forms and geometric structures with a focus on depth and dimensional layering.',
    image: 'https://blvkportfolio.b-cdn.net/misc/1%20(1).webp',
    category: 'process'
  },
  {
    id: '#0224',
    date: 'February 24, 2024',
    title: 'Fluid Dynamics',
    description: 'An exploration of simulated fluid dynamics, capturing the ethereal movement and translucent properties of liquid materials in a controlled digital environment.',
    image: 'https://blvkportfolio.b-cdn.net/misc/sda.webp',
    category: 'project'
  },
  {
    id: '#0308',
    date: 'March 8, 2024',
    title: 'Beetle Study',
    description: 'Digital recreation of a beetle specimen, examining the complex structures and reflective qualities of its exoskeleton through careful lighting and material simulation.',
    image: 'https://blvkportfolio.b-cdn.net/misc/beetlde.webp',
    category: 'project'
  },
  {
    id: '#0419',
    date: 'April 19, 2024',
    title: 'Cloud Formation',
    description: 'A procedural study of cloud formations, exploring volumetric rendering techniques to achieve realistic light scattering and density variations.',
    image: 'https://blvkportfolio.b-cdn.net/misc/cloudfs.webp',
    category: 'files'
  },
  {
    id: '#0521',
    date: 'May 21, 2024',
    title: 'Topology Experiment',
    description: 'An experimental approach to digital topology, manipulating geometric surfaces to create organic forms with complex curvature and structural integrity.',
    image: 'https://blvkportfolio.b-cdn.net/misc/ett.webp',
    category: 'process'
  },
  {
    id: '#0615',
    date: 'June 15, 2024',
    title: 'Digital Origami',
    description: 'A digital interpretation of traditional origami techniques, exploring how virtual materials can be folded and shaped to create complex geometric patterns.',
    image: 'https://blvkportfolio.b-cdn.net/misc/origami%20final.webp',
    category: 'human'
  },
  {
    id: '#0727',
    date: 'July 27, 2024',
    title: 'Material Refraction',
    description: 'Study of light refraction through translucent materials, focusing on the interplay between medium density, light angles, and color dispersion effects.',
    image: 'https://blvkportfolio.b-cdn.net/misc/test2.webp',
    category: 'files'
  },
  {
    id: '#0803',
    date: 'August 3, 2024',
    title: 'Crystalline Structure',
    description: 'An examination of crystalline formations and their interaction with light, focusing on the internal refractions and complex geometric arrangements.',
    image: 'https://blvkportfolio.b-cdn.net/misc/rsd.webp',
    category: 'project'
  },
  {
    id: '#0912',
    date: 'September 12, 2024',
    title: 'Amphibian Form Study',
    description: 'A detailed study of amphibian anatomy and surface properties, exploring the translucent skin and subtle color variations through advanced material rendering.',
    image: 'https://blvkportfolio.b-cdn.net/misc/frog.webp',
    category: 'human'
  },
  {
    id: '#1021',
    date: 'October 21, 2024',
    title: 'Abstract Pattern',
    description: 'An exploration of procedural pattern generation, creating complex abstract forms through algorithmic processes with controlled randomness and symmetry.',
    image: 'https://blvkportfolio.b-cdn.net/misc/Untitled-1.webp',
    category: 'sound'
  },
  {
    id: '#1118',
    date: 'November 18, 2024',
    title: 'Dimensional Portal',
    description: 'A conceptual piece exploring the idea of interdimensional portals, using layered transparency and perspective distortion to create a sense of depth and mystery.',
    image: 'https://blvkportfolio.b-cdn.net/misc/2.webp',
    category: 'sound'
  },
  {
    id: '#0719',
    date: 'July 19, 2023',
    title: 'Digital Sculpting',
    description: 'A sculptural experiment exploring fluid form and dynamic movement, rendered with attention to organic surface textures and ambient occlusion.',
    image: 'https://blvkportfolio.b-cdn.net/misc/1689780137109.webp',
    category: 'process'
  },
  {
    id: '#0721',
    date: 'July 21, 2023',
    title: 'Experimental Mesh',
    description: 'A study in digital mesh manipulation, examining how stretched and distorted polygons create unique visual textures and spatial relationships.',
    image: 'https://blvkportfolio.b-cdn.net/misc/1689956438959.webp',
    category: 'files'
  },
  {
    id: '#0830',
    date: 'August 30, 2023',
    title: 'Faceted Structure',
    description: 'An exploration of geometric faceting and its application to sculptural forms, investigating how light interacts with angular surfaces.',
    image: 'https://blvkportfolio.b-cdn.net/misc/308830565_463941789085654_2692053102180775026_n.webp',
    category: 'project'
  },
  {
    id: '#0831',
    date: 'August 31, 2023',
    title: 'Holographic Study',
    description: 'A technical examination of holographic materials, exploring iridescence and color shifting properties through advanced rendering techniques.',
    image: 'https://blvkportfolio.b-cdn.net/misc/308844812_641146524271053_460697216554487692_n.webp',
    category: 'files'
  },
  {
    id: '#0905',
    date: 'September 5, 2023',
    title: 'Botanical Digital Twin',
    description: 'A digital recreation of plant structures, examining the complex patterns and growth systems found in nature through procedural modeling.',
    image: 'https://blvkportfolio.b-cdn.net/misc/309452393_136159329164264_3043510003174563577_n.webp',
    category: 'human'
  },
  {
    id: '#0915',
    date: 'September 15, 2023',
    title: 'Particle Flow',
    description: 'An examination of particle dynamics and flow behaviors, capturing the emergent patterns that form when thousands of elements interact under simulated physics.',
    image: 'https://blvkportfolio.b-cdn.net/misc/312279992_660971482283298_6279000066183672856_n.webp',
    category: 'sound'
  },
  {
    id: '#0203',
    date: 'February 3, 2024',
    title: 'Surface Tension',
    description: 'A study of liquid surface behaviors, exploring the delicate balance between tension forces and gravity through high-detail simulation.',
    image: 'https://blvkportfolio.b-cdn.net/misc/333780767_219130907238866_6690489172896589252_n.webp',
    category: 'process'
  },
  {
    id: '#0210',
    date: 'February 10, 2024',
    title: 'Metamorphosis',
    description: 'A visual exploration of transformation and change, capturing the in-between states of an object as it shifts from one form to another.',
    image: 'https://blvkportfolio.b-cdn.net/misc/336509048_919733639269795_4549815873029803051_n.webp',
    category: 'project'
  },
  {
    id: '#0315',
    date: 'March 15, 2024',
    title: 'Spectral Analysis',
    description: 'A visualization of sound through form and color, transforming audio frequencies into tangible sculptural elements with corresponding chromatic attributes.',
    image: 'https://blvkportfolio.b-cdn.net/misc/356233225_789669532703006_4099679361726564190_n.webp',
    category: 'sound'
  },
  {
    id: '#0328',
    date: 'March 28, 2024',
    title: 'Quantum Visualization',
    description: 'An abstract interpretation of quantum mechanics principles, visualizing concepts like superposition and entanglement through dynamic geometric forms.',
    image: 'https://blvkportfolio.b-cdn.net/misc/361573311_1438840996899120_5272608450224879245_n.webp',
    category: 'files'
  },
  {
    id: '#0413',
    date: 'April 13, 2024',
    title: 'Ceramic Simulation',
    description: 'A study in digital materials replicating the properties of fired clay, exploring textures, micro-surface details, and light interaction with glazed surfaces.',
    image: 'https://blvkportfolio.b-cdn.net/misc/426148822_918757733225511_232009989592145601_n.webp',
    category: 'human'
  },
  {
    id: '#0423',
    date: 'April 23, 2024',
    title: 'Gravity Fields',
    description: 'A visualization of gravitational interactions, depicting how mass distorts spacetime through abstract representations of force fields and particle movement.',
    image: 'https://blvkportfolio.b-cdn.net/misc/440788361_238279376010314_5378702860752661304_n.webp',
    category: 'sound'
  },
  {
    id: '#0430',
    date: 'April 30, 2024',
    title: 'Neural Network Visualization',
    description: 'An artistic interpretation of artificial neural networks, representing the complex interconnected layers and information pathways of machine learning systems.',
    image: 'https://blvkportfolio.b-cdn.net/misc/456180117_7891971767567503_4098234671060821558_n.webp',
    category: 'project'
  },
 
];

const Artworks: React.FC<ArtworkProps> = ({ onBack }) => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Filter out any artworks with empty or invalid image URLs
  const validArtworks = artworks.filter(artwork => 
    artwork.image && 
    artwork.image.trim() !== '' && 
    artwork.title && 
    artwork.description
  );

  return (
    <motion.div
      className="artworks-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="artworks-header">
        <button className="back-button" onClick={onBack} aria-label="Back to home">← Back</button>
        <h1>Artworks</h1>
      </div>

      <div className="artworks-grid">
        {validArtworks.map((artwork) => (
          <motion.div
            key={artwork.id}
            className="artwork-tile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedArtwork(artwork)}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
            role="button"
            tabIndex={0}
            aria-label={`View ${artwork.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedArtwork(artwork);
              }
            }}
          >
            <div className="artwork-image-container">
              {artwork.isVideo ? (
                <video 
                  className="artwork-image" 
                  onContextMenu={(e) => e.preventDefault()} 
                  controlsList="nodownload"
                  loop
                  muted
                  autoPlay
                  playsInline
                >
                  <source src={artwork.image} type="video/mp4" />
                </video>
              ) : (
                <img 
                  src={artwork.image} 
                  alt={artwork.title} 
                  className="artwork-image" 
                  onContextMenu={(e) => e.preventDefault()} 
                  draggable="false"
                  onError={(e) => {
                    // Prevent infinite error loops if fallback also fails
                    e.currentTarget.onerror = null;
                    // Hide the broken image
                    e.currentTarget.style.display = 'none';
                    // Add a placeholder background
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.classList.add('image-error');
                    }
                  }}
                  onLoad={(e) => {
                    // Set the aspect ratio based on the natural dimensions of the image
                    const img = e.currentTarget;
                    if (img.parentElement) {
                      const aspectRatio = img.naturalWidth / img.naturalHeight;
                      img.parentElement.style.aspectRatio = aspectRatio.toString();
                    }
                  }}
                />
              )}
            </div>
            <div className="artwork-info">
              <span className="artwork-id">{artwork.id}</span>
              <span className="artwork-date">{artwork.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            className="artwork-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              className="artwork-detail"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-detail" 
                onClick={() => setSelectedArtwork(null)}
                aria-label="Close artwork detail"
              >
                ×
              </button>
              <div className="artwork-detail-image-container">
                {selectedArtwork.isVideo ? (
                  <video 
                    className="artwork-detail-image" 
                    onContextMenu={(e) => e.preventDefault()} 
                    controlsList="nodownload"
                    controls
                    autoPlay
                    loop
                  >
                    <source src={selectedArtwork.image} type="video/mp4" />
                  </video>
                ) : (
                  <img 
                    src={selectedArtwork.image} 
                    alt={selectedArtwork.title} 
                    className="artwork-detail-image" 
                    onContextMenu={(e) => e.preventDefault()} 
                    draggable="false"
                    onError={(e) => {
                      // Prevent infinite error loops if fallback also fails
                      e.currentTarget.onerror = null;
                      // Hide the broken image
                      e.currentTarget.style.display = 'none';
                      // Add a placeholder background to the container
                      if (e.currentTarget.parentElement) {
                        e.currentTarget.parentElement.classList.add('image-error');
                      }
                    }}
                  />
                )}
              </div>
              <div className="artwork-detail-info">
                <div className="artwork-meta">
                  <span className="artwork-id">{selectedArtwork.id}</span>
                  <span className="artwork-date">{selectedArtwork.date}</span>
                </div>
                <h2 className="artwork-title">{selectedArtwork.title}</h2>
                <p className="artwork-description">{selectedArtwork.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Artworks; 