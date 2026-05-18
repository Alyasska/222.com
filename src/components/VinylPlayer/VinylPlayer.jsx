import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YouTube from 'react-youtube';
import styles from './VinylPlayer.module.css';
import Record from './Record';
import Tonearm from './Tonearm';
import { songs } from '../../data/songs';

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default function VinylPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const playerRef = useRef(null);
  const loadedIdRef = useRef(null);
  const switchingRef = useRef(false);

  const currentSong = songs[currentIndex];

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

  async function nextVinyl() {
    if (switchingRef.current) return;
    switchingRef.current = true;
    setShowTitle(false);
    if (playing) {
      setPlaying(false);
      await sleep(800);
    }
    setCurrentIndex(i => (i + 1) % songs.length);
    await sleep(400);
    setPlaying(true);
    setShowTitle(true);
    switchingRef.current = false;
  }

  function togglePlay() {
    if (switchingRef.current) return;
    if (!playing) setShowTitle(true);
    setPlaying(p => !p);
  }

  return (
    <div className={styles.playerWrap}>
      <AnimatePresence>
        {showTitle && (
          <motion.div
            key={currentSong.id}
            className={styles.nowPlaying}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.nowTitle}>{currentSong.title}</span>
            <span className={styles.nowArtist}>{currentSong.artist}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.desk}>
        <div className={styles.player}>
          <Record playing={playing} currentSong={currentSong} />
          <Tonearm playing={playing} />

          <div className={styles.controls}>
            <button
              className={styles.powerBtn}
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
            />
            <div className={styles.speedSelector}>
              <span className={styles.speedActive}>33</span>
              <span className={styles.speed}>45</span>
            </div>
          </div>

          <button
            className={styles.nextVinylBtn}
            onClick={nextVinyl}
            aria-label="Next record"
            title="Change vinyl"
          >
            <VinylIcon />
          </button>

          <div className={styles.brandLabel}>222</div>

          <YouTube
            videoId={songs[0].youtubeId}
            opts={{ height: '0', width: '0', playerVars: { autoplay: 0 } }}
            onReady={e => { playerRef.current = e.target; }}
            style={{ position: 'absolute', pointerEvents: 'none' }}
          />
        </div>
      </div>
    </div>
  );
}

function VinylIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6"  stroke="currentColor" strokeWidth="1"   strokeOpacity="0.5" />
      <circle cx="12" cy="12" r="2"  fill="currentColor"   opacity="0.6" />
      <path d="M19 5 L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
