import React, { useEffect, useState } from 'react';

interface FireworkParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  lifespan: number;
  shape?: string; // For special shapes (circle, star, heart)
}

const Fireworks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState<FireworkParticle[]>([]);
  
  // Colors for the fireworks - adding more festive colors
  const colors = [
    '#ff0000', // Red
    '#ffff00', // Yellow
    '#00ff00', // Green
    '#00ffff', // Cyan
    '#0000ff', // Blue
    '#ff00ff', // Magenta
    '#ffffff', // White
    '#ff8800', // Orange
    '#ff00aa', // Pink
    '#aaff00', // Lime
    '#22ffaa', // Turquoise
    '#dd00ff'  // Purple
  ];

  // Create a firework explosion
  const createFirework = () => {
    const newParticles: FireworkParticle[] = [];
    
    // Random position for the firework explosion
    const x = Math.random() * (window.innerWidth * 0.8) + window.innerWidth * 0.1;
    const y = Math.random() * (window.innerHeight * 0.6) + window.innerHeight * 0.2;
    
    // Create 40-70 particles for each firework
    const particleCount = Math.floor(Math.random() * 30) + 40;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Choose a shape pattern for this firework (sometimes)
    const shapePatterns = ['circle', 'star', 'random', 'heart', 'ring'];
    const selectedPattern = shapePatterns[Math.floor(Math.random() * shapePatterns.length)];
    
    for (let i = 0; i < particleCount; i++) {
      let angle, speed, shape;
      
      // Different patterns based on selection
      if (selectedPattern === 'circle') {
        angle = (i / particleCount) * Math.PI * 2;
        speed = Math.random() * 3 + 3;
      } else if (selectedPattern === 'star') {
        // Create a star-like pattern
        const armCount = 5;
        angle = ((i % armCount) / armCount) * Math.PI * 2;
        speed = Math.random() * 5 + (Math.floor(i / armCount) * 0.5);
      } else if (selectedPattern === 'heart') {
        // Heart shape
        angle = (i / particleCount) * Math.PI * 2;
        const heartShape = (angle: number) => {
          // Heart curve parametric equation
          return {
            x: 16 * Math.pow(Math.sin(angle), 3),
            y: 13 * Math.cos(angle) - 5 * Math.cos(2*angle) - 2 * Math.cos(3*angle) - Math.cos(4*angle)
          };
        };
        const pos = heartShape(angle);
        const scaleFactor = (Math.random() * 0.5) + 0.5;
        shape = 'heart';
        angle = Math.atan2(pos.y, pos.x);
        speed = Math.sqrt(pos.x*pos.x + pos.y*pos.y) * 0.3 * scaleFactor;
      } else if (selectedPattern === 'ring') {
        // Ring with empty center
        angle = (i / particleCount) * Math.PI * 2;
        speed = Math.random() * 1 + 4; // Consistent speed for ring
      } else {
        // Random pattern (default)
        angle = Math.random() * Math.PI * 2;
        speed = Math.random() * 5 + 2;
      }
      
      // Create the particle
      newParticles.push({
        id: Date.now() + i,
        x,
        y,
        size: Math.random() * 4 + 2,
        color: shape === 'heart' ? '#ff3366' : color, // Hearts are red/pink
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        lifespan: Math.random() * 50 + 70, // Longer lifespan
        shape
      });
    }
    
    // Add a burst effect at the center
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: Date.now() + particleCount + i,
        x,
        y,
        size: Math.random() * 2 + 4,
        color: '#ffffff',
        speedX: (Math.random() - 0.5) * 3,
        speedY: (Math.random() - 0.5) * 3,
        lifespan: Math.random() * 30 + 10,
      });
    }
    
    return newParticles;
  };

  useEffect(() => {
    // Create initial fireworks (3-5 explosions)
    const initialFireworks: FireworkParticle[] = [];
    const fireworkCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < fireworkCount; i++) {
      initialFireworks.push(...createFirework());
    }
    
    setParticles(initialFireworks);
    
    // Animation loop
    const animationInterval = setInterval(() => {
      setParticles((prevParticles: FireworkParticle[]) => {
        // Update existing particles
        const updatedParticles = prevParticles.map((particle: FireworkParticle) => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          speedY: particle.speedY + 0.05, // Gravity effect
          lifespan: particle.lifespan - 1,
          size: particle.lifespan < 20 ? particle.size * 0.95 : particle.size, // Shrink as they fade
        })).filter((particle: FireworkParticle) => particle.lifespan > 0);
        
        // Occasionally add new fireworks
        if (Math.random() < 0.07) { // Increased chance for more fireworks
          return [...updatedParticles, ...createFirework()];
        }
        
        return updatedParticles;
      });
    }, 30); // Faster animation
    
    // Hide fireworks after 5 seconds
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    
    // Cleanup
    return () => {
      clearInterval(animationInterval);
      clearTimeout(timeout);
    };
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle: FireworkParticle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.lifespan / 100,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transform: particle.shape === 'heart' ? 'rotate(225deg)' : 'none',
            clipPath: particle.shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : 'none',
          }}
        />
      ))}
    </div>
  );
};

export default Fireworks; 