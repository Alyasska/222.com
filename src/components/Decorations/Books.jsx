const SCATTER_BOOKS = [
  { title: "Persuasion", author: "Austen",    a: "#7a4a3a", b: "#3a1f12",
    style: { left: "8vw",  bottom: "5vh",  width: "13vh", height: "18vh", transform: "rotate(-14deg)" } },
  { title: "Bluets",     author: "Nelson",    a: "#3a4a68", b: "#1a2238",
    style: { left: "15vw", bottom: "21vh", width: "11vh", height: "15vh", transform: "rotate(22deg)" } },
  { title: "On Love",    author: "de Botton", a: "#a87060", b: "#5a3020",
    style: { left: "21vw", bottom: "3vh",  width: "12vh", height: "16vh", transform: "rotate(6deg)" } },
  { title: "for you, always", author: "—",   a: "#f4e0c8", b: "#d8c0a0", open: true,
    style: { right: "21vw", bottom: "22vh", width: "16vh", height: "12vh", transform: "rotate(-9deg)" } },
  { title: "Salt",       author: "Crosley",   a: "#6a3848", b: "#2a1018",
    style: { right: "22vw", bottom: "4vh",  width: "10vh", height: "13vh", transform: "rotate(18deg)" } },
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
