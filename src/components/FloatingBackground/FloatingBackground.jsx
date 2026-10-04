import React, { useMemo } from 'react';
import { Doodle } from '../Doodle/Doodle';
import './FloatingBackground.css';

/**
 * Ambient floating decorative particles in the background
 */
export const FloatingBackground = () => {
  // Generate lightweight ambient floating elements
  const particles = useMemo(() => {
    return [
      { id: 1, type: 'heart', top: '10%', left: '8%', size: 20, color: 'rgba(255, 107, 139, 0.25)', delay: '0s', anim: 'animate-float' },
      { id: 2, type: 'sparkle', top: '18%', right: '12%', size: 18, color: 'rgba(255, 209, 102, 0.4)', delay: '1s', anim: 'animate-sparkle' },
      { id: 3, type: 'star', top: '35%', left: '6%', size: 16, color: 'rgba(196, 153, 243, 0.3)', delay: '2s', anim: 'animate-float-slow' },
      { id: 4, type: 'heart', top: '48%', right: '8%', size: 22, color: 'rgba(255, 107, 139, 0.2)', delay: '1.5s', anim: 'animate-float' },
      { id: 5, type: 'flower', top: '65%', left: '10%', size: 20, color: 'rgba(255, 180, 162, 0.35)', delay: '0.5s', anim: 'animate-wiggle' },
      { id: 6, type: 'sparkle', top: '78%', right: '14%', size: 22, color: 'rgba(255, 209, 102, 0.35)', delay: '2.5s', anim: 'animate-sparkle' },
      { id: 7, type: 'bow', top: '90%', left: '12%', size: 24, color: 'rgba(255, 107, 139, 0.25)', delay: '3s', anim: 'animate-float' },
    ];
  }, []);

  return (
    <div className="floating-background-layer" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`ambient-particle ${p.anim}`}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            animationDelay: p.delay,
          }}
        >
          <Doodle type={p.type} size={p.size} color={p.color} />
        </div>
      ))}
    </div>
  );
};

export default FloatingBackground;
