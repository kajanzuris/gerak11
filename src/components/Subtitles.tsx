import React from 'react';
import { useCurrentFrame } from 'remotion';

interface SubtitleSegment {
  startFrame: number;
  endFrame: number;
  words: {
    text: string;
    start: number;
    end: number;
  }[];
}

const SUBTITLES: SubtitleSegment[] = [
  {
    startFrame: 0,
    endFrame: 53,
    words: [
      { text: 'MOTONG', start: 0, end: 12 },
      { text: 'APEL', start: 12, end: 24 },
      { text: 'PAKAI', start: 24, end: 36 },
      { text: 'PISAU?', start: 36, end: 53 },
    ],
  },
  {
    startFrame: 54,
    endFrame: 84,
    words: [
      { text: 'BISA', start: 54, end: 68 },
      { text: 'SIH.', start: 68, end: 84 },
    ],
  },
  {
    startFrame: 85,
    endFrame: 132,
    words: [
      { text: 'TAPI', start: 85, end: 94 },
      { text: 'KALAU', start: 94, end: 103 },
      { text: 'HASILNYA', start: 103, end: 112 },
      { text: 'MIRING', start: 112, end: 121 },
      { text: 'SEBELAH,', start: 121, end: 132 },
    ],
  },
  {
    startFrame: 132,
    endFrame: 165,
    words: [
      { text: 'JARI', start: 132, end: 146 },
      { text: 'DEG-DEGAN,', start: 146, end: 165 },
    ],
  },
  {
    startFrame: 165,
    endFrame: 216,
    words: [
      { text: 'DAN', start: 165, end: 172 },
      { text: 'APEL', start: 172, end: 181 },
      { text: 'MALAH', start: 181, end: 190 },
      { text: 'LONCAT', start: 190, end: 199 },
      { text: 'KE', start: 199, end: 206 },
      { text: 'LANTAI,', start: 206, end: 216 },
    ],
  },
  {
    startFrame: 216,
    endFrame: 248,
    words: [
      { text: 'YA', start: 216, end: 224 },
      { text: 'SIAP-SIAP', start: 224, end: 236 },
      { text: 'STRES.', start: 236, end: 248 },
    ],
  },
  {
    startFrame: 248,
    endFrame: 303,
    words: [
      { text: 'PAKAI', start: 248, end: 260 },
      { text: 'ALAT', start: 260, end: 272 },
      { text: 'POTONG', start: 272, end: 286 },
      { text: 'APEL!', start: 286, end: 303 },
    ],
  },
  {
    startFrame: 303,
    endFrame: 345,
    words: [
      { text: 'CUKUP', start: 303, end: 316 },
      { text: 'TEKAN', start: 316, end: 330 },
      { text: 'SEKALI,', start: 330, end: 345 },
    ],
  },
  {
    startFrame: 345,
    endFrame: 414,
    words: [
      { text: 'APEL', start: 345, end: 356 },
      { text: 'LANGSUNG', start: 356, end: 368 },
      { text: 'TERPOTONG', start: 368, end: 382 },
      { text: 'RAPI', start: 382, end: 394 },
      { text: 'TANPA', start: 394, end: 404 },
      { text: 'RIBET.', start: 404, end: 414 },
    ],
  },
  {
    startFrame: 414,
    endFrame: 468,
    words: [
      { text: 'LEBIH', start: 414, end: 426 },
      { text: 'CEPAT,', start: 426, end: 438 },
      { text: 'HIGIENIS,', start: 438, end: 452 },
      { text: 'DAN', start: 452, end: 459 },
      { text: 'AMAN.', start: 459, end: 468 },
    ],
  },
  {
    startFrame: 468,
    endFrame: 496,
    words: [
      { text: 'GAK', start: 468, end: 472 },
      { text: 'ADA', start: 472, end: 476 },
      { text: 'LAGI', start: 476, end: 480 },
      { text: 'DRAMA', start: 480, end: 485 },
      { text: 'JARI', start: 485, end: 490 },
      { text: 'PISAU', start: 490, end: 496 },
    ],
  },
  {
    startFrame: 496,
    endFrame: 525,
    words: [
      { text: 'ATAU', start: 496, end: 502 },
      { text: 'APEL', start: 502, end: 510 },
      { text: 'JADI', start: 510, end: 516 },
      { text: 'ABSTRAK.', start: 516, end: 525 },
    ],
  },
  {
    startFrame: 525,
    endFrame: 567,
    words: [
      { text: 'TINGGAL', start: 525, end: 533 },
      { text: 'TEKAN,', start: 533, end: 541 },
      { text: 'HAP,', start: 541, end: 549 },
      { text: 'LANGSUNG', start: 549, end: 557 },
      { text: 'NIKMAT!', start: 557, end: 567 },
    ],
  },
];

export const Subtitles: React.FC = () => {
  const frame = useCurrentFrame();

  const currentSegment = SUBTITLES.find(
    (s) => frame >= s.startFrame && frame < s.endFrame
  );

  if (!currentSegment) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '440px', // TikTok & Shopee Video Safe Zone (above shopping bag button & caption)
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
