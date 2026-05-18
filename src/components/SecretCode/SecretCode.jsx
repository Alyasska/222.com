import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecretCode() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buf = '';
    const onKey = (event) => {
      buf = (buf + event.key).slice(-3);
      if (buf === '213') {
        setActive(true);
        setTimeout(() => setActive(false), 5000);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return <AnimatePresence>{active && <TulipConfetti />}</AnimatePresence>;
}

function createPetals() {
  const palette = ['#f9a8d4', '#fecdd3', '#f472b6', '#ffffff', '#fbcfe8'];

  return Array.from({ length: 40 }, (_, index) => ({
    key: index,
    startX: Math.random() * 100,
    endX: Math.random() * 20 - 10,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 1.2,
    size: 10 + Math.random() * 15,
    color: palette[Math.floor(Math.random() * palette.length)],
    dir: Math.random() > 0.5 ? 1 : -1,
  }));
}

function TulipConfetti() {
  const petals = useMemo(() => createPetals(), []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.key}
          initial={{ top: '-10%', left: `${petal.startX}%`, rotate: 0, opacity: 1 }}
          animate={{
            top: '110%',
            left: `${petal.startX + petal.endX}%`,
            rotate: 360 * petal.dir,
          }}
          transition={{ duration: petal.duration, delay: petal.delay, ease: 'linear' }}
          className="absolute rounded-tl-full rounded-br-full shadow-sm"
          style={{ width: petal.size, height: petal.size, backgroundColor: petal.color }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: -20, x: '-50%' }}
        className="absolute left-1/2 top-20 whitespace-nowrap rounded-full border border-pink-200 bg-white/80 px-6 py-3 text-xl italic text-pink-600 shadow-lg backdrop-blur-md"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        "I love you." - Room 222
      </motion.div>
    </div>
  );
}
