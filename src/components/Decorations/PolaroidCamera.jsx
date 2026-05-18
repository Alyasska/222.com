export default function PolaroidCamera() {
  return (
    <div className="polaroid-cam">
      <svg viewBox="0 0 88 72" aria-hidden="true">
        <defs>
          <clipPath id="cam-body">
            <rect x="2" y="2" rx="7" width="84" height="68" />
          </clipPath>
          <radialGradient id="cam-lens" cx="38%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#3a4060" />
            <stop offset="100%" stopColor="#060610" />
          </radialGradient>
        </defs>

        {/* Body shadow */}
        <rect x="2" y="2" rx="7" width="84" height="68" fill="rgba(0,0,0,0.22)" transform="translate(2,2)" />

        {/* Body */}
        <rect x="2" y="2" rx="7" width="84" height="68" fill="#f4f0ea" />
        <rect x="2" y="2" rx="7" width="84" height="68" fill="none" stroke="#d4ccc0" strokeWidth="0.5" />

        {/* Rainbow stripe — clipped to body */}
        <g clipPath="url(#cam-body)">
          <rect x="2"  y="48" width="14" height="22" fill="#e03030" />
          <rect x="16" y="48" width="14" height="22" fill="#f49030" />
          <rect x="30" y="48" width="14" height="22" fill="#f0d830" />
          <rect x="44" y="48" width="14" height="22" fill="#40b840" />
          <rect x="58" y="48" width="14" height="22" fill="#2878e0" />
          <rect x="72" y="48" width="14" height="22" fill="#9040b0" />
          {/* Stripe separator line */}
          <line x1="2" y1="48" x2="86" y2="48" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
        </g>

        {/* Viewfinder — top left */}
        <rect x="6" y="8" rx="2" width="18" height="12" fill="#1c1c24" />
        <rect x="7" y="9" rx="1.5" width="16" height="10" fill="#1a1a2c" />
        <rect x="8" y="10" rx="1" width="14" height="8" fill="#080810" opacity="0.8" />

        {/* Flash — top right */}
        <rect x="63" y="8" rx="3" width="17" height="14" fill="#e8e0cc" />
        <rect x="63" y="8" rx="3" width="17" height="14" fill="none" stroke="#c8c0a8" strokeWidth="0.5" />
        <rect x="66" y="11" rx="2" width="11" height="8" fill="rgba(255,255,255,0.55)" />

        {/* Lens outer ring */}
        <circle cx="40" cy="27" r="16" fill="#1c1c24" />
        <circle cx="40" cy="27" r="14" fill="#2a2a3c" />
        {/* Lens inner elements */}
        <circle cx="40" cy="27" r="10" fill="#0a0a14" />
        <circle cx="40" cy="27" r="7" fill="url(#cam-lens)" />
        {/* Lens highlight */}
        <ellipse cx="34" cy="21" rx="3.5" ry="2.2" fill="rgba(255,255,255,0.45)" transform="rotate(-25 34 21)" />
        <ellipse cx="38" cy="26" rx="1.5" ry="1" fill="rgba(255,255,255,0.2)" />

        {/* Shutter button */}
        <circle cx="72" cy="30" r="4" fill="#d4ccc0" />
        <circle cx="72" cy="30" r="2.5" fill="#b8b0a4" />

        {/* Film slot */}
        <rect x="18" y="68" rx="1" width="52" height="2.5" fill="rgba(0,0,0,0.18)" />

        {/* "Polaroid" logo area */}
        <rect x="30" y="39" rx="1" width="20" height="4" fill="rgba(0,0,0,0.06)" />
      </svg>
    </div>
  );
}
