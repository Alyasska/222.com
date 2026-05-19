import { useMemo } from "react";

const BULB_COLORS = [
  "#ff4d6d", // red
  "#fff1f3", // soft white
  "#ff4d6d",
  "#fff1f3",
];
const N_BULBS = 18;
const SEGMENTS = 1;

export default function FairyLights() {
  const bulbs = useMemo(
    () =>
      Array.from({ length: N_BULBS }, (_, i) => {
        const t = i / (N_BULBS - 1);
        return {
          left: 3 + t * 94,
          top: 1.4,
          color: BULB_COLORS[i % BULB_COLORS.length],
          delay: (i * 0.23) % 6,
        };
      }),
    []
  );

  const wirePath = useMemo(() => "M 2 10 L 98 10", []);

  return (
    <div className="fairy" aria-hidden="true">
      <svg className="fairy-wire" viewBox="0 0 100 80" preserveAspectRatio="none">
        <path d={wirePath} />
      </svg>
      {bulbs.map((b, i) => (
        <span
          key={i}
          className="fairy-light"
          style={{
            left: `${b.left}%`,
            top: `${b.top}vh`,
            "--bulb": b.color,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
