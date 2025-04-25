import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Skill {
  category: string;
  items: string[];
}

interface AboutProps {
  onBack: () => void; // Add prop for handling the back action
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

// Data for the radar charts
const radarData = {
  development: {
    labels: ['React', 'Node.js', 'Next.js', 'Java', 'Python'],
    data: [90, 85, 90, 80, 95],
    color: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgba(54, 162, 235, 1)',
  },
  design: {
    labels: ['UI/UX Design', 'Motion Graphics', '3D Modeling', 'Visual Design', 'Animation', 'Graphic Design'],
    data: [80, 90, 95, 85, 92, 90],
    color: 'rgba(255, 99, 132, 0.5)',
    borderColor: 'rgba(255, 99, 132, 1)',
  },
  cybersecurity: {
    labels: ['Red Teaming', 'Security Operations', 'Incident Response', 'Exploitation', 'Penetration Testing', 'Malware Analysis'],
    data: [85, 70, 80, 87, 80, 75],
    color: 'rgba(75, 192, 192, 0.5)',
    borderColor: 'rgba(75, 192, 192, 1)',
  }
};

const About: React.FC<AboutProps> = ({ onBack }) => {
  // Create state for animated data
  const [animatedDevData, setAnimatedDevData] = useState<number[]>(Array(radarData.development.data.length).fill(0));
  const [animatedDesignData, setAnimatedDesignData] = useState<number[]>(Array(radarData.design.data.length).fill(0));
  const [animatedCyberData, setAnimatedCyberData] = useState<number[]>(Array(radarData.cybersecurity.data.length).fill(0));

  // Animation effect
  useEffect(() => {
    const animationDuration = 1500; // Total duration in ms
    const steps = 30; // Number of animation steps
    const stepDuration = animationDuration / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      // Update each dataset
      setAnimatedDevData(radarData.development.data.map(value => Math.min(value * progress, value)));
      setAnimatedDesignData(radarData.design.data.map(value => Math.min(value * progress, value)));
      setAnimatedCyberData(radarData.cybersecurity.data.map(value => Math.min(value * progress, value)));
      
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, []);

  // Chart options - same for all charts
  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.15)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            family: 'Space Grotesk'
          }
        },
        ticks: {
          backdropColor: 'transparent',
          color: 'rgba(255, 255, 255, 0.6)',
          z: 100,
          display: false
        },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 2,
        hoverRadius: 2
      }
    },
    maintainAspectRatio: false
  };

  // Create chart data objects with animated data
  const developmentChartData = {
    labels: radarData.development.labels,
    datasets: [
      {
        label: 'Development',
        data: animatedDevData,
        backgroundColor: radarData.development.color,
        borderColor: radarData.development.borderColor,
        borderWidth: 2,
        pointBackgroundColor: radarData.development.borderColor,
        pointRadius: 3,
        pointHoverRadius: 5
      }
    ]
  };

  const designChartData = {
    labels: radarData.design.labels,
    datasets: [
      {
        label: 'Design',
        data: animatedDesignData,
        backgroundColor: radarData.design.color,
        borderColor: radarData.design.borderColor,
        borderWidth: 2,
        pointBackgroundColor: radarData.design.borderColor,
        pointRadius: 3,
        pointHoverRadius: 5
      }
    ]
  };

  const cybersecurityChartData = {
    labels: radarData.cybersecurity.labels,
    datasets: [
      {
        label: 'Cybersecurity',
        data: animatedCyberData,
        backgroundColor: radarData.cybersecurity.color,
        borderColor: radarData.cybersecurity.borderColor,
        borderWidth: 2,
        pointBackgroundColor: radarData.cybersecurity.borderColor,
        pointRadius: 3,
        pointHoverRadius: 5
      }
    ]
  };

  return (
    <motion.div 
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1>About Me</h1>
      </div>

      <div className="about-content">
        <motion.div 
          className="about-intro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p>I'm Dhanuja Shakya Siriwardhena—a creative technologist blending art and code to craft immersive digital experiences. With a passion for storytelling through design, animation, and interactive visuals, I thrive at the intersection of creativity and technology. Whether it's CGI-enhanced ads, fluid 3D animations, or sleek user interfaces, I bring concepts to life with precision and imagination.</p>
        </motion.div>

        <motion.div 
          className="skill-charts-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Expertise</h2>
          <div className="radar-charts-container">
            <motion.div 
              className="radar-chart-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h3>Development</h3>
              <div className="radar-chart">
                <Radar data={developmentChartData} options={chartOptions} />
              </div>
            </motion.div>

            <motion.div 
              className="radar-chart-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h3>Design</h3>
              <div className="radar-chart">
                <Radar data={designChartData} options={chartOptions} />
              </div>
            </motion.div>

            <motion.div 
              className="radar-chart-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h3>Cybersecurity</h3>
              <div className="radar-chart">
                <Radar data={cybersecurityChartData} options={chartOptions} />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="skills-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2>Skills</h2>
          <div className="skills-grid">
            {skills.map((skillGroup, index) => (
              <motion.div 
                key={skillGroup.category}
                className="skill-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
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
          transition={{ delay: 1.1 }}
        >
          <h2>Education</h2>
          <div className="education-item">
            <h3>BSc Software Engineering hons (First-Class)</h3>
            <p>University of Wolverhampton</p>
          </div>
          <div className="education-item">
            <h3>BSc Information technology (Second-Upper-Class)</h3>
            <p>University of Colombo</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About; 