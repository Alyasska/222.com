const POSTERS = [
  { title: "AMÉLIE",    year: "2001",
    pA: "#9e1a1a", pB: "#4a0808", accent: "#f4c030", accentX: "50%", accentY: "58%",
    style: { left: "4vw",  top: "15vh", width: "10vh", height: "14vh", transform: "rotate(-6deg)" } },
  { title: "BLACK MIRROR", year: "2011",
    pA: "#0d0d14", pB: "#050508", accent: "#38e8ff", accentX: "50%", accentY: "48%",
    style: { left: "41vw", top: "11vh", width: "10vh", height: "14vh", transform: "rotate(3deg)" } },
  { title: "THE PERKS OF BEING A WALLFLOWER", year: "2012",
    pA: "#0e1928", pB: "#06101a", accent: "#ffd060", accentX: "50%", accentY: "32%",
    style: { right: "4vw", top: "16vh", width: "10vh", height: "14vh", transform: "rotate(5deg)" } },
];

export default function FilmPosters() {
  return (
    <div className="posters" aria-hidden="true">
      {POSTERS.map((p, i) => (
        <div
          key={i}
          className="poster"
          style={{
            ...p.style,
            "--p-a": p.pA,
            "--p-b": p.pB,
            "--accent": p.accent,
            "--accent-x": p.accentX,
            "--accent-y": p.accentY,
          }}
        >
          <div className="p-inner">
            <div className="p-title">{p.title}</div>
            <div className="p-sub">{p.year}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
