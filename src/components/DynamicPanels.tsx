import React from 'react';
import { useCurrentFrame, spring } from 'remotion';
import { KineticPanel, ParallaxCardConfig } from '../types/project';

interface Props {
  panels: KineticPanel[];
  parallaxCard?: ParallaxCardConfig;
}

export const DynamicPanels: React.FC<Props> = ({ panels, parallaxCard }) => {
  const frame = useCurrentFrame();

  const getSpring = (startFrame: number, damping = 12, stiffness = 130) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps: 30,
      config: { damping, mass: 0.5, stiffness },
    });
  };

  const activePanel = panels.find(
    (p) => frame >= p.startFrame && frame < p.endFrame
  );

  if (!activePanel) return null;

  const springVal = getSpring(activePanel.startFrame);

  return (
    <div
      style={{
        position: 'absolute',
        top: '120px',
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 25,
        fontFamily:
          "'Montserrat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* 1. Problem Alert */}
      {activePanel.type === 'problem_alert' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${springVal})`,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '20px 52px 28px 52px',
            borderRadius: '20px',
            border: `2.5px solid ${activePanel.badgeColor || '#FF2442'}`,
            boxShadow: `0 16px 45px rgba(0,0,0,0.9), 0 0 30px ${activePanel.badgeColor || '#FF2442'}55`,
            minWidth: '680px',
          }}
        >
          {activePanel.line1 && (
            <div
              style={{
                fontSize: '52px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                textShadow: '0 4px 14px rgba(0,0,0,0.9)',
                marginBottom: '10px',
              }}
            >
              {activePanel.line1}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: activePanel.badgeColor || '#FF2442',
              padding: '12px 36px',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(255, 36, 66, 0.5)',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '40px',
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                marginRight: '16px',
              }}
            />
            <span
              style={{
                fontSize: '50px',
                fontWeight: 900,
                color: activePanel.textColor || '#FFFFFF',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {activePanel.line2}
            </span>
            <div
              style={{
                width: '6px',
                height: '40px',
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                marginLeft: '16px',
              }}
            />
          </div>
        </div>
      )}

      {/* 2. Warning Tilted */}
      {activePanel.type === 'warning_tilted' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${springVal}) rotate(-3.5deg)`,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '20px 52px 30px 52px',
            borderRadius: '20px',
            border: `2.5px solid ${activePanel.badgeColor || '#FFB800'}`,
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            minWidth: '680px',
          }}
        >
          {activePanel.line1 && (
            <div
              style={{
                fontSize: '44px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              {activePanel.line1}
            </div>
          )}
          <div
            style={{
              backgroundColor: activePanel.badgeColor || '#FFB800',
              padding: '12px 38px',
              borderRadius: '10px',
              boxShadow: '0 10px 30px rgba(255, 184, 0, 0.45)',
              border: '3px solid #111111',
            }}
          >
            <span
              style={{
                fontSize: '52px',
                fontWeight: 900,
                color: activePanel.textColor || '#111111',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {activePanel.line2}
            </span>
          </div>
        </div>
      )}

      {/* 3. Danger Pulse */}
      {activePanel.type === 'danger_pulse' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '22px 52px 32px 52px',
            borderRadius: '24px',
            border: `2.5px solid ${activePanel.badgeColor || '#D50000'}`,
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            minWidth: '680px',
            transform: `scale(${
              springVal * (1 + 0.08 * Math.sin((frame - activePanel.startFrame) * 0.9))
            })`,
          }}
        >
          {activePanel.line1 && (
            <div
              style={{
                fontSize: '40px',
                fontWeight: 900,
                color: '#FF5252',
                letterSpacing: '2px',
                marginBottom: '8px',
              }}
            >
              {activePanel.line1}
            </div>
          )}
          <div
            style={{
              backgroundColor: activePanel.badgeColor || '#D50000',
              padding: '14px 42px',
              borderRadius: '50px',
              boxShadow: '0 10px 35px rgba(213, 0, 0, 0.6)',
              border: '3px solid #FFF',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            {activePanel.icon && (
              <span style={{ fontSize: '42px' }}>{activePanel.icon}</span>
            )}
            <span
              style={{
                fontSize: '48px',
                fontWeight: 900,
                color: activePanel.textColor || '#FFFFFF',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {activePanel.line2}
            </span>
          </div>
        </div>
      )}

      {/* 4. Bounce Drop */}
      {activePanel.type === 'bounce_drop' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '22px 52px 32px 52px',
            borderRadius: '20px',
            border: `2.5px solid ${activePanel.badgeColor || '#FF6D00'}`,
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            minWidth: '680px',
            transform: `scale(${springVal})`,
          }}
        >
          {activePanel.line1 && (
            <div
              style={{
                fontSize: '44px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '2px',
                marginBottom: '10px',
              }}
            >
              {activePanel.line1}
            </div>
          )}
          <div
            style={{
              backgroundColor: activePanel.badgeColor || '#FF6D00',
              padding: '14px 40px',
              borderRadius: '10px',
              boxShadow: '0 12px 35px rgba(255, 109, 0, 0.5)',
              border: '3px solid #FFF',
              transform: `translateY(${
                Math.sin((frame - activePanel.startFrame) * 0.4) * 5
              }px)`,
            }}
          >
            <span
              style={{
                fontSize: '48px',
                fontWeight: 900,
                color: activePanel.textColor || '#FFFFFF',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {activePanel.line2}
            </span>
          </div>
        </div>
      )}

      {/* 5. Glitch Stress */}
      {activePanel.type === 'glitch_stress' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '24px 52px',
            borderRadius: '20px',
            border: `3px solid ${activePanel.badgeColor || '#FF1744'}`,
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            minWidth: '680px',
            justifyContent: 'center',
            transform: `scale(${springVal}) translate(${
              (frame % 2 === 0 ? 1 : -1) * 3
            }px, ${(frame % 3 === 0 ? 1 : -1) * 2}px)`,
          }}
        >
          <span
            style={{
              fontSize: '52px',
              fontWeight: 900,
              color: activePanel.textColor || '#FF5252',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            {activePanel.line2}
          </span>
        </div>
      )}

      {/* 6. Solution Double (Turnaround & Parallax Stamp) */}
      {activePanel.type === 'solution_double' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${springVal})`,
            backgroundColor: 'rgba(10, 12, 16, 0.98)',
            padding: '24px 56px 56px 56px',
            borderRadius: '22px',
            border: `2.5px solid ${activePanel.badgeColor || '#FFD700'}`,
            boxShadow: `0 18px 50px rgba(0,0,0,0.95), 0 0 35px ${activePanel.badgeColor || '#FFD700'}55`,
            minWidth: '700px',
          }}
        >
          {activePanel.line1 && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '10px 40px',
                borderRadius: '8px',
                marginBottom: '10px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              }}
            >
              <span
                style={{
                  fontSize: '44px',
                  fontWeight: 900,
                  color: '#111111',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                {activePanel.line1}
              </span>
            </div>
          )}

          <div
            style={{
              backgroundColor: activePanel.badgeColor || '#FFD700',
              padding: '14px 48px',
              borderRadius: '10px',
              boxShadow: '0 12px 35px rgba(255, 215, 0, 0.5)',
              border: '3px solid #111111',
            }}
          >
            <span
              style={{
                fontSize: '54px',
                fontWeight: 900,
                color: activePanel.textColor || '#111111',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {activePanel.line2}
            </span>
          </div>

          {/* Stamp badge */}
          {parallaxCard?.stampTextTop && (
            <div
              style={{
                position: 'absolute',
                top: '40px',
                right: '-110px',
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                backgroundColor: '#111111',
                border: '5px solid #FFD700',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${getSpring(activePanel.startFrame + 10)}) rotate(12deg)`,
              }}
            >
              <span
                style={{
                  fontSize: '42px',
                  fontWeight: 900,
                  color: '#FFD700',
                  lineHeight: 1,
                }}
              >
                {parallaxCard.stampTextTop}
              </span>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '1px',
                }}
              >
                {parallaxCard.stampTextBottom}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 7. Action Press / Result Neat */}
      {(activePanel.type === 'action_press' ||
        activePanel.type === 'result_neat') && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${springVal})`,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '20px 52px 30px 52px',
            borderRadius: '20px',
            border: `2.5px solid ${activePanel.badgeColor || '#00E676'}`,
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            minWidth: '680px',
          }}
        >
          {activePanel.line1 && (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '10px 34px',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '42px',
                  fontWeight: 900,
                  color: '#111111',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                {activePanel.line1}
              </span>
            </div>
          )}
          <div
            style={{
              backgroundColor: activePanel.badgeColor || '#00E676',
              padding: '12px 40px',
              borderRadius: '8px',
              boxShadow: `0 10px 30px ${activePanel.badgeColor || '#00E676'}44`,
              border: '3px solid #111111',
            }}
          >
            <span
              style={{
                fontSize: '50px',
                fontWeight: 900,
                color: activePanel.textColor || '#111111',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {activePanel.line2}
            </span>
          </div>
        </div>
      )}

      {/* 8. Safe Shield */}
      {activePanel.type === 'safe_shield' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: `scale(${springVal})`,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '20px 48px',
            borderRadius: '40px',
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            border: `3px solid ${activePanel.badgeColor || '#00E676'}`,
            gap: '14px',
            minWidth: '680px',
            justifyContent: 'center',
          }}
        >
          {activePanel.icon && (
            <span style={{ fontSize: '42px' }}>{activePanel.icon}</span>
          )}
          <span
            style={{
              fontSize: '44px',
              fontWeight: 900,
              color: activePanel.textColor || '#FFFFFF',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            {activePanel.line2}
          </span>
        </div>
      )}

      {/* 9. Climax CTA */}
      {activePanel.type === 'climax_cta' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${springVal})`,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '24px 54px 34px 54px',
            borderRadius: '24px',
            border: `2.5px solid ${activePanel.badgeColor || '#FFD700'}`,
            boxShadow: `0 18px 50px rgba(0,0,0,0.95), 0 0 35px ${activePanel.badgeColor || '#FFD700'}55`,
            minWidth: '700px',
          }}
        >
          {activePanel.tagText && (
            <div
              style={{
                backgroundColor: '#1E232A',
                padding: '10px 32px',
                borderRadius: '30px',
                border: '2px solid #FFD700',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '14px',
              }}
            >
              <span style={{ fontSize: '28px' }}>🔖</span>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#FFD700',
                  letterSpacing: '1px',
                }}
              >
                {activePanel.tagText}
              </span>
            </div>
          )}

          {activePanel.line1 && (
            <div
              style={{
                fontSize: '56px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                textShadow: '0 6px 18px rgba(0,0,0,0.9)',
                marginBottom: '10px',
              }}
            >
              {activePanel.line1}
            </div>
          )}

          <div
            style={{
              backgroundColor: activePanel.badgeColor || '#FFD700',
              padding: '14px 52px',
              borderRadius: '12px',
              boxShadow: '0 14px 40px rgba(255, 215, 0, 0.55)',
              border: '4px solid #111111',
            }}
          >
            <span
              style={{
                fontSize: '58px',
                fontWeight: 900,
                color: activePanel.textColor || '#111111',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              {activePanel.line2}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
