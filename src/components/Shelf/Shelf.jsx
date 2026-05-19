import { motion } from "framer-motion";
import Record from "../VinylPlayer/Record.jsx";

function ShelfSlot({ song, isSelected, onSelect, slotIndex }) {
  return (
    <div
      className={`shelf-slot${isSelected ? " selected" : ""}`}
      style={{ "--slot-i": slotIndex }}
      onClick={() => onSelect(song.id)}
    >
      {!isSelected && (
        <div className="shelf-vinyl-wrap">
          <motion.div
            layoutId={`vinyl-${song.id}`}
            layout
            transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.9 }}
            style={{ width: "100%", height: "100%" }}
          >
            <Record song={song} spinning={false} />
          </motion.div>
        </div>
      )}

      <div
        className={`sleeve ${isSelected ? "sleeve-empty" : ""}`}
        style={{
          "--sleeve-a": song.sleeveA,
          "--sleeve-b": song.sleeveB,
          "--sleeve-glow": song.color,
        }}
      >
        <div
          className="sleeve-art"
          style={{ "--art-a": song.sleeveA, "--art-b": song.sleeveB }}
        >
          {song.coverImage ? (
            <img
              src={song.coverImage}
              alt=""
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : null}
          <div className="t">{song.title}</div>
          <div className="a">{song.artist}</div>
        </div>
      </div>
    </div>
  );
}

export default function Shelf({ songs, selectedId, onSelect, secretUnlocked }) {
  const visible = songs.filter((s) => !s.secret || secretUnlocked);

  return (
    <div className="shelf">
      <div className="shelf-back" />
      <div className="shelf-items">
        {visible.map((song, i) => (
          <ShelfSlot
            key={song.id}
            song={song}
            isSelected={selectedId === song.id}
            onSelect={onSelect}
            slotIndex={i}
          />
        ))}
      </div>
      <div className="shelf-divider" style={{ left: "33.3%" }} />
      <div className="shelf-divider" style={{ left: "66.6%" }} />
      <div className="shelf-top" />
      <div className="shelf-front" />
      <div className="shelf-bracket left" />
      <div className="shelf-bracket right" />
    </div>
  );
}
