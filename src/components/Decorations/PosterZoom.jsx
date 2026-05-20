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

  return (
    <>
      <motion.div
        className="poster-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      <motion.div
        className="poster-zoomed"
        style={{
          x: "-50%",
          y: "-50%",
          "--p-a": poster.pA,
          "--p-b": poster.pB,
          "--accent": poster.accent,
          "--accent-x": poster.accentX,
          "--accent-y": poster.accentY,
        }}
        initial={{ scale: 0.06, opacity: 0, y: "calc(-50% + 22vh)" }}
        animate={{ scale: 1, opacity: 1, y: "-50%" }}
        exit={{ scale: 0.06, opacity: 0, y: "calc(-50% + 22vh)" }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="poster-zoom-img"
          src={poster.img}
          alt={poster.title}
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div className="poster-zoom-info">
          <div className="pz-title">{poster.title}</div>
          <div className="pz-year">{poster.year}</div>
        </div>
        <button className="poster-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </motion.div>
    </>
  );
}
