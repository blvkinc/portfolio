import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  category: string;
  items: string[];
}

const skills: Skill[] = [
  {
    category: 'Design & Animation',
    items: ['3D Modeling', 'Motion Graphics', 'Product Animation', 'CGI on Real-World Footage']
  },
  {
    category: 'Development',
    items: ['Web Development', 'Front-End Engineering', 'UI/UX Design', 'Interaction Design']
  },
  {
    category: 'Software & Tools',
    items: ['Blender', 'Cinema 4D', 'After Effects', 'Unreal Engine', 'Python', 'JavaScript', 'React', 'p5.js']
  }
];

const About: React.FC = () => {
  return (
    <motion.div 
      className="page-container about-page"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="about-content">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          About Me
        </motion.h1>

        <motion.div 
          className="about-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p>I'm Dhanuja Shakya Siriwardhena—a creative technologist blending art and code to craft immersive digital experiences. With a passion for storytelling through design, animation, and interactive visuals, I thrive at the intersection of creativity and technology. Whether it's CGI-enhanced ads, fluid 3D animations, or sleek user interfaces, I bring concepts to life with precision and imagination.</p>
        </motion.div>

        <motion.div 
          className="skills-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Skills</h2>
          <div className="skills-grid">
            {skills.map((skillGroup, index) => (
              <motion.div 
                key={skillGroup.category}
                className="skill-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <h3>{skillGroup.category}</h3>
                <div className="skill-items">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="skill-tag">{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="education-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2>Education</h2>
          <div className="education-item">
            <h3>MSc Software Engineering (First-Class)</h3>
            <p>University of Wolverhampton</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About; 