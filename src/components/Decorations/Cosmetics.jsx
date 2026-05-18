export default function Cosmetics() {
  return (
    <>
      {/* Polaroid lying flat on desk */}
      <div className="polaroid" style={{ bottom: "24vh", left: "44vw", transform: "rotate(7deg)" }}>
        <div className="polaroid-photo" />
        <div className="polaroid-caption">♡</div>
      </div>

      {/* Pink perfume bottle — top-down view */}
      <div className="perfume" style={{ right: "10vw", bottom: "22vh", transform: "rotate(-10deg)" }}>
        <svg viewBox="0 0 56 80" aria-hidden="true">
          <defs>
            <linearGradient id="pfg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fcd0e0" />
              <stop offset="45%" stopColor="#f0a0c0" />
              <stop offset="100%" stopColor="#c86090" />
            </linearGradient>
            <linearGradient id="pfh" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          {/* Shadow */}
          <rect x="10" y="14" rx="10" width="36" height="56" fill="rgba(0,0,0,0.18)" transform="translate(2,2)" />
          {/* Bottle body */}
          <rect x="10" y="14" rx="10" width="36" height="56" fill="url(#pfg)" />
          {/* Glass highlight */}
          <rect x="10" y="14" rx="10" width="36" height="56" fill="url(#pfh)" />
          {/* Label band */}
          <rect x="15" y="30" rx="3" width="26" height="28" fill="rgba(255,255,255,0.22)" />
          {/* Label text lines */}
          <rect x="19" y="38" rx="1" width="18" height="1.5" fill="rgba(255,255,255,0.7)" />
          <rect x="21" y="42" rx="1" width="14" height="1" fill="rgba(255,255,255,0.5)" />
          {/* Cap — brass/gold */}
          <rect x="18" y="4" rx="6" width="20" height="14" fill="#c8924a" />
          <rect x="18" y="4" rx="6" width="20" height="14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
          {/* Cap highlight */}
          <ellipse cx="24" cy="8" rx="5" ry="3" fill="rgba(255,255,255,0.3)" />
        </svg>
      </div>

      {/* Lipstick tube — top-down view */}
      <div className="lipstick" style={{ right: "6vw", bottom: "22vh", transform: "rotate(20deg)" }}>
        <svg viewBox="0 0 28 64" aria-hidden="true">
          <defs>
            <linearGradient id="ltg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="35%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
            </linearGradient>
          </defs>
          {/* Shadow */}
          <rect x="7" y="14" rx="5" width="14" height="42" fill="rgba(0,0,0,0.18)" transform="translate(1.5,1.5)" />
          {/* Lower tube (silver) */}
          <rect x="7" y="30" rx="4" width="14" height="26" fill="#b8a090" />
          <rect x="7" y="30" rx="4" width="14" height="26" fill="url(#ltg)" />
          {/* Upper collar */}
          <rect x="7" y="22" rx="2" width="14" height="10" fill="#8a6858" />
          <rect x="7" y="22" rx="2" width="14" height="10" fill="url(#ltg)" />
          {/* Bullet — deep rose */}
          <rect x="8" y="8" rx="4" width="12" height="16" fill="#c83060" />
          <rect x="8" y="8" rx="4" width="12" height="16" fill="url(#ltg)" />
          {/* Bullet tip (angled cut) */}
          <polygon points="8,8 20,8 20,13 14,8" fill="#e04878" />
          {/* Highlight on bullet */}
          <ellipse cx="11" cy="11" rx="2.5" ry="4" fill="rgba(255,255,255,0.35)" transform="rotate(-10 11 11)" />
        </svg>
      </div>
    </>
  );
}
