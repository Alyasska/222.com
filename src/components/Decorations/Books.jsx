const SCATTER_BOOKS = [
  { title: "Mukagali Öleñderi", coverImage: "/222.com/covers/mukagali.png",
    a: "#7a3a2a", b: "#3a1808",
    style: { left: "6vw", bottom: "8vh", width: "12vh", height: "17vh", transform: "rotate(-12deg)" } },
  { title: "The Unbearable Lightness of Being", coverImage: "/222.com/covers/lightness.png",
    a: "#2a3a58", b: "#0e1828",
    style: { left: "17vw", bottom: "18vh", width: "12vh", height: "17vh", transform: "rotate(20deg)" } },
  { title: "To the Lighthouse", coverImage: "/222.com/covers/lighthouse.png",
    a: "#5a2838", b: "#200810",
    style: { right: "19vw", bottom: "6vh", width: "12vh", height: "17vh", transform: "rotate(8deg)" } },
];

export default function Books() {
  return (
    <>
      {SCATTER_BOOKS.map((b, i) => (
        <div
          key={i}
          className="scatter-book"
          style={{ ...b.style, "--book-a": b.a, "--book-b": b.b }}
        >
          {b.coverImage && (
            <img
              src={b.coverImage}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "0.5vh",
              }}
            />
          )}
          <div className="title">{b.title}</div>
        </div>
      ))}
    </>
  );
}
