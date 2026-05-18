import styles from './Room.module.css';
import VinylPlayer from '../VinylPlayer/VinylPlayer';
import Tulips from '../Decorations/Tulips';
import Books from '../Decorations/Books';
import Sticker222 from '../Decorations/Sticker222';
import SecretCode from '../SecretCode/SecretCode';

export default function Room() {
  return (
    <div className={styles.room}>
      <Tulips />
      <Books />
      <Sticker222 />
      <VinylPlayer />
      <SecretCode />
    </div>
  );
}
