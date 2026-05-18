import { motion } from 'framer-motion';

export default function Playlist({ songs, currentIndex, playing, onSelect }) {
  return (
    <div className="relative">
      {/* Masking tape */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-50/80 border border-black/5 shadow-sm z-10 -rotate-3"
        style={{ clipPath: 'polygon(2% 10%, 98% 5%, 95% 90%, 5% 95%)' }}
      />

      <div
        className="bg-[#fcfbf9] border border-stone-200/60 p-6 relative overflow-hidden text-stone-700"
        style={{ boxShadow: '2px 4px 15px rgba(0,0,0,0.05), 0 10px 30px rgba(0,0,0,0.08)' }}
      >
        {/* Ruled lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, rgba(0,0,0,0.05) 40px)',
            backgroundPositionY: '4px',
          }}
        />

        <h2
          className="text-3xl mb-6 font-semibold text-stone-800 relative z-10"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Playlist
        </h2>

        <div className="flex flex-col gap-3 relative z-10">
          {songs.map((song, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={song.id}
                onClick={() => onSelect(index)}
                className="text-left group flex items-baseline justify-between transition-all"
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-stone-400 italic text-sm"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    0{index + 1}.
                  </span>
                  <div>
                    <h3
                      className={`text-xl border-b-2 transition-colors ${
                        isActive
                          ? 'text-pink-600 border-pink-200'
                          : 'text-stone-700 border-transparent group-hover:text-stone-900 group-hover:border-stone-300'
                      }`}
                      style={{ fontFamily: 'var(--font-serif)' }}
                    >
                      {song.title}
                    </h3>
                    <p className={`text-xs mt-0.5 ${isActive ? 'text-pink-400' : 'text-stone-400'}`}>
                      {song.artist}
                    </p>
                  </div>
                </div>

                {isActive && (
                  <div className="flex gap-1 h-3 items-end opacity-70 mb-1 ml-2 shrink-0">
                    <motion.div
                      animate={playing ? { height: ['4px', '12px', '4px'] } : { height: '4px' }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-1 bg-pink-400 rounded-t-sm"
                    />
                    <motion.div
                      animate={playing ? { height: ['8px', '4px', '8px'] } : { height: '4px' }}
                      transition={{ repeat: Infinity, duration: 0.9 }}
                      className="w-1 bg-pink-400 rounded-t-sm"
                    />
                    <motion.div
                      animate={playing ? { height: ['6px', '10px', '6px'] } : { height: '4px' }}
                      transition={{ repeat: Infinity, duration: 0.7 }}
                      className="w-1 bg-pink-400 rounded-t-sm"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div
          className="mt-6 text-center text-xs text-stone-400 italic relative z-10"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Built with love. Room 222 never really ends.
        </div>
      </div>
    </div>
  );
}
