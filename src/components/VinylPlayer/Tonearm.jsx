import { motion } from 'framer-motion';

const REST_DEG = 15;
const PLAY_DEG = 35;

export default function Tonearm({ playing }) {
  return (
    <div className="absolute top-5 right-7 lg:top-6 lg:right-8 w-16 h-44 lg:h-56 z-20 pointer-events-none">
      {/* Pivot base */}
      <div className="absolute top-0 right-0 w-12 h-12 lg:w-14 lg:h-14 bg-zinc-300 rounded-full shadow-xl border border-zinc-400 flex items-center justify-center z-10">
        <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-zinc-200 border-2 border-zinc-400 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-zinc-800" />
        </div>
      </div>

      {/* Arm */}
      <motion.div
        className="absolute top-6 right-6 lg:top-7 lg:right-7 w-2 h-36 lg:h-44 origin-top"
        initial={{ rotate: REST_DEG }}
        animate={{ rotate: playing ? PLAY_DEG : REST_DEG }}
        transition={{ type: 'spring', stiffness: 180, damping: 42 }}
      >
        <div className="w-2 h-full bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-full shadow-lg" />
        <div className="absolute -top-4 -left-2 w-6 h-8 bg-zinc-400 rounded-sm shadow-md border border-zinc-500" />
        <div
          className="absolute -bottom-3 -left-1 w-5 h-7 bg-zinc-700 rounded-t-sm rounded-b-md shadow-xl"
          style={{ transform: 'rotate(20deg)', transformOrigin: 'top' }}
        />
      </motion.div>
    </div>
  );
}
