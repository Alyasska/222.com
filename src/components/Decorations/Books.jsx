const SCATTER_BOOKS = [
  { title: "Mukagali Öleñderi", a: "#7a3a2a", b: "#3a1808",
    style: { left: "6vw", bottom: "8vh", width: "12vh", height: "17vh", transform: "rotate(-12deg)" } },
  { title: "The Unbearable Lightness of Being", a: "#2a3a58", b: "#0e1828",
    style: { left: "17vw", bottom: "18vh", width: "12vh", height: "17vh", transform: "rotate(20deg)" } },
  { title: "To the Lighthouse", a: "#5a2838", b: "#200810",
    style: { right: "19vw", bottom: "6vh", width: "12vh", height: "17vh", transform: "rotate(8deg)" } },
];

export default function Books() {
  return (
    <>
      {SCATTER_BOOKS.map((b, i) => (
        <div
          key={i}
          className={`scatter-book ${b.open ? "open" : ""}`}
          style={{ ...b.style, "--book-a": b.a, "--book-b": b.b }}
        >
          <div className="title">{b.title}</div>
        </div>
      ))}
    </>
  );
}
