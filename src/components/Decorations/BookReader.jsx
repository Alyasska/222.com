import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function Spinner() {
  return (
    <div className="book-spread book-spread-loading">
      <div className="book-loading-inner">Opening book…</div>
    </div>
  );
}

export default function BookReader({ book, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [spreadIndex, setSpreadIndex] = useState(0);

  useEffect(() => {
    setSpreadIndex(0);
    setNumPages(null);
  }, [book.pdfPath]);

  const maxSpread = numPages ? Math.ceil(numPages / 2) - 1 : 0;
  const leftPageNum = spreadIndex === 0 ? null : spreadIndex * 2;
  const rightPageNum = spreadIndex * 2 + 1;

  function prev() { if (spreadIndex > 0) setSpreadIndex((s) => s - 1); }
  function next() { if (spreadIndex < maxSpread) setSpreadIndex((s) => s + 1); }

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight" || e.key === "PageDown") next();
      else if (e.key === "ArrowLeft" || e.key === "PageUp") prev();
      else if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const pageH = Math.min(window.innerHeight * 0.73, 680);

  const pageLabel = numPages
    ? `${leftPageNum ?? 1}–${Math.min(rightPageNum, numPages)} / ${numPages}`
    : "—";

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
        <button className="book-close" onClick={onClose} aria-label="Close">×</button>

        <Document
          file={book.pdfPath}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<Spinner />}
          error={<div className="book-spread book-spread-loading"><div className="book-loading-inner">Could not load PDF.</div></div>}
        >
          <motion.div
            className="book-spread"
            style={{ transformPerspective: 1400, rotateX: 2 }}
          >
            {/* Left page */}
            <div className="book-page-side book-page-left">
              {leftPageNum ? (
                <Page
                  key={`L${leftPageNum}`}
                  pageNumber={leftPageNum}
                  height={pageH}
                  renderAnnotationLayer={false}
                  renderTextLayer={true}
                />
              ) : (
                <div className="book-blank-page" style={{ height: pageH }} />
              )}
            </div>

            {/* Spine */}
            <div className="book-spine" />

            {/* Right page */}
            <div className="book-page-side book-page-right">
              {rightPageNum <= (numPages ?? Infinity) ? (
                <Page
                  key={`R${rightPageNum}`}
                  pageNumber={rightPageNum}
                  height={pageH}
                  renderAnnotationLayer={false}
                  renderTextLayer={true}
                />
              ) : (
                <div className="book-blank-page" style={{ height: pageH }} />
              )}
            </div>
          </motion.div>
        </Document>

        {/* Controls */}
        <div className="book-controls">
          <button className="book-nav-btn" onClick={prev} disabled={spreadIndex === 0}>‹</button>
          <span className="book-page-label">{pageLabel}</span>
          <button className="book-nav-btn" onClick={next} disabled={spreadIndex >= maxSpread}>›</button>
        </div>
      </motion.div>
    </>
  );
}
