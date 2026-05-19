export default function TableDecor() {
  return (
    <>
      {/* Vase of flowers — front-center desk gap, left of turntable */}
      <img
        src="/222.com/table/tulips.png"
        alt=""
        className="table-decor"
        style={{ left: "4vw", bottom: "10vh", width: "32vh", transform: "rotate(-8deg)" }}
      />

      <div className="table-macbook" aria-hidden="true">
        <svg viewBox="0 0 220 160" role="img" aria-label="Laptop">
          <defs>
            <linearGradient id="mac-body" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#e6e6e6" />
              <stop offset="100%" stopColor="#cfcfcf" />
            </linearGradient>
            <linearGradient id="mac-screen" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f9fbff" />
              <stop offset="100%" stopColor="#e7eef8" />
            </linearGradient>
          </defs>
          <rect x="8" y="8" width="204" height="144" rx="12" fill="url(#mac-body)" />
          <rect x="18" y="14" width="184" height="70" rx="8" fill="url(#mac-screen)" />
          <rect x="18" y="90" width="184" height="54" rx="8" fill="#c6c6c6" />
          <rect x="86" y="100" width="48" height="34" rx="4" fill="#b6b6b6" />

          {/* Spreadsheet grid */}
          <g stroke="#c9d6e8" strokeWidth="1" opacity="0.9">
            <line x1="28" y1="28" x2="192" y2="28" />
            <line x1="28" y1="40" x2="192" y2="40" />
            <line x1="28" y1="52" x2="192" y2="52" />
            <line x1="28" y1="64" x2="192" y2="64" />
            <line x1="28" y1="76" x2="192" y2="76" />
            <line x1="52" y1="18" x2="52" y2="84" />
            <line x1="76" y1="18" x2="76" y2="84" />
            <line x1="100" y1="18" x2="100" y2="84" />
            <line x1="124" y1="18" x2="124" y2="84" />
            <line x1="148" y1="18" x2="148" y2="84" />
            <line x1="172" y1="18" x2="172" y2="84" />
          </g>
          <rect x="28" y="18" width="164" height="10" fill="#f3d9e5" opacity="0.9" />

          {/* Keyboard hint lines */}
          <g stroke="#9c9c9c" strokeWidth="1" opacity="0.45">
            <line x1="26" y1="100" x2="196" y2="100" />
            <line x1="26" y1="110" x2="196" y2="110" />
            <line x1="26" y1="120" x2="196" y2="120" />
            <line x1="26" y1="130" x2="196" y2="130" />
          </g>
        </svg>
      </div>
    </>
  );
}
