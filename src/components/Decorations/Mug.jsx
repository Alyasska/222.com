export default function Mug() {
  return (
    <div className="mug">
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path
          d="M 78 38 C 96 38, 96 62, 78 62"
          fill="none"
          stroke="#f4ece0"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M 78 38 C 96 38, 96 62, 78 62"
          fill="none"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.5"
          transform="translate(0.8, 0.8)"
        />
        <circle cx="46" cy="50" r="36" fill="#f4ece0" />
        <circle cx="46" cy="50" r="36" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />
        <circle cx="46" cy="50" r="30" fill="#cfa078" />
        <ellipse cx="40" cy="44" rx="11" ry="8" fill="rgba(248,232,210,0.65)" transform="rotate(-20 40 44)" />
        <ellipse cx="52" cy="56" rx="6"  ry="4" fill="rgba(248,232,210,0.35)" transform="rotate(30 52 56)" />
        <path
          d="M 24 36 A 36 36 0 0 1 60 18"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
      <svg className="mug-steam" viewBox="0 0 60 60" aria-hidden="true">
        <path d="M 20 55 Q 16 45, 22 36 T 18 18" />
        <path d="M 30 55 Q 34 45, 28 36 T 32 18" />
        <path d="M 40 55 Q 36 45, 42 36 T 38 18" />
      </svg>
    </div>
  );
}
