import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
} from 'remotion';
import { LightingConfig, ParallaxCardConfig, VideoClip } from '../types/project';

interface Props {
  videoSource: string;
  clips?: VideoClip[];
  lighting: LightingConfig;
  parallaxCard: ParallaxCardConfig;
  totalFrames: number;
}

export const DynamicBackground: React.FC<Props> = ({
  videoSource,
  clips = [],
  lighting,
  parallaxCard,
  totalFrames,
}) => {
  const frame = useCurrentFrame();

  const {
    problemEndFrame = 248,
    flashFrame = 248,
    darkVignetteIntensity = 0.65,
    brightContrast = 1.06,
    brightSaturation = 1.18,
  } = lighting || {};

  // Dynamic Lighting (Gelap Terang)
  const brightness = interpolate(
    frame,
    [0, problemEndFrame - 10, flashFrame, flashFrame + 12, flashFrame + 30, totalFrames],
    [0.78, 0.78, 1.45, 1.12, 1.06, 1.06],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const contrast = interpolate(
    frame,
    [0, problemEndFrame - 10, flashFrame + 12, totalFrames],
    [1.15, 1.15, brightContrast, brightContrast],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const saturation = interpolate(
    frame,
    [0, problemEndFrame - 10, flashFrame + 12, totalFrames],
    [0.85, 0.85, brightSaturation, brightSaturation],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const vignetteOpacity = interpolate(
    frame,
    [0, problemEndFrame - 10, flashFrame + 12, totalFrames],
    [darkVignetteIntensity, darkVignetteIntensity, 0.15, 0.15],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Parallax 3D Card Mode
  const isParallaxActive =
    parallaxCard?.enabled &&
    frame >= parallaxCard.startFrame &&
    frame < parallaxCard.endFrame;

  const parallaxProgress = spring({
    frame: Math.max(0, frame - (parallaxCard?.startFrame || 0)),
    fps: 30,
    config: { damping: 14, mass: 0.8, stiffness: 90 },
  });

  const parallaxExit = spring({
    frame: Math.max(0, frame - (parallaxCard?.endFrame - 8 || 0)),
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
            {clips && clips.length > 0 ? (
              clips.map((clip, index) => {
                const isLast = index === clips.length - 1;
                const duration = isLast
                  ? Math.max(clip.durationInFrames, totalFrames - clip.startFrame)
                  : clip.durationInFrames;
                return (
                  <Sequence
                    key={index}
                    from={clip.startFrame}
                    durationInFrames={duration}
                  >
                    <OffthreadVideo
                      src={staticFile(clip.source)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      muted
                    />
                  </Sequence>
                );
              })
            ) : (
              <OffthreadVideo
                src={staticFile(videoSource)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                muted
              />
            )}
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
            transform: `perspective(1200px) scale(${cardScale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
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
          {clips && clips.length > 0 ? (
            clips.map((clip, index) => {
              const isLast = index === clips.length - 1;
              const duration = isLast
                ? Math.max(clip.durationInFrames, totalFrames - clip.startFrame)
                : clip.durationInFrames;
              return (
                <Sequence
                  key={index}
                  from={clip.startFrame}
                  durationInFrames={duration}
                >
                  <OffthreadVideo
                    src={staticFile(clip.source)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    muted
                  />
                </Sequence>
              );
            })
          ) : (
            <OffthreadVideo
              src={staticFile(videoSource)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              muted
            />
          )}

          {/* Vignette Gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                frame < problemEndFrame
                  ? 'radial-gradient(ellipse at 50% 45%, rgba(180, 20, 20, 0.08) 0%, rgba(0, 0, 0, 0.8) 100%)'
                  : 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)',
              opacity: vignetteOpacity,
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Flash overlay during turnaround */}
      {frame >= flashFrame - 4 && frame <= flashFrame + 8 && (
        <AbsoluteFill
          style={{
            backgroundColor: '#FFFFFF',
            opacity: interpolate(
              frame,
              [flashFrame - 4, flashFrame, flashFrame + 8],
              [0, 0.85, 0]
            ),
            pointerEvents: 'none',
            zIndex: 30,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
