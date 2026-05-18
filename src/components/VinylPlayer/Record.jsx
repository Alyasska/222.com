export default function Record({ song, spinning }) {
  return (
    <div className={`vinyl ${spinning ? "vinyl-spinning" : ""}`}>
      <div
        className="vinyl-label"
        style={{
          "--label-a": song.labelA || song.color,
          "--label-b": song.labelB || song.color,
        }}
      >
        {song.labelImage ? (
          <img
            src={song.labelImage}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
              opacity: 0,
              transition: "opacity 0.4s",
            }}
            onLoad={(e) => { e.target.style.opacity = 1; }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : null}
        <div className="lt">{song.title}</div>
        <div className="la">{song.artist}</div>
        <div className="vinyl-label-hole" />
      </div>
    </div>
  );
}
