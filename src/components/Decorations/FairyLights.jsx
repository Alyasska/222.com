import { useMemo } from "react";

const BULB_COLORS = [
  "#fff2dc", "#fff2dc", "#ffe5c0", "#fff2dc",
  "#ffc8b8", "#fff2dc", "#fff2dc", "#d4ecff",
];
const N_BULBS = 28;
const SEGMENTS = 4;

export default function FairyLights() {
  const bulbs = useMemo(
    () =>
      Array.from({ length: N_BULBS }, (_, i) => {
        const t = i / (N_BULBS - 1);
        const seg = t * SEGMENTS;
        const local = seg - Math.floor(seg);
        const sag = Math.sin(local * Math.PI) * 2.6;
        return {
          left: 2 + t * 96,
          top: 1.6 + sag,
          color: BULB_COLORS[i % BULB_COLORS.length],
          delay: (i * 0.23) % 6,
        };
      }),
    []
  );

  const wirePath = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 80;
      const seg = t * SEGMENTS;
      const local = seg - Math.floor(seg);
      const sag = Math.sin(local * Math.PI) * 21;
      points.push(`${(2 + t * 96).toFixed(2)},${(13 + sag).toFixed(2)}`);
    }
    return "M " + points.join(" L ");
  }, []);

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
