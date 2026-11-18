import React from 'react';
import { Audio, Sequence, staticFile } from 'remotion';
import { AudioConfig, VideoClip } from '../types/project';

interface Props {
  audioConfig: AudioConfig;
  defaultVideoAudio?: string;
  clips?: VideoClip[];
}

export const DynamicAudio: React.FC<Props> = ({
  audioConfig,
  defaultVideoAudio,
  clips,
}) => {
  if (!audioConfig) return null;

  const {
    useOriginalVideoAudio = true,
    customAudioPath,
    customAudioVolume = 1.0,
    backgroundMusicPath,
    bgmVolume = 0.15,
    sfxEvents = [],
  } = audioConfig;

  return (
    <>
      {/* 1. Original Video Audio (played if useOriginalVideoAudio is true and no custom audio override) */}
      {useOriginalVideoAudio && !customAudioPath && (
        clips && clips.length > 0 ? (
          clips.map((clip, idx) => (
            <Sequence
              key={idx}
              from={clip.startFrame}
              durationInFrames={clip.durationInFrames}
            >
              <Audio src={staticFile(clip.source)} volume={1.0} />
            </Sequence>
          ))
        ) : defaultVideoAudio ? (
          <Audio src={staticFile(defaultVideoAudio)} volume={1.0} />
        ) : null
      )}

      {/* 2. Custom Audio / Voiceover MP3 (played if specified) */}
      {customAudioPath && (
        <Audio src={staticFile(customAudioPath)} volume={customAudioVolume} />
      )}

      {/* 3. Background Music (loops automatically across the whole video) */}
      {backgroundMusicPath && (
        <Audio
          src={staticFile(backgroundMusicPath)}
          volume={bgmVolume}
          loop
        />
      )}

      {/* 4. Dynamic SFX Events */}
      {sfxEvents?.map((sfx, idx) => {
        const soundFile =
          sfx.type.endsWith('.wav') || sfx.type.endsWith('.mp3')
            ? sfx.type
            : `${sfx.type}.wav`;
        return (
          <Sequence
            key={idx}
            from={sfx.frame}
            durationInFrames={35}
          >
            <Audio src={staticFile(soundFile)} volume={sfx.volume ?? 0.7} />
          </Sequence>
        );
      })}
    </>
  );
};
