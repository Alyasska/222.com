import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookReader from "./BookReader";

const SCATTER_BOOKS = [
  {
    title: "Mukagali Öleñderi",
    coverImage: "/222.com/covers/mukagali.png",
    pdfPath: "/222.com/books/mukagali.pdf",
    a: "#7a3a2a", b: "#3a1808",
    rotation: -12,
    style: { left: "6vw", bottom: "8vh", width: "12vh", height: "17vh" },
  },
  {
    title: "The Unbearable Lightness of Being",
    coverImage: "/222.com/covers/lightness.png",
    pdfPath: "/222.com/books/lightness.pdf",
    a: "#2a3a58", b: "#0e1828",
    rotation: 20,
    style: { left: "17vw", bottom: "18vh", width: "12vh", height: "17vh" },
  },
  {
    title: "To the Lighthouse",
    coverImage: "/222.com/covers/lighthouse.png",
    pdfPath: "/222.com/books/lighthouse.pdf",
    a: "#5a2838", b: "#200810",
    rotation: 8,
    style: { right: "19vw", bottom: "6vh", width: "12vh", height: "17vh" },
  },
];

export default function Books() {
  const [openBook, setOpenBook] = useState(null);
  const refs = useRef({});

  function handleClick(b, i) {
    if (openBook) return;
    const el = refs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const originX = rect.left + rect.width  / 2 - window.innerWidth  / 2;
    const originY = rect.top  + rect.height / 2 - window.innerHeight / 2;
    setOpenBook({ ...b, index: i, originX, originY });
  }

  return (
    <>
      {SCATTER_BOOKS.map((b, i) => (
        <motion.div
          key={i}
          ref={el => (refs.current[i] = el)}
          className="scatter-book"
          style={{
            ...b.style,
            "--book-a": b.a,
            "--book-b": b.b,
            rotate: b.rotation,
          }}
          animate={{ opacity: openBook?.index === i ? 0 : 1 }}
          whileHover={openBook ? {} : {
            scale: 1.07,
            y: -6,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          whileTap={openBook ? {} : { scale: 0.95, transition: { duration: 0.08 } }}
          onClick={() => handleClick(b, i)}
          transition={{ opacity: { duration: 0.15 } }}
        >
          {b.coverImage && (
            <img
              src={b.coverImage}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "0.5vh",
              }}
            />
          )}
          <div className="title">{b.title}</div>
        </motion.div>
      ))}

      <AnimatePresence>
        {openBook && (
          <BookReader
            key="reader"
            book={openBook}
            onClose={() => setOpenBook(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
