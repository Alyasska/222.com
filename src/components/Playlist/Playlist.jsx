import { motion } from 'framer-motion';

export default function Playlist({ songs, currentIndex, playing, onSelect }) {
  return (
    <div className="relative">
      <div
        className="absolute -top-3 left-1/2 z-20 h-7 w-24 -translate-x-1/2 -rotate-3 border border-black/10 bg-amber-50/80 shadow-sm"
        style={{ clipPath: 'polygon(3% 10%, 97% 5%, 94% 90%, 6% 95%)' }}
      />

      <div
        className="relative overflow-hidden border border-white/30 bg-[#fff8f2]/95 px-5 pb-5 pt-6 text-stone-800 shadow-[0_24px_45px_rgba(0,0,0,0.2)] sm:px-6 sm:pb-6"
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(transparent, transparent 43px, rgba(46, 30, 20, 0.08) 44px), linear-gradient(90deg, transparent 0, transparent 18px, rgba(236, 72, 153, 0.24) 19px, rgba(236, 72, 153, 0.24) 20px, transparent 20px)',
            backgroundPositionY: '7px',
          }}
        />

        <h2 className="relative z-10 mb-5 text-3xl font-semibold tracking-wide text-stone-900" style={{ fontFamily: 'var(--font-serif)' }}>
          Tonight&apos;s Mix
        </h2>

        <div className="relative z-10 flex max-h-[340px] flex-col gap-2 overflow-y-auto pr-1">
          {songs.map((song, index) => {
            const isActive = index === currentIndex;
            const trackNumber = String(index + 1).padStart(2, '0');

            return (
              <button
                key={song.id}
                onClick={() => onSelect(index)}
                className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/75"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="pt-0.5 text-sm italic text-stone-500" style={{ fontFamily: 'var(--font-serif)' }}>
                    {trackNumber}
                  </span>
                  <div className="min-w-0">
                    <h3
                      className={`truncate border-b-2 text-xl leading-tight transition-colors ${
                        isActive
                          ? 'border-rose-300 text-rose-600'
                          : 'border-transparent text-stone-800 group-hover:border-stone-300 group-hover:text-stone-950'
                      }`}
                      style={{ fontFamily: 'var(--font-serif)' }}
                      title={song.title}
                    >
                      {song.title}
                    </h3>
                    <p className={`truncate text-sm ${isActive ? 'text-rose-500' : 'text-stone-500'}`} title={song.artist}>
                      {song.artist}
                    </p>
                  </div>
                </div>

                {isActive && (
                  <div className="ml-3 flex h-4 shrink-0 items-end gap-1 opacity-80">
                    <motion.div
                      animate={playing ? { height: ['4px', '14px', '4px'] } : { height: '4px' }}
                      transition={{ repeat: Infinity, duration: 0.78 }}
                      className="w-1 rounded-t-sm bg-rose-400"
                    />
                    <motion.div
                      animate={playing ? { height: ['9px', '4px', '9px'] } : { height: '4px' }}
                      transition={{ repeat: Infinity, duration: 0.88 }}
                      className="w-1 rounded-t-sm bg-rose-400"
                    />
                    <motion.div
                      animate={playing ? { height: ['6px', '12px', '6px'] } : { height: '4px' }}
                      transition={{ repeat: Infinity, duration: 0.72 }}
                      className="w-1 rounded-t-sm bg-rose-400"
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <p className="relative z-10 mt-5 text-center text-xs italic text-stone-500" style={{ fontFamily: 'var(--font-serif)' }}>
          Room 222 stays on, even after midnight.
        </p>
      </div>
    </div>
  );
}
