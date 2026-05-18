import { motion } from 'framer-motion';

export default function Polaroid() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: -4 }}
      transition={{ delay: 1.2, duration: 1 }}
      className="hidden lg:block absolute top-[15vh] right-[10vw] z-0"
    >
      <div
        className="bg-[#fcfbf9] p-3 pb-10 rounded-sm relative hover:rotate-0 transition-transform cursor-pointer"
        style={{ boxShadow: '2px 4px 15px rgba(0,0,0,0.08), 0 10px 30px rgba(0,0,0,0.1)', border: '1px solid rgba(0,0,0,0.05)' }}
      >
        <div className="w-32 h-32 bg-[#e8dcc4] border border-black/10 flex items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/40 to-transparent mix-blend-multiply" />
          <span className="text-4xl select-none" style={{ opacity: 0.15 }}>♡</span>
        </div>
        <p className="text-center mt-3 text-stone-500 italic text-sm" style={{ fontFamily: 'var(--font-serif)' }}>
          us.
        </p>
        {/* Pushpin */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 shadow-sm border border-red-700/50">
          <div className="w-1 h-1 bg-white/60 rounded-full ml-0.5 mt-0.5" />
        </div>
      </div>
    </motion.div>
  );
}
