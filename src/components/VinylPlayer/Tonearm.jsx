import { motion } from 'framer-motion';

const REST_DEG = 16;
const PLAY_DEG = 36;

export default function Tonearm({ playing }) {
  return (
    <div className="pointer-events-none absolute right-7 top-4 z-20 h-[205px] w-[72px] sm:right-9 sm:top-6 sm:h-[255px] sm:w-[86px] lg:right-12 lg:top-10 lg:h-[330px] lg:w-[108px]">
      <div className="absolute right-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-400 bg-zinc-300 shadow-xl sm:h-16 sm:w-16 lg:h-20 lg:w-20">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-zinc-500 bg-zinc-200 sm:h-9 sm:w-9 lg:h-11 lg:w-11">
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-800" />
        </div>
      </div>

      <motion.div
        className="absolute right-5 top-7 h-[148px] w-[9px] origin-top sm:right-7 sm:top-8 sm:h-[192px] sm:w-[10px] lg:right-8 lg:top-10 lg:h-[244px]"
        initial={{ rotate: REST_DEG }}
        animate={{ rotate: playing ? PLAY_DEG : REST_DEG }}
        transition={{ type: 'spring', stiffness: 170, damping: 34, mass: 0.9 }}
      >
        <div className="h-full w-full rounded-full bg-gradient-to-r from-zinc-200 to-zinc-500 shadow-lg" />
        <div className="absolute -left-2 -top-4 h-8 w-5 rounded-sm border border-zinc-500 bg-zinc-400 shadow-md sm:h-10 sm:w-6 lg:h-11 lg:w-7" />
        <div
          className="absolute -bottom-3 -left-1 h-7 w-5 rounded-b-md rounded-t-sm bg-zinc-700 shadow-xl sm:h-8 sm:w-6 lg:h-10 lg:w-7"
          style={{ transform: 'rotate(19deg)', transformOrigin: 'top' }}
        />
      </motion.div>
    </div>
  );
}
