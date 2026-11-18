import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';

export const AudioTracks: React.FC = () => {
  return (
    <>
      {/* 1. Main Voiceover / Sound of the video */}
      <Audio src={staticFile('voiceover.mp3')} volume={1.0} />

      {/* 2. SFX Entrances & Highlights */}
      {/* Frame 0: Hook Whoosh */}
      <Sequence from={0} durationInFrames={15}>
        <Audio src={staticFile('whoosh.wav')} volume={0.65} />
      </Sequence>

      {/* Frame 80: Warning Pop */}
      <Sequence from={80} durationInFrames={10}>
        <Audio src={staticFile('pop.wav')} volume={0.7} />
      </Sequence>

      {/* Frame 132: Heartbeat pulse */}
      <Sequence from={132} durationInFrames={30}>
        <Audio src={staticFile('heartbeat.wav')} volume={0.9} />
      </Sequence>

      {/* Frame 165: Comic Bounce */}
      <Sequence from={165} durationInFrames={20}>
        <Audio src={staticFile('bounce.wav')} volume={0.8} />
      </Sequence>

      {/* Frame 248: Solution Reveal Ding & Whoosh */}
      <Sequence from={248} durationInFrames={25}>
        <Audio src={staticFile('whoosh.wav')} volume={0.7} />
        <Audio src={staticFile('ding.wav')} volume={0.85} />
      </Sequence>

      {/* Frame 303: Action Push Pop */}
      <Sequence from={303} durationInFrames={12}>
        <Audio src={staticFile('pop.wav')} volume={0.65} />
      </Sequence>

      {/* Frame 345: Razor Sharp Blade Slice & Sparkle */}
      <Sequence from={345} durationInFrames={20}>
        <Audio src={staticFile('slice.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={360} durationInFrames={30}>
        <Audio src={staticFile('sparkle.wav')} volume={0.7} />
      </Sequence>

      {/* Frame 416, 432, 448: Checklist Pops */}
      <Sequence from={416} durationInFrames={10}>
        <Audio src={staticFile('pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={432} durationInFrames={10}>
        <Audio src={staticFile('pop.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={448} durationInFrames={10}>
        <Audio src={staticFile('pop.wav')} volume={0.6} />
      </Sequence>

      {/* Frame 472, 484, 496: Feature Callout Pops */}
      <Sequence from={472} durationInFrames={10}>
        <Audio src={staticFile('pop.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={484} durationInFrames={10}>
        <Audio src={staticFile('pop.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={496} durationInFrames={10}>
        <Audio src={staticFile('pop.wav')} volume={0.55} />
      </Sequence>

      {/* Frame 525: Climax Bell Chime & Sparkle */}
      <Sequence from={525} durationInFrames={35}>
        <Audio src={staticFile('ding.wav')} volume={0.9} />
        <Audio src={staticFile('sparkle.wav')} volume={0.8} />
      </Sequence>
    </>
  );
};
