import React from 'react';
import { useCurrentFrame, spring } from 'remotion';

interface CalloutPin {
  label: string;
  badgeBg: string;
  badgeTextColor: string;
  badgeX: number;
  badgeY: number;
  targetX: number;
  targetY: number;
  startFrame: number;
}

export const InteractiveCallouts: React.FC = () => {
  const frame = useCurrentFrame();

  if (frame < 468 || frame >= 525) {
    return null;
  }

  const callouts: CalloutPin[] = [
    {
      label: 'MATA PISAU STAINLESS',
      badgeBg: '#FFFFFF',
      badgeTextColor: '#111111',
      badgeX: 230,
      badgeY: 760,
      targetX: 380,
      targetY: 960,
      startFrame: 472,
    },
    {
      label: 'PEGANGAN ERGONOMIS',
      badgeBg: '#FFD700',
      badgeTextColor: '#111111',
      badgeX: 720,
      badgeY: 680,
      targetX: 860,
      targetY: 880,
      startFrame: 484,
    },
    {
      label: 'PEMBUANG BIJI',
      badgeBg: '#00E676',
      badgeTextColor: '#111111',
      badgeX: 540,
      badgeY: 1240,
      targetX: 540,
      targetY: 1040,
      startFrame: 496,
    },
  ];

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
        {callouts.map((c, i) => {
          if (frame < c.startFrame) return null;
          const progress = spring({
            frame: frame - c.startFrame,
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

      {callouts.map((c, i) => {
        if (frame < c.startFrame) return null;
        const progress = spring({
          frame: frame - c.startFrame,
          fps: 30,
          config: { damping: 12, mass: 0.5, stiffness: 120 },
        });

        const pulse = 1 + 0.15 * Math.sin((frame - c.startFrame) * 0.3);

        return (
          <React.Fragment key={i}>
            {/* Target Circle Pointer with Pulsing Rings (like ref_017.jpg) */}
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
                backgroundColor: c.badgeBg,
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
                  color: c.badgeTextColor,
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
