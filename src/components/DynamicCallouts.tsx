import React from 'react';
import { useCurrentFrame, spring } from 'remotion';
import { CalloutPin } from '../types/project';

interface Props {
  callouts: CalloutPin[];
}

export const DynamicCallouts: React.FC<Props> = ({ callouts }) => {
  const frame = useCurrentFrame();

  if (!callouts || callouts.length === 0) return null;

  const activeCallouts = callouts.filter(
    (c) => frame >= c.startFrame && frame < c.endFrame
  );

  if (activeCallouts.length === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 24,
        pointerEvents: 'none',
        fontFamily:
          "'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif",
      }}
    >
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      >
        {activeCallouts.map((c, i) => {
          const progress = spring({
            frame: Math.max(0, frame - c.startFrame),
            fps: 30,
            config: { damping: 14, mass: 0.6, stiffness: 120 },
          });

          return (
            <line
              key={i}
              x1={c.badgeX}
              y1={c.badgeY + 25}
              x2={c.badgeX + (c.targetX - c.badgeX) * progress}
              y2={c.badgeY + 25 + (c.targetY - (c.badgeY + 25)) * progress}
              stroke="#FFD700"
              strokeWidth="4"
              strokeDasharray="6 4"
              opacity={progress * 0.9}
            />
          );
        })}
      </svg>

      {activeCallouts.map((c, i) => {
        const progress = spring({
          frame: Math.max(0, frame - c.startFrame),
          fps: 30,
          config: { damping: 12, mass: 0.5, stiffness: 120 },
        });

        const pulse = 1 + 0.15 * Math.sin((frame - c.startFrame) * 0.3);

        return (
          <React.Fragment key={i}>
            {/* Target Circle Pointer with Pulsing Rings */}
            <div
              style={{
                position: 'absolute',
                left: `${c.targetX}px`,
                top: `${c.targetY}px`,
                transform: `translate(-50%, -50%) scale(${progress})`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: `${54 * pulse}px`,
                  height: `${54 * pulse}px`,
                  borderRadius: '50%',
                  border: '3px solid #FFD700',
                  opacity: 0.6,
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#FFD700',
                  boxShadow: '0 0 16px #FFD700',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>

            {/* Label Badge */}
            <div
              style={{
                position: 'absolute',
                left: `${c.badgeX}px`,
                top: `${c.badgeY}px`,
                transform: `translate(-50%, -50%) scale(${progress})`,
                backgroundColor: c.badgeBg || '#FFFFFF',
                padding: '10px 24px',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
                border: '3px solid #111111',
              }}
            >
              <span
                style={{
                  fontSize: '26px',
                  fontWeight: 900,
                  color: c.badgeColor || '#111111',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {c.label}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
