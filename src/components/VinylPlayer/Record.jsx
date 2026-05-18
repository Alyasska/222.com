import { motion } from 'framer-motion';

export default function Record({ playing, currentSong }) {
  return (
    <div className="absolute w-[240px] h-[240px] lg:w-[330px] lg:h-[330px] bg-zinc-300 rounded-full shadow-inner border border-zinc-400 flex items-center justify-center">
      <motion.div
        className="w-[220px] h-[220px] lg:w-[310px] lg:h-[310px] rounded-full shadow-2xl relative flex items-center justify-center"
        style={{
          background: 'repeating-radial-gradient(#1a1a1a 0, #1a1a1a 4px, #222 5px, #1a1a1a 6px)',
        }}
        animate={{ rotate: playing ? 360 : 0 }}
        transition={
          playing
            ? { repeat: Infinity, duration: 2.5, ease: 'linear', delay: 1 }
            : { duration: 0.5, ease: 'easeOut' }
        }
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-white/5 mix-blend-overlay pointer-events-none" />

        <div
          className="w-20 h-20 lg:w-28 lg:h-28 rounded-full border-4 border-[#111] relative overflow-hidden flex items-center justify-center transition-colors duration-700"
          style={{ backgroundColor: currentSong?.color }}
        >
          <div className="absolute w-3 h-3 bg-zinc-400 rounded-full border border-zinc-600 shadow-inner z-10" />
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
          <div className="absolute top-3 w-full text-center pointer-events-none">
            <span className="text-[7px] uppercase tracking-widest text-black/60 font-bold" style={{ fontFamily: 'serif' }}>
              Stereo
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
