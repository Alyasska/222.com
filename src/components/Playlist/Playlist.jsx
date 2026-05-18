import styles from './Playlist.module.css';

export default function Playlist({ songs, currentSong, playing, onSelect }) {
  return (
    <ul className={styles.list}>
      {songs.map(song => {
        const isActive = song.id === currentSong.id;
        return (
          <li
            key={song.id}
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            style={isActive ? { '--accent': song.color } : undefined}
            onClick={() => onSelect(song)}
          >
            <span className={styles.dot}>{isActive && playing ? '▶' : ''}</span>
            <span className={styles.title}>{song.title}</span>
            <span className={styles.artist}>{song.artist}</span>
          </li>
        );
      })}
    </ul>
  );
}
