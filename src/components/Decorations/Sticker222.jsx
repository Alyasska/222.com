import { motion } from 'framer-motion';

export default function Sticker222() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -14, scale: 0.55 }}
      animate={{ opacity: 1, rotate: 7, scale: 1 }}
      transition={{ delay: 1.1, type: 'spring', stiffness: 200, damping: 18 }}
      className="absolute -bottom-5 right-3 z-40 lg:-bottom-7 lg:-right-6"
    >
      <div
        className="relative flex cursor-pointer items-center justify-center rounded-sm px-4 py-2 transition-transform hover:rotate-[11deg]"
        style={{
          background: '#fffdf9',
          filter: 'drop-shadow(2px 5px 7px rgba(0,0,0,0.24))',
          border: '1px solid rgba(0,0,0,0.08)',
        }}
      >
        <span
          className="rounded-sm border-2 border-red-600/35 px-2 py-0.5 text-xl font-bold tracking-widest"
          style={{
            fontFamily: 'var(--font-serif)',
            color: '#dc2626',
            opacity: 0.85,
            mixBlendMode: 'multiply',
          }}
        >
          222
        </span>

        <div
          className="pointer-events-none absolute right-0 top-0 h-3 w-3"
          style={{ background: 'linear-gradient(to bottom left, rgba(0,0,0,0.1), transparent)' }}
        />
      </div>
    </motion.div>
  );
}
