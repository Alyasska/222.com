import { useState } from "react";
import { motion } from "framer-motion";

export default function Mug() {
  const [sips, setSips]     = useState(0);
  const [sipping, setSip]   = useState(false);

  const maxSips = 7;

  function handleSip() {
    if (sipping || sips >= maxSips) return;
    setSip(true);
    setSips(s => s + 1);
    setTimeout(() => setSip(false), 950);
  }

  // Tea level: full circle (r=30) → progressively smaller as sips increase
  const liquidR = Math.max(8, 30 - sips * 3.1);
  // Tea gets slightly lighter/more transparent as cup empties
  const liquidOpacity = Math.max(0.45, 1 - sips * 0.07);

  return (
    <motion.div
      className="mug-outer"
      onClick={handleSip}
      title={sips < maxSips ? "Take a sip ☕" : "Cup is empty ☕"}
      animate={
        sipping
          ? { rotate: -22, y: -10, x: 8 }
          : { rotate: 0,   y: 0,   x: 0  }
      }
      whileHover={!sipping ? { scale: 1.07, y: -3 } : {}}
      whileTap={!sipping ? { scale: 0.95 } : {}}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      style={{ cursor: sips < maxSips ? "pointer" : "default" }}
    >
      <div className={`mug${sipping ? " mug-sipping" : ""}`}>
        {/* Main mug body */}
        <svg viewBox="0 0 100 100" aria-hidden="true">
          {/* Handle shadow */}
          <path
            d="M 78 38 C 96 38, 96 62, 78 62"
            fill="none"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="7"
            strokeLinecap="round"
            opacity="0.5"
            transform="translate(0.8, 0.8)"
          />
          {/* Handle */}
          <path
            d="M 78 38 C 96 38, 96 62, 78 62"
            fill="none"
            stroke="#f4ece0"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Mug body */}
          <circle cx="46" cy="50" r="36" fill="#f4ece0" />
          <circle cx="46" cy="50" r="36" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.5" />

          {/* Tea liquid — shrinks as you sip */}
          <circle
            cx="46"
            cy="50"
            r={liquidR}
            fill="#cfa078"
            opacity={liquidOpacity}
            style={{ transition: "r 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.6s ease" }}
          />

          {/* Highlight on liquid surface */}
          {liquidR > 12 && (
            <ellipse
              cx={46 - (30 - liquidR) * 0.3}
              cy={44 - (30 - liquidR) * 0.3}
              rx={Math.max(3, 11 - sips * 1.1)}
              ry={Math.max(2, 8  - sips * 0.8)}
              fill="rgba(248,232,210,0.55)"
              transform={`rotate(-20 ${46 - (30 - liquidR) * 0.3} ${44 - (30 - liquidR) * 0.3})`}
              style={{ transition: "all 0.6s ease" }}
            />
          )}

          {/* Rim highlight arc */}
          <path
            d="M 24 36 A 36 36 0 0 1 60 18"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Empty indicator at bottom of cup */}
          {sips >= maxSips && (
            <text
              x="46" y="54"
              textAnchor="middle"
              fontSize="10"
              fill="rgba(80,40,20,0.35)"
              fontFamily="serif"
              style={{ userSelect: "none" }}
            >
              ∅
            </text>
          )}
        </svg>

        {/* Steam — more intense while sipping, fades as cup empties */}
        {sips < maxSips && (
          <svg
            className="mug-steam"
            viewBox="0 0 60 60"
            style={{ opacity: Math.max(0.15, 0.55 - sips * 0.06) }}
            aria-hidden="true"
          >
            <path d="M 20 55 Q 16 45, 22 36 T 18 18" />
            <path d="M 30 55 Q 34 45, 28 36 T 32 18" />
            <path d="M 40 55 Q 36 45, 42 36 T 38 18" />
          </svg>
        )}
      </div>
    </motion.div>
  );
}
