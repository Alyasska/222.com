/* Perfume bottle + lipstick sitting on the shelf (upper half of room).
   Positioned so their bottoms align with the shelf plank at top: 32vh. */
export default function Cosmetics() {
  return (
    <>
      {/* Pink perfume bottle — 11vh tall, bottom at shelf (top: 21vh + 11vh = 32vh) */}
      <div className="shelf-cosmetic" style={{ right: "10vw", top: "21vh", height: "11vh", transform: "rotate(3deg)" }}>
        <svg viewBox="0 0 44 72" aria-hidden="true">
          <defs>
            <linearGradient id="pfg2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fcd0e0" />
              <stop offset="50%" stopColor="#f090b8" />
              <stop offset="100%" stopColor="#c05888" />
            </linearGradient>
            <linearGradient id="pfh2" x1="0%" y1="0%" x2="80%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="55%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          {/* Neck */}
          <rect x="16" y="4" rx="3" width="12" height="14" fill="#e898c0" />
          <rect x="16" y="4" rx="3" width="12" height="14" fill="url(#pfh2)" />
          {/* Cap */}
          <rect x="13" y="1" rx="3" width="18" height="7" fill="#c8904a" />
          <rect x="13" y="1" rx="3" width="18" height="7" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
          {/* Body shadow */}
          <rect x="8" y="16" rx="8" width="30" height="52" fill="rgba(0,0,0,0.2)" transform="translate(2,2)" />
          {/* Body */}
          <rect x="8" y="16" rx="8" width="30" height="52" fill="url(#pfg2)" />
          <rect x="8" y="16" rx="8" width="30" height="52" fill="url(#pfh2)" />
          {/* Label */}
          <rect x="12" y="30" rx="3" width="22" height="24" fill="rgba(255,255,255,0.25)" />
          <rect x="15" y="37" rx="1" width="16" height="1.5" fill="rgba(255,255,255,0.75)" />
          <rect x="17" y="41" rx="1" width="12" height="1" fill="rgba(255,255,255,0.5)" />
          {/* Bottom edge */}
          <rect x="8" y="64" rx="0 0 8 8" width="30" height="4" fill="rgba(0,0,0,0.15)" />
        </svg>
      </div>

      {/* Lipstick — 9vh tall, bottom at shelf (top: 23vh + 9vh = 32vh) */}
      <div className="shelf-cosmetic" style={{ right: "7vw", top: "23vh", height: "9vh", transform: "rotate(-5deg)" }}>
        <svg viewBox="0 0 20 52" aria-hidden="true">
          <defs>
            <linearGradient id="ltg2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
              <stop offset="45%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
            </linearGradient>
          </defs>
          {/* Tube body shadow */}
          <rect x="3" y="20" rx="3" width="14" height="30" fill="rgba(0,0,0,0.2)" transform="translate(1.5,1.5)" />
          {/* Tube body */}
          <rect x="3" y="20" rx="3" width="14" height="30" fill="#a07868" />
          <rect x="3" y="20" rx="3" width="14" height="30" fill="url(#ltg2)" />
          {/* Band */}
          <rect x="3" y="32" width="14" height="3" fill="rgba(0,0,0,0.2)" />
          {/* Bullet body */}
          <rect x="4" y="8" rx="3" width="12" height="14" fill="#c02858" />
          <rect x="4" y="8" rx="3" width="12" height="14" fill="url(#ltg2)" />
          {/* Bullet tip */}
          <ellipse cx="10" cy="8" rx="5" ry="3" fill="#d83060" />
          {/* Highlight */}
          <ellipse cx="6" cy="10" rx="2" ry="3.5" fill="rgba(255,255,255,0.35)" transform="rotate(-10 6 10)" />
        </svg>
      </div>
    </>
  );
}
