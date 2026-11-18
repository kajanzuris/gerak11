import React from 'react';
import { AbsoluteFill } from 'remotion';
import { ProjectSpec } from './types/project';
import { DynamicBackground } from './components/DynamicBackground';
import { DynamicPanels } from './components/DynamicPanels';
import { DynamicChecklist } from './components/DynamicChecklist';
import { DynamicCallouts } from './components/DynamicCallouts';
import { DynamicStickers } from './components/DynamicStickers';
import { DynamicSubtitles } from './components/DynamicSubtitles';
import { ParticleOverlay } from './components/ParticleOverlay';
import { DynamicBranding } from './components/DynamicBranding';
import { DynamicAudio } from './components/DynamicAudio';
import defaultProjectJson from '../public/default_project.json';

const defaultFallback = defaultProjectJson as unknown as ProjectSpec;

interface Props {
  project?: ProjectSpec;
  [key: string]: any;
}

export const UniversalVideo: React.FC<Props> = (rawProps) => {
  // Support both direct ProjectSpec props and wrapped { project: ProjectSpec } props
  const project: ProjectSpec =
    rawProps?.projectId
      ? (rawProps as unknown as ProjectSpec)
      : rawProps?.project || defaultFallback;

  const {
    videoSource = 'video0222.mp4',
    clips = [],
    metadata = { width: 1080, height: 1920, durationInFrames: 567 },
    lighting,
    parallaxCard,
    kineticPanels = [],
    contextualStickers = [],
    checklistPills,
    interactiveCallouts = [],
    subtitles = [],
    brandingBar,
    audioConfig,
  } = project;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        width: metadata.width || 1080,
        height: metadata.height || 1920,
        overflow: 'hidden',
      }}
    >
      {/* 1. Base Video & Dynamic Lighting & Parallax Card */}
      <DynamicBackground
        videoSource={videoSource}
        clips={clips}
        lighting={lighting}
        parallaxCard={parallaxCard}
        totalFrames={metadata.durationInFrames}
      />

      {/* 2. Floating Ambient Particles */}
      <ParticleOverlay />

      {/* 3. Contextual Visual Stickers & Animations */}
      <DynamicStickers stickers={contextualStickers} />

      {/* 4. Checklist Pills */}
      {checklistPills && <DynamicChecklist checklist={checklistPills} />}

      {/* 5. Interactive Callout Pins & Connector Lines */}
      {interactiveCallouts?.length > 0 && (
        <DynamicCallouts callouts={interactiveCallouts} />
      )}

      {/* 6. Kinetic Top Panels & Badges */}
      {kineticPanels?.length > 0 && (
        <DynamicPanels
          panels={kineticPanels}
          parallaxCard={parallaxCard}
        />
      )}

      {/* 7. Word-by-Word Synchronized Subtitles */}
      {subtitles?.length > 0 && <DynamicSubtitles subtitles={subtitles} />}

      {/* 8. Top Branding Header & Bottom Progress Banner */}
      {brandingBar && (
        <DynamicBranding
          branding={brandingBar}
          totalFrames={metadata.durationInFrames}
        />
      )}

      {/* 9. Dynamic Audio & SFX Events */}
      {audioConfig && (
        <DynamicAudio
          audioConfig={audioConfig}
          defaultVideoAudio={videoSource}
          clips={clips}
        />
      )}
    </AbsoluteFill>
  );
};
