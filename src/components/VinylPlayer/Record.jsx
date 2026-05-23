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
          {song.id === "asleep" ? (
            <>
              <div className="lt" style={{
                fontSize: "clamp(0.36em, 0.78vh, 0.92vh)",
                lineHeight: 1.55,
                fontStyle: "italic",
                opacity: 0.95,
                padding: "0 6%",
                letterSpacing: "0.005em",
              }}>
                "Since always.<br />In your dreams."
              </div>
              <div className="la" style={{
                marginTop: "0.8vh",
                letterSpacing: "0.22em",
                fontSize: "clamp(0.42em, 0.95vh, 1.08vh)",
                fontWeight: 700,
                opacity: 0.96,
              }}>
                2 · 1 · 3
              </div>
              <div className="vinyl-label-hole" />
            </>
          ) : (
            <>
              <div className="lt">{song.artist}</div>
              <div className="la">Side B</div>
              <div className="vinyl-label-hole" />
            </>
          )}
        </div>
      </div>

    </div>
  );
}
