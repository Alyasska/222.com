import { motion } from "framer-motion";
import Record from "./Record.jsx";
import Tonearm from "./Tonearm.jsx";

export default function VinylPlayer({ activeSong, spinning, onPrev, onNext, isFlipped, onFlip }) {
  return (
    <div className="turntable">
      <div className="platter" />

      <div
        className="turntable-vinyl-wrap"
        onClick={spinning ? onFlip : undefined}
        style={{ cursor: spinning ? "pointer" : "default" }}
        title={spinning ? "Click to flip to Side B" : undefined}
      >
        {activeSong && (
          <motion.div
            layoutId={`vinyl-${activeSong.id}`}
            layout
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.9 }}
            style={{ width: "100%", height: "100%", transformPerspective: 900 }}
          >
            <Record song={activeSong} spinning={spinning} />
          </motion.div>
        )}
      </div>

      <Tonearm playing={spinning} />

      <div className="turntable-controls">
        <div className="knob" onClick={onPrev} title="Previous" />
        <div className={`led ${activeSong ? "on" : ""}`} />
        <div className="knob" onClick={onNext} title="Next" />
      </div>
    </div>
  );
}
