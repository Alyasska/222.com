export default function FairyLights() {
  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.9; filter: drop-shadow(0 0 8px rgba(255,223,186,0.9)); }
          50%       { opacity: 0.35; filter: drop-shadow(0 0 3px rgba(255,223,186,0.3)); }
        }
        .bulb      { animation: twinkle 3s   infinite ease-in-out; }
        .bulb-alt  { animation: twinkle 2.5s infinite ease-in-out 1s; }
        .bulb-fast { animation: twinkle 2s   infinite ease-in-out 0.5s; }
      `}</style>
      <div className="absolute top-0 left-0 w-full h-32 pointer-events-none z-10 overflow-hidden opacity-90">
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1000 100">
          <path
            d="M-50,20 Q150,75 350,10 Q550,70 700,20 Q850,90 1050,30"
            fill="none" stroke="#4a5568" strokeWidth="1" strokeDasharray="4,2" opacity="0.35"
          />
          <g>
            <circle cx="50"  cy="38" r="3"   className="bulb"      fill="#ffebd2" />
            <circle cx="100" cy="50" r="3.5" className="bulb-alt"  fill="#fff" />
            <circle cx="150" cy="54" r="3"   className="bulb-fast" fill="#ffebd2" />
            <circle cx="200" cy="48" r="4"   className="bulb"      fill="#ffe0b2" />
            <circle cx="250" cy="38" r="3"   className="bulb-alt"  fill="#fff" />
            <circle cx="300" cy="22" r="3.5" className="bulb-fast" fill="#ffebd2" />
            <circle cx="400" cy="24" r="3"   className="bulb"      fill="#fff" />
            <circle cx="450" cy="36" r="3.5" className="bulb-alt"  fill="#ffe0b2" />
            <circle cx="500" cy="44" r="3"   className="bulb-fast" fill="#fff" />
            <circle cx="550" cy="44" r="4"   className="bulb"      fill="#ffebd2" />
            <circle cx="600" cy="36" r="3"   className="bulb-alt"  fill="#fff" />
            <circle cx="650" cy="26" r="3.5" className="bulb-fast" fill="#ffe0b2" />
            <circle cx="750" cy="38" r="3"   className="bulb"      fill="#fff" />
            <circle cx="800" cy="54" r="3.5" className="bulb-alt"  fill="#ffebd2" />
            <circle cx="850" cy="60" r="3"   className="bulb-fast" fill="#fff" />
            <circle cx="900" cy="60" r="4"   className="bulb"      fill="#ffe0b2" />
            <circle cx="950" cy="54" r="3"   className="bulb-alt"  fill="#fff" />
          </g>
        </svg>
      </div>
    </>
  );
}
