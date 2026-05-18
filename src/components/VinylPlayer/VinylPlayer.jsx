import { useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import Record from './Record';
import Tonearm from './Tonearm';

export default function VinylPlayer({ playing, currentSong, onTogglePlay, onNext }) {
  const playerRef = useRef(null);
  const loadedIdRef = useRef(null);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (playing) {
      if (loadedIdRef.current !== currentSong.youtubeId) {
        loadedIdRef.current = currentSong.youtubeId;
        player.loadVideoById(currentSong.youtubeId);
      } else {
        player.playVideo();
      }
    } else {
      player.pauseVideo();
    }
  }, [playing, currentSong]);

  return (
    <div
      className="relative group cursor-pointer w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-3xl border border-white/40 flex items-center justify-center transition-transform hover:scale-[1.01]"
      style={{
        background: '#e6d5c3',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.8)',
      }}
      onClick={onTogglePlay}
    >
      {/* Texture */}
      <div
        className="absolute inset-0 rounded-3xl opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 8px)',
        }}
      />

      <Record playing={playing} currentSong={currentSong} />
      <Tonearm playing={playing} />

      {/* Knobs (bottom-left) */}
      <div className="absolute bottom-5 left-5 flex gap-3 z-10" onClick={e => e.stopPropagation()}>
        <div className="w-8 h-8 rounded-full bg-stone-200 border-2 border-stone-300 shadow-md flex items-center justify-center">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${playing ? 'bg-green-400' : 'bg-red-400'}`} />
        </div>
        <div className="w-6 h-6 self-center rounded-full bg-stone-300 border-b-2 border-stone-400 shadow-sm" />
        <div className="w-6 h-6 self-center rounded-full bg-stone-300 border-b-2 border-stone-400 shadow-sm" />
      </div>

      {/* Brand */}
      <div
        className="absolute bottom-6 right-14 z-10 text-xs tracking-widest text-stone-500/50 select-none"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        222
      </div>

      {/* Next vinyl */}
      <button
        className="absolute bottom-4 right-4 z-10 text-stone-400 hover:text-stone-600 transition-colors p-1.5 rounded-full hover:bg-stone-200/60"
        onClick={e => { e.stopPropagation(); onNext(); }}
        aria-label="Next record"
        title="Next record"
      >
        <VinylIcon />
      </button>

      {/* Play/pause hover hint */}
      <div className="absolute inset-0 rounded-3xl flex items-center justify-center pointer-events-none">
        <div className="w-14 h-14 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/75 backdrop-blur-sm shadow-lg flex items-center justify-center text-pink-500">
          {playing ? <PauseIcon /> : <PlayIcon />}
        </div>
      </div>

      <YouTube
        videoId={currentSong.youtubeId}
        opts={{ height: '0', width: '0', playerVars: { autoplay: 0, rel: 0, iv_load_policy: 3, modestbranding: 1 } }}
        onReady={e => { playerRef.current = e.target; }}
        style={{ position: 'absolute', pointerEvents: 'none' }}
      />
    </div>
  );
}

function VinylIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.6" />
      <path d="M19 5 L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}
