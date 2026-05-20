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
      </motion.div>
    </>
  );
}
