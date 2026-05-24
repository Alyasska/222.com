import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SecretCode({ onUnlock, bursting, onBurstDone }) {
  useEffect(() => {
    const target = "213";
    let buffer = "";
    function handle(e) {
      if (!/^[0-9]$/.test(e.key)) return;
      buffer = (buffer + e.key).slice(-target.length);
      if (buffer === target) {
        buffer = "";
        onUnlock();
      }
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onUnlock]);

  const petals = useMemo(
    () =>
      Array.from({ length: 36 }).map((_, i) => {
        const seed = i + 1;
        const rand = (offset) => {
          const value = Math.sin(seed * 97.13 + offset * 13.37) * 10000;
          return value - Math.floor(value);
        };

        return {
        id: i,
        left: rand(1) * 100,
        delay: rand(2) * 0.6,
        duration: 2.4 + rand(3) * 1.6,
        rotate: rand(4) * 360,
        color: ["#FFB4A2", "#E8A8A0", "#F4C4BC", "#D97C75"][i % 4],
        scale: 0.7 + rand(5) * 0.8,
      };
      }),
    []
  );

  useEffect(() => {
    if (!bursting) return;
    const t = setTimeout(onBurstDone, 8400);
    return () => clearTimeout(t);
  }, [bursting, onBurstDone]);

  return (
    <AnimatePresence>
      {bursting && (
        <>
          {petals.map((p) => (
            <motion.div
              key={p.id}
              className="petal"
              initial={{ y: "-3vh", x: 0, opacity: 0, rotate: p.rotate }}
              animate={{
                y: "105vh",
                x: [0, 6, -8, 4, 0].map((v) => `${v}vh`),
                opacity: [0, 1, 1, 0.8, 0],
                rotate: p.rotate + 540,
              }}
              transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
              style={{ left: `${p.left}%`, background: p.color, transform: `scale(${p.scale})` }}
            />
          ))}
          <motion.div
            className="secret-toast"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6 }}
          >
            <div className="secret-toast-inner" style={{
              fontSize: "clamp(0.95rem, 2.2vh, 2.6vh)",
              lineHeight: 1.85,
              textAlign: "center",
              maxWidth: "62vw",
              fontFamily: "var(--font-serif)",
              color: "rgba(255,224,212,0.96)",
              textShadow: "0 0 3vh rgba(255,143,163,0.45), 0 0 7vh rgba(255,143,163,0.22)",
              letterSpacing: "-0.005em",
            }}>
              {[
                { text: "There is one place in this city", delay: 0.5 },
                { text: "where everything spins slowly",   delay: 0.95 },
                { text: "and the whole world is below you.", delay: 1.4, gap: "1.4em" },
                { text: "You have been there before —",     delay: 2.2 },
                { text: "in some version of a dream.",      delay: 2.65, gap: "1.4em" },
                { text: "Tonight. 7 PM.",                   delay: 3.5 },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: line.delay, ease: "easeOut" }}
                  style={{ marginBottom: line.gap ?? "0.1em" }}
                >
                  {line.text}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 4.2, ease: "easeOut" }}
                style={{
                  fontStyle: "italic",
                  marginTop: "0.5em",
                  color: "#f4c030",
                  opacity: 0.95,
                  letterSpacing: "0.01em",
                }}
              >
                He'll be waiting.
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
