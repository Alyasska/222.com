export default function FairyLights() {
  return (
    <>
      <style>{`
        @keyframes ledPulse {
          0%, 100% { opacity: 0.95; filter: drop-shadow(0 0 10px rgba(125, 211, 252, 0.95)); }
          50% { opacity: 0.38; filter: drop-shadow(0 0 4px rgba(244, 114, 182, 0.5)); }
        }

        .led-bulb { animation: ledPulse 2.8s infinite ease-in-out; }
        .led-bulb-alt { animation: ledPulse 2.2s infinite ease-in-out 0.7s; }
        .led-bulb-fast { animation: ledPulse 1.8s infinite ease-in-out 0.35s; }
      `}</style>

      <div className="pointer-events-none absolute left-0 top-0 z-10 h-36 w-full overflow-hidden opacity-95">
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 110">
          <path
            d="M-60,18 Q180,86 390,14 Q570,82 760,18 Q900,95 1060,34"
            fill="none"
            stroke="#2f3640"
            strokeWidth="1.7"
            strokeDasharray="5,3"
            opacity="0.45"
          />

          <g>
            <circle cx="38" cy="42" r="3.2" className="led-bulb" fill="#bae6fd" />
            <circle cx="84" cy="52" r="3.8" className="led-bulb-alt" fill="#fbcfe8" />
            <circle cx="126" cy="58" r="3.2" className="led-bulb-fast" fill="#e0f2fe" />
            <circle cx="172" cy="50" r="4" className="led-bulb" fill="#f9a8d4" />
            <circle cx="218" cy="39" r="3.2" className="led-bulb-alt" fill="#bae6fd" />
            <circle cx="270" cy="28" r="3.8" className="led-bulb-fast" fill="#fbcfe8" />
            <circle cx="344" cy="22" r="3.4" className="led-bulb" fill="#dbeafe" />
            <circle cx="404" cy="31" r="3.7" className="led-bulb-alt" fill="#f9a8d4" />
            <circle cx="462" cy="42" r="3.4" className="led-bulb-fast" fill="#bae6fd" />
            <circle cx="520" cy="48" r="4" className="led-bulb" fill="#fbcfe8" />
            <circle cx="578" cy="45" r="3.3" className="led-bulb-alt" fill="#e0f2fe" />
            <circle cx="636" cy="36" r="3.8" className="led-bulb-fast" fill="#f9a8d4" />
            <circle cx="694" cy="29" r="3.3" className="led-bulb" fill="#bae6fd" />
            <circle cx="748" cy="38" r="3.8" className="led-bulb-alt" fill="#fbcfe8" />
            <circle cx="804" cy="53" r="3.2" className="led-bulb-fast" fill="#e0f2fe" />
            <circle cx="858" cy="61" r="4" className="led-bulb" fill="#f9a8d4" />
            <circle cx="912" cy="60" r="3.2" className="led-bulb-alt" fill="#bae6fd" />
            <circle cx="962" cy="53" r="3.8" className="led-bulb-fast" fill="#fbcfe8" />
          </g>
        </svg>
      </div>
    </>
  );
}
