import React from 'react';
import { useCurrentFrame, spring } from 'remotion';
import { ChecklistPillsConfig } from '../types/project';

interface Props {
  checklist: ChecklistPillsConfig;
}

export const DynamicChecklist: React.FC<Props> = ({ checklist }) => {
  const frame = useCurrentFrame();

  if (
    !checklist ||
    frame < checklist.startFrame ||
    frame >= checklist.endFrame
  ) {
    return null;
  }

  const headerSpring = spring({
    frame: frame - checklist.startFrame,
    fps: 30,
    config: { damping: 12, mass: 0.5, stiffness: 130 },
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: '125px',
        left: '50px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        zIndex: 26,
        fontFamily:
          "'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif",
      }}
    >
      {/* Top Header Label */}
      {checklist.header && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFD700',
            padding: '10px 28px',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(255, 215, 0, 0.4)',
            border: '3px solid #111111',
            width: 'fit-content',
            transform: `scale(${headerSpring})`,
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              fontSize: '32px',
              fontWeight: 900,
              color: '#111111',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}
          >
            {checklist.header}
          </span>
        </div>
      )}

      {checklist.items?.map((p, idx) => {
        if (frame < p.triggerFrame) return null;

        const progress = spring({
          frame: frame - p.triggerFrame,
          fps: 30,
          config: { damping: 12, mass: 0.5, stiffness: 140 },
        });

        return (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(10, 12, 16, 0.95)',
              padding: '12px 28px',
              borderRadius: '40px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              border: '2px solid rgba(0, 230, 118, 0.5)',
              transform: `translateX(${(1 - progress) * -80}px) scale(${progress})`,
              opacity: progress,
              width: 'fit-content',
            }}
          >
            {/* Green Checkmark Circle */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#00E676',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                boxShadow: '0 0 16px rgba(0, 230, 118, 0.6)',
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111111"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Pill Text */}
            <span
              style={{
                fontSize: '36px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {p.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};
