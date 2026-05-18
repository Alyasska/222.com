import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecretCode() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buf = '';
    const onKey = e => {
      buf = (buf + e.key).slice(-3);
      if (buf === '213') {
        setActive(true);
        setTimeout(() => setActive(false), 5000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <AnimatePresence>
      {active && <TulipConfetti />}
    </AnimatePresence>
  );
}

function TulipConfetti() {
  const petals = Array.from({ length: 40 }, (_, i) => ({
    key: i,
    startX: Math.random() * 100,
    endX: Math.random() * 20 - 10,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 1.2,
    size: 10 + Math.random() * 15,
    color: ['#f9a8d4', '#fecdd3', '#f472b6', '#ffffff', '#fbcfe8'][Math.floor(Math.random() * 5)],
    dir: Math.random() > 0.5 ? 1 : -1,
  }));

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {petals.map(p => (
        <motion.div
          key={p.key}
          initial={{ top: '-10%', left: `${p.startX}%`, rotate: 0, opacity: 1 }}
          animate={{
            top: '110%',
            left: `${p.startX + p.endX}%`,
            rotate: 360 * p.dir,
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'linear' }}
          className="absolute rounded-tl-full rounded-br-full shadow-sm"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50, x: '-50%' }}
        animate={{ opacity: 1, y: 0, x: '-50%' }}
        exit={{ opacity: 0, y: -20, x: '-50%' }}
        className="absolute top-20 left-1/2 bg-white/80 backdrop-blur-md text-pink-600 italic px-6 py-3 rounded-full shadow-lg border border-pink-200 text-xl whitespace-nowrap"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        "I love you." — Room 222
      </motion.div>
    </div>
  );
}
