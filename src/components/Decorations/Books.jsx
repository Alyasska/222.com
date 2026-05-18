import styles from './Books.module.css';

const books = [
  {
    title: 'Unbearable Lightness',
    spine: '#8B6F8E',
    spineEdge: '#6B4F6E',
    text: '#F7EFF7',
    width: 44,
    tilt: -3,
  },
  {
    title: 'To the Lighthouse',
    spine: '#4A6F8A',
    spineEdge: '#2A4F6A',
    text: '#EAF4FF',
    width: 40,
    tilt: 1,
  },
  {
    title: 'Mukagali Poems',
    spine: '#B5763A',
    spineEdge: '#8A5620',
    text: '#FFF3E4',
    width: 46,
    tilt: -2,
  },
];

export default function Books() {
  return (
    <div className={styles.shelf}>
      <div className={styles.books}>
        {books.map((book) => (
          <div
            key={book.title}
            className={styles.book}
            style={{
              width: book.width,
              transform: `rotate(${book.tilt}deg)`,
              background: `linear-gradient(to right, ${book.spineEdge} 0%, ${book.spine} 18%, ${book.spine} 82%, ${book.spineEdge} 100%)`,
            }}
            title={book.title}
          >
            <span className={styles.bookTitle} style={{ color: book.text }}>
              {book.title}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.shelfBoard} />
    </div>
  );
}
