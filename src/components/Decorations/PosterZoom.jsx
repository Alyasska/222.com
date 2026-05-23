import { useEffect } from "react";
import { motion } from "framer-motion";

export default function PosterZoom({ poster, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Animate FROM the poster's screen center TO the viewport center
  const ox = poster.originX ?? 0;
  const oy = poster.originY ?? 0;

  return (
    <>
      <motion.div
        className="poster-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28 }}
        onClick={onClose}
      />

      <motion.div
        className="poster-zoomed"
        style={{
          x: "-50%",
          "--p-a":      poster.pA,
          "--p-b":      poster.pB,
          "--accent":   poster.accent,
          "--accent-x": poster.accentX,
          "--accent-y": poster.accentY,
        }}
        initial={{ scale: 0.06, x: `calc(-50% + ${ox}px)`, y: `calc(-50% + ${oy}px)`, opacity: 0 }}
        animate={{ scale: 1,    x: "-50%",                   y: "-50%",                  opacity: 1 }}
        exit={{    scale: 0.06, x: `calc(-50% + ${ox}px)`, y: `calc(-50% + ${oy}px)`, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 26, mass: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="poster-zoom-img"
          src={poster.img}
          alt={poster.title}
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <button className="poster-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {poster.title === "AMÉLIE" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              background: "linear-gradient(to top, rgba(8,3,2,0.96) 0%, rgba(8,3,2,0.88) 55%, rgba(8,3,2,0) 100%)",
              padding: "9vh 3vw 3vh",
              fontFamily: "var(--font-serif)",
              color: "rgba(255,240,210,0.95)",
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            {[
              { text: '"She likes to look for things no one else catches."', italic: true, color: "#f4c030", size: "clamp(0.85rem, 1.6vh, 1.8vh)", gap: "1.6vh", delay: 1.2 },
              { text: "She dances alone in her room.",                        size: "clamp(0.75rem, 1.4vh, 1.6vh)", gap: "0.4vh", delay: 1.9 },
              { text: "She debates fiercely. She usually wins.",              size: "clamp(0.75rem, 1.4vh, 1.6vh)", gap: "0.4vh", delay: 2.3 },
              { text: "She works until the stars go quiet.",                  size: "clamp(0.75rem, 1.4vh, 1.6vh)", gap: "0.4vh", delay: 2.7 },
              { text: "When she is angry, she breaks dishes.",                size: "clamp(0.75rem, 1.4vh, 1.6vh)", gap: "0.4vh", delay: 3.1 },
              { text: "None of this is a flaw.",                              size: "clamp(0.75rem, 1.4vh, 1.6vh)", gap: "1.8vh", delay: 3.5 },
              { text: "Now — find the thing that was heavy to carry.",       size: "clamp(0.7rem, 1.25vh, 1.45vh)", opacity: 0.78, gap: "0.3vh", delay: 4.3 },
              { text: "Three kilograms of something red and tart.",          size: "clamp(0.7rem, 1.25vh, 1.45vh)", opacity: 0.78, gap: "0.3vh", delay: 4.7 },
              { text: "The next note lives with them.",                       size: "clamp(0.7rem, 1.25vh, 1.45vh)", opacity: 0.78, gap: "0",     delay: 5.1 },
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: line.opacity ?? 1, y: 0 }}
                transition={{ duration: 0.7, delay: line.delay, ease: "easeOut" }}
                style={{
                  fontStyle: line.italic ? "italic" : "normal",
                  color: line.color ?? undefined,
                  fontSize: line.size,
                  marginBottom: line.gap,
                  lineHeight: 1.5,
                  letterSpacing: line.italic ? "0.02em" : "0.01em",
                }}
              >
                {line.text}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
