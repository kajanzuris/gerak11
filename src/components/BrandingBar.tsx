import React from 'react';
import { useCurrentFrame } from 'remotion';

export const BrandingBar: React.FC = () => {
  const frame = useCurrentFrame();
  const totalFrames = 567;
  const progressPercent = Math.min(100, (frame / totalFrames) * 100);

  return (
    <>
      {/* Top Header Pill Bar (y: 45px) */}
      <div
        style={{
          position: 'absolute',
          top: '45px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 35,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(12, 14, 20, 0.92)',
          padding: '10px 32px',
          borderRadius: '30px',
          border: '1.5px solid rgba(255, 215, 0, 0.4)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.7)',
          backdropFilter: 'blur(12px)',
          fontFamily:
            "'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif",
        }}
      >
        <span style={{ fontSize: '24px' }}>⚡</span>
        <span
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#FFD700',
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          SMART KITCHEN GADGET
        </span>
        <span style={{ fontSize: '24px' }}>⚡</span>
      </div>

      {/* 2. TikTok / Shopee Safe Zone Branding Tag (above caption & shopping bag) */}
      <div
        style={{
          position: 'absolute',
          bottom: '360px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 27,
          backgroundColor: 'rgba(12, 14, 20, 0.88)',
          padding: '8px 26px',
          borderRadius: '25px',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backdropFilter: 'blur(10px)',
          fontFamily:
            "'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif",
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: '22px' }}>🍎</span>
        <span
          style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          ALAT PEMOTONG BUAH SERBAGUNA
        </span>
        <span
          style={{
            backgroundColor: '#FFD700',
            color: '#111111',
            fontSize: '18px',
            fontWeight: 900,
            padding: '3px 12px',
            borderRadius: '12px',
            marginLeft: '6px',
          }}
        >
          PREMIUM 304
        </span>
      </div>

      {/* 3. Sleek Video Progress Bar (placed at bottom: 335px, right below safe branding) */}
      <div
        style={{
          position: 'absolute',
          bottom: '335px',
          left: '70px',
          right: '70px',
          height: '5px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '3px',
          overflow: 'hidden',
          zIndex: 27,
        }}
      >
        <div
          style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FFB800, #FF2442, #00E676)',
            borderRadius: '3px',
            boxShadow: '0 0 10px #FFD700',
          }}
        />
      </div>

      {/* 4. Bottom Watermark Cover (subtle dark gradient overlay at the bottom edge to cover CapCut) */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '140px',
          background:
            'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      />
    </>
  );
};
