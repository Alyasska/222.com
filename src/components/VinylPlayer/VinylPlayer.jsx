import { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import Record from './Record';
import Tonearm from './Tonearm';

export default function VinylPlayer({ playing, currentSong, onTogglePlay, onNext }) {
  const playerRef = useRef(null);
  const loadedIdRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player || !isReady) return;

    try {
      if (loadedIdRef.current !== currentSong.youtubeId) {
        loadedIdRef.current = currentSong.youtubeId;
        if (playing) {
          player.loadVideoById(currentSong.youtubeId);
        } else {
          player.cueVideoById(currentSong.youtubeId);
        }
      }

      if (playing) {
        player.unMute();
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    } catch {
      // Browsers may block autoplay after non-gesture transitions.
    }
  }, [playing, currentSong.youtubeId, isReady]);

  function handleReady(event) {
    playerRef.current = event.target;
    loadedIdRef.current = currentSong.youtubeId;
    setIsReady(true);

    event.target.cueVideoById(currentSong.youtubeId);

    if (playing) {
      event.target.playVideo();
    }
  }

  function handlePlayerError() {
    // Some tracks are restricted in embedded players.
    // We keep the UI responsive and allow the user to try another record.
  }

  return (
    <div className="relative">
      <div
        className="group relative flex h-[320px] w-[320px] cursor-pointer items-center justify-center overflow-hidden rounded-[34px] border border-white/20 bg-[#2f1d12] transition-transform duration-200 hover:scale-[1.01] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]"
        style={{
          boxShadow:
            '0 35px 70px rgba(0,0,0,0.45), inset 0 2px 6px rgba(255,255,255,0.12), inset 0 -3px 8px rgba(0,0,0,0.4)',
        }}
        onClick={onTogglePlay}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 15%, rgba(255,255,255,0.16), transparent 30%), repeating-linear-gradient(65deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 9px)',
          }}
        />

        <Record playing={playing} currentSong={currentSong} />
        <Tonearm playing={playing} />

        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3" onClick={(event) => event.stopPropagation()}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-400 bg-zinc-200 shadow-lg sm:h-11 sm:w-11">
            <div className={`h-2.5 w-2.5 rounded-full transition-colors ${playing ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          </div>
          <div className="h-7 w-7 rounded-full border-b-2 border-zinc-500 bg-zinc-300 shadow-md sm:h-8 sm:w-8" />
          <div className="h-7 w-7 rounded-full border-b-2 border-zinc-500 bg-zinc-300 shadow-md sm:h-8 sm:w-8" />
        </div>

        <div className="absolute bottom-7 right-[5.2rem] z-20 select-none text-sm tracking-[0.35em] text-amber-100/60 sm:text-base" style={{ fontFamily: 'var(--font-serif)' }}>
          222
        </div>

        <button
          className="absolute bottom-5 right-5 z-20 rounded-full bg-white/8 p-2 text-amber-100/70 transition-colors hover:bg-white/20 hover:text-amber-50"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Next record"
          title="Next record"
        >
          <VinylIcon />
        </button>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/70 text-rose-500 opacity-0 shadow-xl backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
            {playing ? <PauseIcon /> : <PlayIcon />}
          </div>
        </div>

        <YouTube
          videoId={currentSong.youtubeId}
          opts={{
            height: '0',
            width: '0',
            playerVars: {
              autoplay: 0,
              controls: 0,
              rel: 0,
              modestbranding: 1,
              playsinline: 1,
              iv_load_policy: 3,
            },
          }}
          onReady={handleReady}
          onEnd={onNext}
          onError={handlePlayerError}
          style={{ position: 'absolute', pointerEvents: 'none' }}
        />
      </div>
    </div>
  );
}

function VinylIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.7" />
      <path d="M18.6 5.4 L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M6 19h4V5H6zm8-14v14h4V5z" />
    </svg>
  );
}
