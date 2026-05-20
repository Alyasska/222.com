import { motion } from "framer-motion";
import Record from "../VinylPlayer/Record.jsx";

const SPRING = { type: "spring", stiffness: 72, damping: 13, mass: 1.2 };

function ShelfSlot({ song, isSelected, onSelect, slotIndex }) {
  return (
    <motion.div
      className={`shelf-slot${isSelected ? " selected" : ""}`}
      style={{ "--slot-i": slotIndex }}
      onClick={() => onSelect(song.id)}
      whileHover={isSelected ? {} : {
        y: -10,
        rotateY: 0,
        z: 20,
        transition: { type: "spring", stiffness: 260, damping: 18 },
      }}
      whileTap={isSelected ? {} : {
        scale: 0.96,
        transition: { duration: 0.08 },
      }}
    >
      {!isSelected && (
        <div className="shelf-vinyl-wrap">
          <motion.div
            layoutId={`vinyl-${song.id}`}
            layout
            transition={SPRING}
            style={{ width: "100%", height: "100%" }}
          >
            <Record song={song} spinning={false} />
          </motion.div>
        </div>
      )}

      <motion.div
        className={`sleeve ${isSelected ? "sleeve-empty" : ""}`}
        style={{
          "--sleeve-a":    song.sleeveA,
          "--sleeve-b":    song.sleeveB,
          "--sleeve-glow": song.color,
        }}
        whileHover={isSelected ? {} : {
          y: -4,
          boxShadow: `0 1.2vh 3vh rgba(0,0,0,0.65), 0 0 2.4vh ${song.color}55`,
          transition: { type: "spring", stiffness: 260, damping: 18 },
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
      </motion.div>
    </motion.div>
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
