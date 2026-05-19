const POSTERS = [
  { title: "AMÉLIE", year: "2001", img: "posters/amelie-print.png",
    pA: "#9e1a1a", pB: "#4a0808", accent: "#f4c030", accentX: "50%", accentY: "58%",
    style: { left: "3vw", top: "30vh", width: "9vh", height: "13vh", transform: "rotate(-8deg)" } },
  { title: "BLACK MIRROR", year: "2011", img: "posters/black-mirror-print.png",
    pA: "#0d0d14", pB: "#050508", accent: "#38e8ff", accentX: "50%", accentY: "48%",
    style: { right: "3vw", top: "32vh", width: "9vh", height: "13vh", transform: "rotate(5deg)" } },
  { title: "THE PERKS OF BEING A WALLFLOWER", year: "2012", img: "posters/wallflower-print.png",
    pA: "#0e1928", pB: "#06101a", accent: "#ffd060", accentX: "50%", accentY: "32%",
    style: { left: "4vw", top: "38vh", width: "9vh", height: "13vh", transform: "rotate(3deg)" } },
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
          <img
            className="poster-img"
            src={p.img}
            alt=""
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="p-inner">
            <div className="p-title">{p.title}</div>
            <div className="p-sub">{p.year}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
