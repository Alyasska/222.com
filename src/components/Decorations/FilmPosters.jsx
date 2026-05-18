const POSTERS = [
  { title: "AMÉLIE",    year: "2001", img: "posters/amelie-print.png",
    style: { left: "2vw", top: "13vh", width: "10vh", height: "14vh", transform: "rotate(-6deg)" } },
  { title: "BLACK MIRROR", year: "2011", img: "posters/black-mirror-print.png",
    style: { left: "2vw", top: "20vh", width: "10vh", height: "14vh", transform: "rotate(3deg)" } },
  { title: "THE PERKS OF BEING A WALLFLOWER", year: "2012", img: "posters/wallflower-print.png",
    style: { right: "2vw", top: "27vh", width: "10vh", height: "14vh", transform: "rotate(5deg)" } },
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
          }}
        >
          <div className="p-inner">
            <img className="poster-img" src={p.img} alt={p.title} />
            <div className="p-title">{p.title}</div>
            <div className="p-sub">{p.year}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
