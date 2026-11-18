import React from 'react';
import { useCurrentFrame } from 'remotion';
import { SubtitleSegment } from '../types/project';

interface Props {
  subtitles: SubtitleSegment[];
  bottomOffset?: number;
}

export const DynamicSubtitles: React.FC<Props> = ({
  subtitles,
  bottomOffset = 440, // Optimized for TikTok / Shopee Video Safe Zone (di atas Keranjang Kuning & Caption)
}) => {
  const frame = useCurrentFrame();

  if (!subtitles || subtitles.length === 0) return null;

  const currentSegment = subtitles.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  );

  if (!currentSegment) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: `${bottomOffset}px`,
        left: '50px',
        right: '50px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px 14px',
        zIndex: 28,
        fontFamily:
          "'Montserrat', 'Plus Jakarta Sans', -apple-system, sans-serif",
      }}
    >
      {currentSegment.words.map((w, idx) => {
        const isCurrent = frame >= w.start && frame < w.end;

        if (isCurrent) {
          return (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFD700',
                padding: '8px 18px',
                borderRadius: '8px',
                boxShadow: '0 8px 24px rgba(255, 215, 0, 0.6)',
                border: '3px solid #111111',
                transform: 'scale(1.12)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontSize: '44px',
                  fontWeight: 900,
                  color: '#111111',
                  letterSpacing: '1.5px',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                {w.text}
              </span>
            </div>
          );
        }

        return (
          <span
            key={idx}
            style={{
              fontSize: '40px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              textShadow:
                '0 4px 14px rgba(0,0,0,0.95), 0 2px 4px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.8)',
              padding: '4px 6px',
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
