const SCATTER_BOOKS = [
  { title: "Mukagali Öleñderi", author: "Maqataev", a: "#7a3a2a", b: "#3a1808",
    style: { left: "8vw",  bottom: "5vh",  width: "13vh", height: "18vh", transform: "rotate(-14deg)" } },
  { title: "Unbearable Lightness of Being", author: "Kundera", a: "#2a3a58", b: "#0e1828",
    style: { left: "15vw", bottom: "21vh", width: "11vh", height: "15vh", transform: "rotate(22deg)" } },
  { title: "Mahabbat — Nurshayiqov", author: "Azilkhan", a: "#f4e0c8", b: "#d8c0a0", open: true,
    style: { right: "21vw", bottom: "22vh", width: "16vh", height: "12vh", transform: "rotate(-9deg)" } },
  { title: "To the Lighthouse", author: "Woolf", a: "#5a2838", b: "#200810",
    style: { left: "21vw", bottom: "3vh",  width: "12vh", height: "16vh", transform: "rotate(6deg)" } },
  { title: "for you, always", author: "—", a: "#d4b8c8", b: "#a87890", open: true,
    style: { right: "22vw", bottom: "4vh",  width: "14vh", height: "10vh", transform: "rotate(15deg)" } },
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
