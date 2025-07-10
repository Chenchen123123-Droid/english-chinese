import React, { useEffect, useState, useRef } from 'react';

interface Ripple {
  x: number;
  y: number;
  size: number;
  opacity: number;
  id: number;
}

const PurpleRippleEffect: React.FC = () => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isActive, setIsActive] = useState(true);
  const nextIdRef = useRef(0);
  const throttleRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleRef.current || !isActive) return;
      
      // Throttle ripple creation
      throttleRef.current = true;
      setTimeout(() => {
        throttleRef.current = false;
      }, 50);
      
      // Calculate position relative to the viewport
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;
      
      const x = e.clientX;
      const y = e.clientY;
      
      // Create new ripple
      const newRipple: Ripple = {
        x,
        y,
        size: 10 + Math.random() * 30,
        opacity: 0.7,
        id: nextIdRef.current++
      };
      
      setRipples(prevRipples => [...prevRipples, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prevRipples => prevRipples.filter(ripple => ripple.id !== newRipple.id));
      }, 1500);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);
  
  // Toggle effect with spacebar
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsActive(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      style={{ opacity: isActive ? 1 : 0 }}
    >
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute rounded-full bg-purple-500 mix-blend-screen"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            opacity: ripple.opacity,
            transform: 'translate(-50%, -50%)',
            animation: 'ripple-fade 1.5s ease-out forwards'
          }}
        />
      ))}
    </div>
  );
};

export default PurpleRippleEffect; 