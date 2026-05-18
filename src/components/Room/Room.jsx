import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VinylPlayer from '../VinylPlayer/VinylPlayer';
import Tulips from '../Decorations/Tulips';
import Books from '../Decorations/Books';
import Sticker222 from '../Decorations/Sticker222';
import SecretCode from '../SecretCode/SecretCode';
import FairyLights from '../Decorations/FairyLights';
import Polaroid from '../Decorations/Polaroid';
import Playlist from '../Playlist/Playlist';
import { songs } from '../../data/songs';

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default function Room() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const switchingRef = useRef(false);

  const currentSong = songs[currentIndex];

  async function handleSongSelect(index) {
    if (switchingRef.current) return;
    if (index === currentIndex) {
      if (!playing) setShowTitle(true);
      setPlaying(p => !p);
      return;
    }
    switchingRef.current = true;
    setShowTitle(false);
    if (playing) {
      setPlaying(false);
      await sleep(800);
    }
    setCurrentIndex(index);
    await sleep(400);
    setPlaying(true);
    setShowTitle(true);
    switchingRef.current = false;
  }

  function handleTogglePlay() {
    if (switchingRef.current) return;
    if (!playing) setShowTitle(true);
    setPlaying(p => !p);
  }

  function handleNext() {
    handleSongSelect((currentIndex + 1) % songs.length);
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden font-sans text-stone-800 selection:bg-pink-200"
      style={{
        backgroundColor: '#fcf5f8',
        backgroundImage: [
          'repeating-linear-gradient(transparent, transparent 60px, rgba(244,114,182,0.04) 60px, rgba(244,114,182,0.04) 120px)',
          'radial-gradient(circle at 50% 30%, transparent 0%, rgba(0,0,0,0.05) 100%)',
        ].join(', '),
      }}
    >
      {/* ── Background scene ── */}
      <div className="absolute inset-0 flex flex-col z-0">

        {/* Wall */}
        <div className="flex-grow relative">
          <div
            className="absolute top-0 -left-[10%] w-[60%] h-full pointer-events-none -skew-x-12 opacity-80"
            style={{
              background: 'linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0) 80%)',
              mixBlendMode: 'overlay',
              clipPath: 'polygon(10% 0, 80% 0, 100% 100%, 30% 100%)',
            }}
          />
          <div
            className="absolute top-0 left-[5%] w-[10%] h-full pointer-events-none -skew-x-12 opacity-50"
            style={{
              background: 'linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 40%, rgba(255,255,255,0) 80%)',
              mixBlendMode: 'overlay',
              clipPath: 'polygon(10% 0, 80% 0, 100% 100%, 30% 100%)',
            }}
          />
          <FairyLights />
          <Polaroid />
        </div>

        {/* Baseboard + Desk */}
        <div className="h-[40vh] w-full relative flex flex-col flex-shrink-0">
          <div className="absolute -top-8 left-0 right-0 h-8 bg-[#f8f6f3] border-t-2 border-[#e8e5e0] z-0">
            <div className="h-[2px] w-full bg-white/80" />
            <div className="h-1 w-full bg-black/5" />
          </div>

          <div
            className="flex-grow relative z-10 border-t border-white/30"
            style={{
              backgroundImage: [
                'linear-gradient(180deg, #c49a6c 0%, #d4a373 15%, #c8975f 100%)',
                'repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(0,0,0,0.025) 60px, rgba(0,0,0,0.025) 61px)',
              ].join(', '),
              boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.1), 0 -15px 35px rgba(0,0,0,0.15)',
            }}
          >
            <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-black/15 to-transparent pointer-events-none" />
          </div>

          <div
            className="h-7 z-20 border-t border-black/20 shadow-2xl"
            style={{ background: 'linear-gradient(180deg, #9e6b3a 0%, #b07840 100%)' }}
          >
            <div className="h-[1px] w-full bg-white/20" />
          </div>
        </div>
      </div>

      {/* ── Foreground content ── */}
      <div className="absolute inset-0 z-20 container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-center lg:items-end lg:pb-[18vh] gap-8 lg:gap-16 pt-12 lg:pt-0 h-full">

        {/* Left: Tulips + Books */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center gap-2 absolute left-2 lg:left-10 bottom-[38vh] lg:bottom-[35vh] scale-75 lg:scale-100 origin-bottom-left z-20"
        >
          <Tulips />
          <Books />
        </motion.div>

        {/* Center: Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-30"
        >
          <div className="absolute -top-20 left-0 w-full text-center">
            <AnimatePresence mode="wait">
              {showTitle && (
                <motion.h1
                  key={currentSong.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl lg:text-4xl font-semibold text-stone-800 tracking-wide drop-shadow-md"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {currentSong.title}
                </motion.h1>
              )}
            </AnimatePresence>
            <p className="text-stone-500 text-sm mt-1 italic" style={{ fontFamily: 'var(--font-serif)' }}>
              {playing ? 'Now Playing...' : 'Click to play'}
            </p>
          </div>

          <VinylPlayer
            playing={playing}
            currentSong={currentSong}
            onTogglePlay={handleTogglePlay}
            onNext={handleNext}
          />
          <Sticker222 />
        </motion.div>

        {/* Right: Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="w-full max-w-xs z-30 relative"
        >
          <Playlist
            songs={songs}
            currentIndex={currentIndex}
            playing={playing}
            onSelect={handleSongSelect}
          />
        </motion.div>
      </div>

      <SecretCode />
    </div>
  );
}
