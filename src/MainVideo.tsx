import React from 'react';
import { AbsoluteFill } from 'remotion';
import { VideoBackground } from './components/VideoBackground';
import { KineticPanels } from './components/KineticPanels';
import { ChecklistPills } from './components/ChecklistPills';
import { InteractiveCallouts } from './components/InteractiveCallouts';
import { SupportingGraphics } from './components/SupportingGraphics';
import { Subtitles } from './components/Subtitles';
import { ParticleOverlay } from './components/ParticleOverlay';
import { BrandingBar } from './components/BrandingBar';
import { AudioTracks } from './components/AudioTracks';

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        width: 1080,
        height: 1920,
        overflow: 'hidden',
      }}
    >
      {/* 1. Base Video & Dynamic Lighting & 3D Tilt Card */}
      <VideoBackground />

      {/* 2. Floating Ambient Particles */}
      <ParticleOverlay />

      {/* 3. Contextual Visual Stickers & Illustrations */}
      <SupportingGraphics />

      {/* 4. Checklist Pills (Lebih Cepat, Higienis, Aman) */}
      <ChecklistPills />

      {/* 5. Interactive Callout Pins & Connector Lines */}
      <InteractiveCallouts />

      {/* 6. Kinetic Top Panels & Branded Badges */}
      <KineticPanels />

      {/* 7. Word-by-Word Synchronized Subtitles with Yellow Highlight */}
      <Subtitles />

      {/* 8. Top Branding Header & Bottom Progress Banner (clean finish) */}
      <BrandingBar />

      {/* 9. Voiceover & Dynamic SFX */}
      <AudioTracks />
    </AbsoluteFill>
  );
};
