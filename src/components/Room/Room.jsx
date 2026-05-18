import { useState } from 'react';
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

export default function Room() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const currentSong = songs[currentIndex];

  function handleSongSelect(index) {
    if (index === currentIndex) {
      setPlaying((prev) => !prev);
      return;
    }

    setCurrentIndex(index);
    setPlaying(true);
  }

  function handleTogglePlay() {
    setPlaying((prev) => !prev);
  }

  function handleNext() {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setPlaying(true);
  }

  return (
    <div className="relative min-h-screen overflow-x-clip font-sans text-stone-100 selection:bg-pink-300/40">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, #fceef2 0%, #edcfda 45%, #c09dab 100%)',
        }}
      />

      <div className="absolute inset-0 bg-black/28 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 18% 8%, rgba(255,255,255,0.34), transparent 35%), radial-gradient(circle at 85% 20%, rgba(255, 220, 198, 0.18), transparent 32%)',
        }}
      />

      <div className="absolute inset-0 z-0 flex flex-col">
        <div className="relative flex-grow">
          <FairyLights />
          <Polaroid />
        </div>

        <div className="relative h-[39svh] w-full flex-shrink-0">
          <div className="absolute -top-10 left-0 right-0 h-10 bg-[#f5ebe6]/95 border-y border-black/10" />

          <div
            className="relative h-full border-t border-white/20"
            style={{
              backgroundImage: [
                'linear-gradient(180deg, #9f6b44 0%, #845737 45%, #71482d 100%)',
                'repeating-linear-gradient(90deg, transparent, transparent 64px, rgba(0,0,0,0.08) 64px, rgba(0,0,0,0.08) 65px)',
              ].join(', '),
              boxShadow: 'inset 0 25px 50px rgba(0,0,0,0.3), 0 -15px 30px rgba(0,0,0,0.25)',
            }}
          >
            <div className="absolute left-7 right-7 top-2 h-1.5 rounded-full bg-gradient-to-r from-cyan-300/85 via-pink-300/90 to-cyan-300/85" style={{ boxShadow: '0 0 16px rgba(103, 232, 249, 0.75), 0 0 22px rgba(244, 114, 182, 0.55)' }} />
            <div className="absolute left-7 right-7 top-4 h-4 rounded-full bg-cyan-200/18 blur-md" />
          </div>

          <div
            className="absolute -bottom-7 left-0 right-0 h-7 border-t border-black/30"
            style={{ background: 'linear-gradient(180deg, #72492f 0%, #623e27 100%)' }}
          />
        </div>
      </div>

      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col items-center justify-end gap-8 px-4 pb-[11svh] pt-20 lg:grid lg:grid-cols-[1fr_minmax(520px,700px)_1fr] lg:items-end lg:gap-12 lg:px-8 xl:px-16">
        <motion.div
          initial={{ opacity: 0, x: -32, y: 24 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
          className="order-2 flex w-full max-w-[320px] scale-110 items-end justify-center lg:order-1 lg:scale-[1.18] lg:justify-start lg:pb-9"
        >
          <div className="flex items-end gap-3">
            <Tulips />
            <Books />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 26 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 flex w-full flex-col items-center gap-4 lg:order-2"
        >
          <div className="w-full max-w-[640px] rounded-2xl border border-white/25 bg-black/22 px-5 py-4 text-center shadow-2xl backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentSong.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="text-3xl font-semibold tracking-wide text-rose-50 lg:text-5xl"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {currentSong.title}
              </motion.h1>
            </AnimatePresence>
            <p className="mt-2 text-base italic text-rose-100/85 lg:text-lg" style={{ fontFamily: 'var(--font-serif)' }}>
              {playing ? `Now Playing • ${currentSong.artist}` : `Tap to play • ${currentSong.artist}`}
            </p>
          </div>

          <div className="relative">
            <VinylPlayer
              playing={playing}
              currentSong={currentSong}
              onTogglePlay={handleTogglePlay}
              onNext={handleNext}
            />
            <Sticker222 />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28, y: 26, rotate: -1 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: 1.5 }}
          transition={{ duration: 0.95, delay: 0.45, ease: 'easeOut' }}
          className="order-3 w-full max-w-[420px]"
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
