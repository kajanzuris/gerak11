import React from 'react';
import { useCurrentFrame } from 'remotion';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

const PARTICLES: Particle[] = [
  { x: 120, y: 350, size: 24, speed: 0.8, opacity: 0.35, color: '#FFD700' },
  { x: 880, y: 520, size: 36, speed: 1.1, opacity: 0.25, color: '#FFF8E7' },
  { x: 250, y: 800, size: 18, speed: 0.9, opacity: 0.3, color: '#FFA000' },
  { x: 920, y: 1100, size: 42, speed: 1.3, opacity: 0.28, color: '#FFD700' },
  { x: 150, y: 1450, size: 28, speed: 0.7, opacity: 0.32, color: '#FFF8E7' },
  { x: 820, y: 1650, size: 22, speed: 1.0, opacity: 0.3, color: '#FFCA28' },
  { x: 500, y: 400, size: 16, speed: 0.6, opacity: 0.2, color: '#FFE082' },
  { x: 70, y: 950, size: 32, speed: 1.2, opacity: 0.26, color: '#FFD54F' },
  { x: 960, y: 300, size: 20, speed: 0.85, opacity: 0.3, color: '#FFF9C4' },
  { x: 420, y: 1300, size: 14, speed: 0.75, opacity: 0.25, color: '#FFECB3' },
];

export const ParticleOverlay: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 15,
      }}
    >
      {PARTICLES.map((p, idx) => {
        // Floating movement with sine wave drift
        const currentY = (p.y - frame * p.speed * 2.2 + 2200) % 2200 - 100;
        const currentX = p.x + Math.sin((frame + idx * 25) * 0.04) * 24;
        const currentOpacity =
          p.opacity * (0.8 + 0.2 * Math.sin((frame + idx * 15) * 0.08));

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: `${currentX}px`,
              top: `${currentY}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: p.color,
              opacity: currentOpacity,
              filter: `blur(${p.size * 0.4}px)`,
              boxShadow: `0 0 ${p.size * 0.8}px ${p.color}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
};
