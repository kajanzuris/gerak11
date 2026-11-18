import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
} from 'remotion';

export const VideoBackground: React.FC = () => {
  const frame = useCurrentFrame();

  // Dynamic Lighting (Gelap Terang)
  // 0 - 240: Dark / Problem mood
  // 240 - 260: Turnaround Flash
  // 260 - 567: Bright / Solution mood
  const brightness = interpolate(
    frame,
    [0, 235, 248, 260, 280, 567],
    [0.78, 0.78, 1.45, 1.12, 1.06, 1.06],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const contrast = interpolate(
    frame,
    [0, 235, 260, 567],
    [1.15, 1.15, 1.06, 1.06],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const saturation = interpolate(
    frame,
    [0, 235, 260, 567],
    [0.85, 0.85, 1.18, 1.18],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Vignette intensity
  const vignetteOpacity = interpolate(
    frame,
    [0, 235, 260, 567],
    [0.65, 0.65, 0.15, 0.15],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Parallax 3D Card Mode (like ref_004.jpg)
  // Active around frames 248 - 303 ("Pakai alat potong apel!")
  const isParallaxActive = frame >= 248 && frame < 305;
  const parallaxProgress = spring({
    frame: frame - 248,
    fps: 30,
    config: { damping: 14, mass: 0.8, stiffness: 90 },
  });
  const parallaxExit = spring({
    frame: frame - 296,
    fps: 30,
    config: { damping: 14, mass: 0.6, stiffness: 100 },
  });

  const cardScale = isParallaxActive
    ? interpolate(parallaxProgress - parallaxExit, [0, 1], [1.0, 0.88], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1.0;

  const rotateY = isParallaxActive
    ? interpolate(parallaxProgress - parallaxExit, [0, 1], [0, -6.5], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }) + Math.sin(frame * 0.08) * 1.2
    : 0;

  const rotateX = isParallaxActive
    ? interpolate(parallaxProgress - parallaxExit, [0, 1], [0, 3.5], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }) + Math.cos(frame * 0.08) * 0.8
    : 0;

  const borderRadius = isParallaxActive
    ? interpolate(parallaxProgress - parallaxExit, [0, 1], [0, 36], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  // Camera punch zoom on action cuts
  const punchZoom =
    (frame >= 303 && frame < 345 ? 1.04 : 1.0) *
    (frame >= 409 && frame < 458 ? 1.03 : 1.0);

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0E', overflow: 'hidden' }}>
      {/* Blurred background behind parallax card */}
      {isParallaxActive && (
        <AbsoluteFill style={{ overflow: 'hidden', filter: 'blur(30px) brightness(0.4)' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              transform: 'scale(1.2)',
            }}
          >
            <OffthreadVideo
              src={staticFile('video0222.mp4')}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* Main Video Layer / 3D Floating Card */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1200px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transform: `perspective(1200px) scale(${cardScale * punchZoom}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
            borderRadius: `${borderRadius}px`,
            overflow: 'hidden',
            boxShadow: isParallaxActive
              ? '0 35px 70px rgba(0,0,0,0.85), 0 0 40px rgba(255,215,0,0.2)'
              : 'none',
            border: isParallaxActive
              ? '3px solid rgba(255,255,255,0.45)'
              : 'none',
            filter: `brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`,
            transition: 'border-radius 0.2s ease',
          }}
        >
          <OffthreadVideo
            src={staticFile('video0222.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Moody Vignette Gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                frame < 248
                  ? 'radial-gradient(ellipse at 50% 45%, rgba(180, 20, 20, 0.08) 0%, rgba(0, 0, 0, 0.8) 100%)'
                  : 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)',
              opacity: vignetteOpacity,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Flash overlay during turnaround */}
      {frame >= 244 && frame <= 256 && (
        <AbsoluteFill
          style={{
            backgroundColor: '#FFFFFF',
            opacity: interpolate(frame, [244, 248, 256], [0, 0.85, 0]),
            pointerEvents: 'none',
            zIndex: 30,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
