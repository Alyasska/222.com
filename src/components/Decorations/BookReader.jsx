import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function BookReader({ book, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [slideDir, setSlideDir] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevPage = useRef(1);

  useEffect(() => {
    setCurrentPage(1);
    setNumPages(null);
    setSlideDir(0);
  }, [book.pdfPath]);

  function goToPage(delta) {
    if (isAnimating) return;
    const next = currentPage + delta;
    if (next < 1 || (numPages !== null && next > numPages)) return;
    setSlideDir(delta);
    setIsAnimating(true);
    prevPage.current = currentPage;
    setCurrentPage(next);
    setTimeout(() => setIsAnimating(false), 260);
  }

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight" || e.key === "PageDown") goToPage(1);
      else if (e.key === "ArrowLeft" || e.key === "PageUp") goToPage(-1);
      else if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const pageHeight = Math.min(window.innerHeight * 0.72, 760);

  return (
    <>
      <motion.div
        className="book-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={onClose}
      />

      <motion.div
        className="book-reader"
        style={{ x: "-50%", y: "-50%" }}
        initial={{ scale: 0.08, opacity: 0, y: "calc(-50% + 28vh)" }}
        animate={{ scale: 1, opacity: 1, y: "-50%" }}
        exit={{ scale: 0.08, opacity: 0, y: "calc(-50% + 28vh)" }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="book-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="book-title-bar">{book.title}</div>

        <div className="book-page-area">
          <button
            className="book-nav-btn"
            onClick={() => goToPage(-1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
          >
            ‹
          </button>

          <div className="book-page-wrap">
            <Document
              file={book.pdfPath}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={<div className="book-loading">Loading book…</div>}
              error={<div className="book-loading">Could not load PDF.</div>}
            >
              <div
                className="book-page-clip"
                style={{
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <motion.div
                  key={currentPage}
                  initial={{
                    x: slideDir === 0 ? 0 : slideDir > 0 ? "22%" : "-22%",
                    opacity: slideDir === 0 ? 1 : 0,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                >
                  <Page
                    pageNumber={currentPage}
                    height={pageHeight}
                    renderAnnotationLayer={false}
                    renderTextLayer={true}
                  />
                </motion.div>
              </div>
            </Document>
          </div>

          <button
            className="book-nav-btn"
            onClick={() => goToPage(1)}
            disabled={numPages !== null && currentPage >= numPages}
            aria-label="Next page"
          >
            ›
          </button>
        </div>

        <div className="book-footer">
          {numPages ? `${currentPage} / ${numPages}` : "—"}
        </div>
      </motion.div>
    </>
  );
}
