import React from 'react';
import { useCurrentFrame, spring } from 'remotion';

export const KineticPanels: React.FC = () => {
  const frame = useCurrentFrame();

  const getSpring = (startFrame: number, damping = 12, stiffness = 130) => {
    return spring({
      frame: Math.max(0, frame - startFrame),
      fps: 30,
      config: { damping, mass: 0.5, stiffness },
    });
  };

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
      {/* 1. Motong apel pakai pisau? (Frames 0 - 80) */}
      {frame >= 0 && frame < 80 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${getSpring(0)})`,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '20px 52px 28px 52px',
            borderRadius: '20px',
            border: '2.5px solid rgba(255, 36, 66, 0.6)',
            boxShadow: '0 16px 45px rgba(0,0,0,0.9), 0 0 30px rgba(255, 36, 66, 0.4)',
            minWidth: '680px',
          }}
        >
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
            POTONG APEL
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FF2442',
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
                color: '#FFFFFF',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              PAKAI PISAU?
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

      {/* 2. Hasilnya miring sebelah (Frames 80 - 132) */}
      {frame >= 80 && frame < 132 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${getSpring(80)}) rotate(-3.5deg)`,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '20px 52px 30px 52px',
            borderRadius: '20px',
            border: '2.5px solid rgba(255, 184, 0, 0.6)',
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            minWidth: '680px',
          }}
        >
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
            TAPI KALAU...
          </div>
          <div
            style={{
              backgroundColor: '#FFB800',
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
                color: '#111111',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              MIRING SEBELAH?!
            </span>
          </div>
        </div>
      )}

      {/* 3. Jari deg-degan (Frames 132 - 165) */}
      {frame >= 132 && frame < 165 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '22px 52px 32px 52px',
            borderRadius: '24px',
            border: '2.5px solid rgba(213, 0, 0, 0.7)',
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            minWidth: '680px',
            transform: `scale(${
              getSpring(132) * (1 + 0.08 * Math.sin((frame - 132) * 0.9))
            })`,
          }}
        >
          <div
            style={{
              fontSize: '40px',
              fontWeight: 900,
              color: '#FF5252',
              letterSpacing: '2px',
              marginBottom: '8px',
            }}
          >
            BAHAYA BUAT JARI!
          </div>
          <div
            style={{
              backgroundColor: '#D50000',
              padding: '14px 42px',
              borderRadius: '50px',
              boxShadow: '0 10px 35px rgba(213, 0, 0, 0.6)',
              border: '3px solid #FFF',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <span style={{ fontSize: '42px' }}>⚠️</span>
            <span
              style={{
                fontSize: '48px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              JARI DEG-DEGAN!
            </span>
          </div>
        </div>
      )}

      {/* 4. Apel loncat ke lantai (Frames 165 - 216) */}
      {frame >= 165 && frame < 216 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '22px 52px 32px 52px',
            borderRadius: '20px',
            border: '2.5px solid rgba(255, 109, 0, 0.7)',
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            minWidth: '680px',
            transform: `scale(${getSpring(165)})`,
          }}
        >
          <div
            style={{
              fontSize: '44px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '2px',
              marginBottom: '10px',
            }}
          >
            DAN APEL MALAH...
          </div>
          <div
            style={{
              backgroundColor: '#FF6D00',
              padding: '14px 40px',
              borderRadius: '10px',
              boxShadow: '0 12px 35px rgba(255, 109, 0, 0.5)',
              border: '3px solid #FFF',
              transform: `translateY(${Math.sin((frame - 165) * 0.4) * 5}px)`,
            }}
          >
            <span
              style={{
                fontSize: '48px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              LONCAT KE LANTAI! 💥
            </span>
          </div>
        </div>
      )}

      {/* 5. Siap-siap stres (Frames 216 - 248) */}
      {frame >= 216 && frame < 248 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '24px 52px',
            borderRadius: '20px',
            border: '3px solid #FF1744',
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            minWidth: '680px',
            justifyContent: 'center',
            transform: `scale(${getSpring(216)}) translate(${
              (frame % 2 === 0 ? 1 : -1) * 3
            }px, ${(frame % 3 === 0 ? 1 : -1) * 2}px)`,
          }}
        >
          <span
            style={{
              fontSize: '52px',
              fontWeight: 900,
              color: '#FF5252',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            YA SIAP-SIAP STRES! 😵
          </span>
        </div>
      )}

      {/* 6. Pakai alat potong apel! (Frames 248 - 303, like ref_003.jpg & ref_004.jpg) */}
      {frame >= 248 && frame < 303 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${getSpring(248)})`,
            backgroundColor: 'rgba(10, 12, 16, 0.98)',
            padding: '24px 56px 56px 56px',
            borderRadius: '22px',
            border: '2.5px solid #FFD700',
            boxShadow: '0 18px 50px rgba(0,0,0,0.95), 0 0 35px rgba(255, 215, 0, 0.4)',
            minWidth: '700px',
          }}
        >
          {/* Top white panel */}
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
              CUKUP PAKAI
            </span>
          </div>

          {/* Bottom vivid yellow panel */}
          <div
            style={{
              backgroundColor: '#FFD700',
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
                color: '#111111',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              ALAT POTONG INI!
            </span>
          </div>

          {/* Floating badge stamp (like 4 MENIT in ref_004) */}
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
              transform: `scale(${getSpring(258)}) rotate(12deg)`,
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
              1X
            </span>
            <span
              style={{
                fontSize: '18px',
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '1px',
              }}
            >
              TEKAN
            </span>
          </div>
        </div>
      )}

      {/* 7. Cukup tekan sekali (Frames 303 - 345) */}
      {frame >= 303 && frame < 345 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${getSpring(303)})`,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '20px 52px 30px 52px',
            borderRadius: '20px',
            border: '2.5px solid rgba(0, 230, 118, 0.6)',
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            minWidth: '680px',
          }}
        >
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
              CUKUP TEKAN
            </span>
          </div>
          <div
            style={{
              backgroundColor: '#00E676',
              padding: '12px 40px',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0, 230, 118, 0.45)',
              border: '3px solid #111111',
            }}
          >
            <span
              style={{
                fontSize: '50px',
                fontWeight: 900,
                color: '#111111',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              1 KALI SAJA!
            </span>
          </div>
        </div>
      )}

      {/* 8. Apel langsung terpotong rapi (Frames 345 - 414) */}
      {frame >= 345 && frame < 414 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${getSpring(345)})`,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '20px 52px 30px 52px',
            borderRadius: '20px',
            border: '2.5px solid #FFD700',
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            minWidth: '680px',
          }}
        >
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
                fontSize: '40px',
                fontWeight: 900,
                color: '#111111',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              LANGSUNG TERPOTONG
            </span>
          </div>
          <div
            style={{
              backgroundColor: '#FFD700',
              padding: '12px 40px',
              borderRadius: '8px',
              boxShadow: '0 12px 30px rgba(255, 215, 0, 0.45)',
              border: '3px solid #111111',
            }}
          >
            <span
              style={{
                fontSize: '50px',
                fontWeight: 900,
                color: '#111111',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              RAPI TANPA RIBET! ✨
            </span>
          </div>
        </div>
      )}

      {/* 10. Gak ada lagi drama jari kena pisau (Frames 468 - 525) */}
      {frame >= 468 && frame < 525 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            transform: `scale(${getSpring(468)})`,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '20px 48px',
            borderRadius: '40px',
            boxShadow: '0 16px 45px rgba(0,0,0,0.9)',
            border: '3px solid #00E676',
            gap: '14px',
            minWidth: '680px',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '42px' }}>🛡️</span>
          <span
            style={{
              fontSize: '44px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            100% AMAN DARI PISAU
          </span>
        </div>
      )}

      {/* 11. Climax CTA: Tinggal tekan, hap, langsung nikmat! (Frames 525 - 567) */}
      {frame >= 525 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${getSpring(525)})`,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            padding: '24px 54px 34px 54px',
            borderRadius: '24px',
            border: '2.5px solid #FFD700',
            boxShadow: '0 18px 50px rgba(0,0,0,0.95), 0 0 35px rgba(255, 215, 0, 0.4)',
            minWidth: '700px',
          }}
        >
          {/* Top bookmark pill */}
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
              Simpan Buat Dapurmu!
            </span>
          </div>

          {/* Big punch title */}
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
            TINGGAL TEKAN,
          </div>

          <div
            style={{
              backgroundColor: '#FFD700',
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
                color: '#111111',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              LANGSUNG NIKMAT!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
