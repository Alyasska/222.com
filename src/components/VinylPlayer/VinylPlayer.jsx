import { AnimatePresence, motion } from "framer-motion";
import Record from "./Record.jsx";
import Tonearm from "./Tonearm.jsx";

export default function VinylPlayer({ activeSong, spinning, onPrev, onNext, isFlipped, onFlip }) {
  return (
    <div className="turntable">
      <div className="platter" />

      {/* Plain div — layoutId animation is handled entirely by the inner motion.div */}
      <div
        className="turntable-vinyl-wrap"
        onClick={spinning ? onFlip : undefined}
        style={{ cursor: spinning ? "pointer" : "default" }}
        title={spinning ? "Click to flip to Side B" : undefined}
      >
        <AnimatePresence mode="popLayout">
          {activeSong && (
            <motion.div
              key={activeSong.id}
              layoutId={`vinyl-${activeSong.id}`}
              layout
              animate={{ rotateY: isFlipped ? 180 : 0, opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.72, y: -18, transition: { duration: 0.28, ease: "easeIn" } }}
              transition={{
                layout:  { type: "spring", stiffness: 72, damping: 13, mass: 1.2 },
                rotateY: { type: "spring", stiffness: 110, damping: 16, mass: 0.9 },
                opacity: { duration: 0.18 },
                scale:   { duration: 0.28 },
              }}
              style={{ width: "100%", height: "100%", transformPerspective: 900 }}
              whileHover={spinning ? { scale: 1.03 } : {}}
              whileTap={spinning   ? { scale: 0.97 } : {}}
            >
              <Record song={activeSong} spinning={spinning} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Tonearm playing={spinning} />

      <div className="turntable-controls">
        <motion.div
          className="knob"
          onClick={onPrev}
          title="Previous"
          whileHover={{ scale: 1.16, filter: "brightness(1.35)" }}
          whileTap={{   scale: 0.80, rotate: -16 }}
          transition={{ type: "spring", stiffness: 420, damping: 20 }}
        />
        <motion.div
          className={`led ${activeSong ? "on" : ""}`}
          animate={activeSong
            ? { opacity: [0.7, 1, 0.7], scale: [1, 1.14, 1] }
            : { opacity: 0.3, scale: 1 }
          }
          transition={activeSong
            ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.3 }
          }
        />
        <motion.div
          className="knob"
          onClick={onNext}
          title="Next"
          whileHover={{ scale: 1.16, filter: "brightness(1.35)" }}
          whileTap={{   scale: 0.80, rotate: 16 }}
          transition={{ type: "spring", stiffness: 420, damping: 20 }}
        />
      </div>
    </div>
  );
}
