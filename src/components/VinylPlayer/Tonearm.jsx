import { motion } from 'framer-motion';
import styles from './VinylPlayer.module.css';

// Angles measured clockwise from the arm's natural vertical (headshell pointing down).
// At rest (+30°) the headshell swings right, off the record.
// At play (–45°) it sweeps left onto the outer groove.
const REST_DEG  =  30;
const PLAY_DEG  = -45;

export default function Tonearm({ playing }) {
  return (
    <div className={styles.tonearmAnchor}>
      <motion.div
        className={styles.armSvgWrap}
        style={{ transformOrigin: '50% 50%' }}
        initial={{ rotate: REST_DEG }}
        animate={{ rotate: playing ? PLAY_DEG : REST_DEG }}
        transition={{ type: 'spring', stiffness: 180, damping: 42 }}
      >
        {/*
          SVG adapted from Codrops RecordPlayer (MIT licence).
          viewBox 0 0 800 800 — pivot circle is at exact centre (400, 400).
          Colors changed to match the warm silver palette.
        */}
        <svg className={styles.armSvg} viewBox="0 0 800 800">
          {/* Arm tube */}
          <path
            fill="#B0B0C0"
            d="M354.5,761.6l11.9,6.2c0,0,37.1-91.5,42.4-123.7
               c2.7-16.4-1.1-103.9-1.1-103.9V307.5h-14.7l-0.1,232.7
               c0,0,3.7,87.5,1.1,103.9C389,674.6,354.5,761.6,354.5,761.6z"
          />
          {/* Mounting block / counterweight carrier */}
          <rect x="379.7" y="239.7" fill="#52525E" width="40.7" height="67.8" />
          {/* Pivot bearing — outer ring */}
          <circle fill="#D4D4E2" cx="400" cy="400" r="22.6" />
          {/* Pivot bearing — centre screw */}
          <circle fill="#242428" cx="400" cy="400" r="6" />
          {/* Headshell / cartridge */}
          <path
            fill="#A4A4B4"
            d="M353,738.9l18.3-22.9l13.2,6.4l-6.2,28.7
               l-22.8,47.1c0,0-1.2,3.3-15.4-3.6
               c-11.2-5.4-10-8.7-10-8.7L353,738.9z"
          />
        </svg>
      </motion.div>
    </div>
  );
}
