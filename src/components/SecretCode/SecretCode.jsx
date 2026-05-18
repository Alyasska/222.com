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
    const t = setTimeout(onBurstDone, 3800);
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <div className="secret-toast-inner">2 · 1 · 3</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
