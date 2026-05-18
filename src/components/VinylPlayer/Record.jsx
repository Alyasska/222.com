export default function Record({ song, spinning }) {
  const imgStyle = {
    position: "absolute", inset: 0,
    width: "100%", height: "100%",
    objectFit: "cover", borderRadius: "50%",
    opacity: 0, transition: "opacity 0.4s",
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d" }}>

      {/* ── Side A: label ── */}
      <div className={`vinyl ${spinning ? "vinyl-spinning" : ""}`}>
        <div className="vinyl-label" style={{
          "--label-a": song.labelA || song.color,
          "--label-b": song.labelB || song.color,
        }}>
          {song.labelImage ? (
            <img src={song.labelImage} alt="" style={imgStyle}
              onLoad={(e) => { e.target.style.opacity = 1; }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          ) : null}
          <div className="lt">{song.title}</div>
          <div className="la">{song.artist}</div>
          <div className="vinyl-label-hole" />
        </div>
      </div>

      {/* ── Side B: grooves face, revealed on flip ── */}
      <div
        className={`vinyl ${spinning ? "vinyl-spinning" : ""}`}
        style={{ position: "absolute", inset: 0, transform: "rotateY(180deg)" }}
      >
        <div className="vinyl-label" style={{
          "--label-a": song.labelB || "#2a1228",
          "--label-b": song.labelA || "#180a18",
        }}>
          <div className="lt">{song.artist}</div>
          <div className="la">Side B</div>
          <div className="vinyl-label-hole" />
        </div>
      </div>

    </div>
  );
}
