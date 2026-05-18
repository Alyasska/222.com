import styles from './Books.module.css';

const books = [
  {
    title: 'The Unbearable Lightness of Being',
    author: 'Kundera',
    spine: '#8B6F8E',
    spineEdge: '#6B4F6E',
    text: '#F0E8F0',
    width: 28,
  },
  {
    title: 'To the Lighthouse',
    author: 'Woolf',
    spine: '#4A6F8A',
    spineEdge: '#2A4F6A',
    text: '#E8F0F8',
    width: 22,
  },
  {
    title: 'Poems by Mukagali Makatayev',
    author: 'Makatayev',
    spine: '#B5763A',
    spineEdge: '#8A5620',
    text: '#FDF0E0',
    width: 25,
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
              background: `linear-gradient(to right, ${book.spineEdge} 0%, ${book.spine} 18%, ${book.spine} 82%, ${book.spineEdge} 100%)`,
            }}
          >
            <span
              className={styles.bookTitle}
              style={{ color: book.text }}
            >
              {book.title}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.shelfBoard} />
    </div>
  );
}
