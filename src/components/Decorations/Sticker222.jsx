import { motion } from 'framer-motion';

export default function Sticker222() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
      animate={{ opacity: 1, rotate: 8, scale: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 18 }}
      className="absolute -bottom-6 -right-4 lg:-right-8 z-40"
    >
      <div
        className="relative px-4 py-2 rounded-sm flex items-center justify-center hover:rotate-12 transition-transform cursor-pointer"
        style={{
          background: '#fdfbf7',
          filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.15))',
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <span
          className="font-bold text-xl tracking-widest border-2 border-red-600/30 px-2 py-0.5 rounded-sm"
          style={{
            fontFamily: 'var(--font-serif)',
            color: '#dc2626',
            opacity: 0.8,
            mixBlendMode: 'multiply',
          }}
        >
          222
        </span>
        <div
          className="absolute top-0 right-0 w-3 h-3 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom left, rgba(0,0,0,0.08), transparent)' }}
        />
      </div>
    </motion.div>
  );
}
