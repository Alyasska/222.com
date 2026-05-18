const POSTERS = [
  { title: "AMÉLIE",    year: "2001",
    pA: "#b03838", pB: "#5a1818", accent: "#f4d4a0", accentX: "30%", accentY: "32%",
    style: { left: "4vw",  top: "16vh", width: "10vh", height: "14vh", transform: "rotate(-7deg)" } },
  { title: "HER",       year: "2013",
    pA: "#c8602e", pB: "#5a2410", accent: "#ffd0b8", accentX: "55%", accentY: "30%",
    style: { left: "19vw", top: "13vh", width: "9.5vh", height: "13vh", transform: "rotate(5deg)" } },
  { title: "ROMA",      year: "2018",
    pA: "#324840", pB: "#0e1a16", accent: "#a8c8c0", accentX: "50%", accentY: "35%",
    style: { right: "19vw", top: "14vh", width: "9.5vh", height: "13vh", transform: "rotate(-4deg)" } },
  { title: "LA LA LAND", year: "2016",
    pA: "#3a2868", pB: "#0e0830", accent: "#f4c89e", accentX: "40%", accentY: "30%",
    style: { right: "4vw",  top: "17vh", width: "10vh", height: "14vh", transform: "rotate(6deg)" } },
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
