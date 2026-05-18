import { motion } from 'framer-motion';
import styles from './VinylPlayer.module.css';

export default function Record({ playing, currentSong }) {
  return (
    <div className={styles.platter}>
      <motion.div
        className={styles.disc}
        animate={{ rotate: playing ? 360 : 0 }}
        transition={
          playing
            ? { repeat: Infinity, duration: 2.5, ease: 'linear', delay: 1 }
            : { duration: 0.5, ease: 'easeOut' }
        }
      >
        <div className={styles.label} style={{ background: currentSong?.color }}>
          <div className={styles.spindle} />
        </div>
      </motion.div>
    </div>
  );
}
