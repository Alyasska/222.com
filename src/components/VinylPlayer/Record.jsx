export default function Record({ playing, currentSong }) {
  return (
    <div className="absolute flex h-[252px] w-[252px] items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 shadow-inner sm:h-[324px] sm:w-[324px] lg:h-[420px] lg:w-[420px]">
      <div
        className="record-spin relative flex h-[230px] w-[230px] items-center justify-center rounded-full shadow-[0_18px_45px_rgba(0,0,0,0.75)] sm:h-[300px] sm:w-[300px] lg:h-[395px] lg:w-[395px]"
        style={{
          background:
            'repeating-radial-gradient(circle at center, #0f0f0f 0px, #0f0f0f 4px, #1d1d1d 5px, #0f0f0f 7px)',
          animationPlayState: playing ? 'running' : 'paused',
        }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/15 via-transparent to-white/5 mix-blend-overlay" />

        <div
          className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-[#171717] shadow-[0_6px_14px_rgba(0,0,0,0.45)] sm:h-28 sm:w-28 lg:h-36 lg:w-36"
          style={{ backgroundColor: currentSong?.color }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%)]" />
          <p className="max-w-[85%] text-center text-[7px] font-semibold uppercase tracking-[0.18em] text-black/60 sm:text-[8px] lg:text-[9px]" style={{ fontFamily: 'var(--font-serif)' }}>
            {currentSong.artist}
          </p>
          <div className="absolute h-3 w-3 rounded-full border border-zinc-600 bg-zinc-400 shadow-inner sm:h-3.5 sm:w-3.5" />
        </div>
      </div>
    </div>
  );
}
