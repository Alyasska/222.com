import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const FLIP_EASE = [0.25, 0.1, 0.25, 1.0];
const FLIP_MS   = 950;

function BlankPage({ height }) {
  return <div className="book-blank-page" style={{ height }} />;
}

export default function BookReader({ book, onClose }) {
  const [numPages, setNumPages]   = useState(null);
  const [spread, setSpread]       = useState(0);
  const [flipDir, setFlipDir]     = useState(null);
  const [hoverZone, setHoverZone] = useState(null); // "left" | "right" | null

  useEffect(() => { setSpread(0); setNumPages(null); setFlipDir(null); }, [book.pdfPath]);

  const maxSpread = numPages ? Math.ceil(numPages / 2) - 1 : 0;

  const leftNum  = spread === 0 ? null : spread * 2;
  const rightNum = spread * 2 + 1;

  const underLeft  = flipDir === -1 ? (spread - 1 === 0 ? null : (spread - 1) * 2) : leftNum;
  const underRight = flipDir ===  1 ? (spread + 1) * 2 + 1                         : rightNum;

  const frontPage = flipDir ===  1 ? rightNum
                  : flipDir === -1 ? leftNum
                  : null;
  const backPage  = flipDir ===  1 ? (spread + 1) * 2
                  : flipDir === -1 ? (spread - 1) * 2 + 1
                  : null;

  // Pages to silently preload (rendered off-screen)
  const preloadPages = [];
  if (numPages) {
    const nextRight = (spread + 1) * 2 + 1;
    const nextLeft  = (spread + 1) * 2;
    const prevLeft  = spread > 1 ? (spread - 1) * 2 : null;
    const prevRight = spread > 0 ? (spread - 1) * 2 + 1 : null;
    [nextLeft, nextRight, prevLeft, prevRight].forEach(n => {
      if (n && n >= 1 && n <= numPages) preloadPages.push(n);
    });
  }

  function flip(dir) {
    if (flipDir !== null) return;
    if (dir ===  1 && spread >= maxSpread) return;
    if (dir === -1 && spread <= 0)         return;
    setFlipDir(dir);
    setTimeout(() => { setSpread(s => s + dir); setFlipDir(null); }, FLIP_MS);
  }

  useEffect(() => {
    function onKey(e) {
      if      (e.key === "ArrowRight" || e.key === "PageDown") flip(1);
      else if (e.key === "ArrowLeft"  || e.key === "PageUp")   flip(-1);
      else if (e.key === "Escape")                              onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const pH = Math.min(window.innerHeight * 0.73, 680);

  function renderPage(n, key, textLayer = true) {
    if (!n || n < 1 || (numPages && n > numPages)) return <BlankPage key={key} height={pH} />;
    return (
      <Page
        key={key}
        pageNumber={n}
        height={pH}
        renderAnnotationLayer={false}
        renderTextLayer={textLayer}
      />
    );
  }

  const canFlipLeft  = flipDir === null && spread > 0;
  const canFlipRight = flipDir === null && spread < maxSpread;

  const label = numPages
    ? `${leftNum ?? 1}–${Math.min(rightNum, numPages)} / ${numPages}`
    : "—";

  return (
    <>
      <motion.div className="book-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }} onClick={onClose}
      />

      <motion.div
        className="book-reader"
        style={{ x: "-50%", y: "-50%" }}
        initial={{ scale: 0.07, opacity: 0, y: "calc(-50% + 30vh)" }}
        animate={{ scale: 1,    opacity: 1, y: "-50%" }}
        exit={{    scale: 0.07, opacity: 0, y: "calc(-50% + 30vh)" }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="book-close" onClick={onClose} aria-label="Close">×</button>

        <Document
          file={book.pdfPath}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            <div className="book-spread book-spread-loading">
              <div className="book-loading-inner">Opening book…</div>
            </div>
          }
          error={
            <div className="book-spread book-spread-loading">
              <div className="book-loading-inner">Could not load PDF.</div>
            </div>
          }
        >
          {/* Silent preload of adjacent pages */}
          {preloadPages.map(n => (
            <div key={`pre-${n}`} style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0, overflow: "hidden" }}>
              <Page pageNumber={n} height={pH} renderAnnotationLayer={false} renderTextLayer={false} />
            </div>
          ))}

          {/* Spread + flip card */}
          <div className="book-spread-wrapper">

            {/* Static pages underneath */}
            <div className="book-spread">
              <div className="book-page-side book-page-left">
                {renderPage(underLeft, `ul-${underLeft}`)}
              </div>
              <div className="book-spine" />
              <div className="book-page-side book-page-right">
                {renderPage(underRight, `ur-${underRight}`)}
              </div>
            </div>

            {/* Flip card */}
            <AnimatePresence>
              {flipDir !== null && (
                <motion.div
                  className={`flip-card ${flipDir > 0 ? "flip-fwd" : "flip-bwd"}`}
                  style={{ transformPerspective: 1400 }}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: flipDir > 0 ? -180 : 180 }}
                  exit={{ rotateY: flipDir > 0 ? -180 : 180 }}
                  transition={{ duration: FLIP_MS / 1000, ease: FLIP_EASE }}
                >
                  <div className="flip-face flip-front-face">
                    {renderPage(frontPage, `ff-${frontPage}`, false)}
                    <div className={`flip-shadow ${flipDir > 0 ? "fshadow-fwd-front" : "fshadow-bwd-front"}`} />
                  </div>
                  <div className="flip-face flip-back-face">
                    {renderPage(backPage, `fb-${backPage}`, false)}
                    <div className={`flip-shadow ${flipDir > 0 ? "fshadow-fwd-back" : "fshadow-bwd-back"}`} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clickable page zones — go back (left) or forward (right) */}
            {canFlipLeft && (
              <div
                className={`book-click-zone book-click-left${hoverZone === "left" ? " hinting" : ""}`}
                onClick={() => flip(-1)}
                onMouseEnter={() => setHoverZone("left")}
                onMouseLeave={() => setHoverZone(null)}
              >
                <span className="book-click-arrow">‹</span>
              </div>
            )}
            {canFlipRight && (
              <div
                className={`book-click-zone book-click-right${hoverZone === "right" ? " hinting" : ""}`}
                onClick={() => flip(1)}
                onMouseEnter={() => setHoverZone("right")}
                onMouseLeave={() => setHoverZone(null)}
              >
                <span className="book-click-arrow">›</span>
              </div>
            )}
          </div>
        </Document>

        {/* Page counter only */}
        <div className="book-controls">
          <span className="book-page-label">{label}</span>
        </div>
      </motion.div>
    </>
  );
}
