import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const FLIP_EASE = [0.25, 0.1, 0.25, 1.0];
const FLIP_MS   = 900;

// ─── Blank page placeholder ────────────────────────────────────────────────
function BlankPage({ height }) {
  return <div className="book-blank-page" style={{ height }} />;
}

// ─── Loading progress bar ──────────────────────────────────────────────────
function LoadProgress({ pct }) {
  return (
    <div className="book-load-wrap">
      <div className="book-load-title">Opening book…</div>
      <div className="book-load-bar-track">
        <motion.div
          className="book-load-bar-fill"
          initial={{ width: "0%" }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      <div className="book-load-pct">{Math.round(pct)}%</div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function BookReader({ book, onClose }) {
  const [numPages, setNumPages]     = useState(null);
  const [spread, setSpread]         = useState(0);
  const [flipDir, setFlipDir]       = useState(null);
  const [hoverZone, setHoverZone]   = useState(null);
  const [loadPct, setLoadPct]       = useState(0);
  const [waiting, setWaiting]       = useState(false);   // user clicked but pages not ready

  // Track which page numbers have finished rendering
  const renderedSet  = useRef(new Set());
  const pendingFlip  = useRef(null);

  useEffect(() => {
    setSpread(0);
    setNumPages(null);
    setFlipDir(null);
    setLoadPct(0);
    setWaiting(false);
    renderedSet.current.clear();
    pendingFlip.current = null;
  }, [book.pdfPath]);

  const maxSpread = numPages ? Math.ceil(numPages / 2) - 1 : 0;

  // ── Spread → page numbers ────────────────────────────────────────────────
  const leftNum  = spread === 0 ? null : spread * 2;
  const rightNum = spread * 2 + 1;

  const underLeft  = flipDir === -1 ? (spread - 1 === 0 ? null : (spread - 1) * 2) : leftNum;
  const underRight = flipDir ===  1 ? (spread + 1) * 2 + 1                          : rightNum;

  const frontPage = flipDir ===  1 ? rightNum            : flipDir === -1 ? leftNum            : null;
  const backPage  = flipDir ===  1 ? (spread + 1) * 2    : flipDir === -1 ? (spread - 1) * 2 + 1 : null;

  // Pages to silently prerender (current ±1 spreads)
  const preloadPages = [];
  if (numPages) {
    const candidates = [
      (spread + 1) * 2,     (spread + 1) * 2 + 1,
      spread > 1 ? (spread - 1) * 2 : null,
      spread > 0 ? (spread - 1) * 2 + 1 : null,
    ];
    candidates.forEach(n => {
      if (n && n >= 1 && n <= numPages && !renderedSet.current.has(n)) preloadPages.push(n);
    });
  }

  // ── Anti-blink: which pages do we need to start a flip ──────────────────
  function neededForFlip(dir) {
    if (!numPages) return [];
    if (dir === 1) {
      return [(spread + 1) * 2, (spread + 1) * 2 + 1].filter(n => n >= 1 && n <= numPages);
    } else {
      const l = spread - 1 === 0 ? null : (spread - 1) * 2;
      const r = (spread - 1) * 2 + 1;
      return [l, r].filter(n => n && n >= 1 && n <= numPages);
    }
  }

  function executeFlip(dir) {
    setWaiting(false);
    setFlipDir(dir);
    setTimeout(() => { setSpread(s => s + dir); setFlipDir(null); }, FLIP_MS);
  }

  function tryPending() {
    const dir = pendingFlip.current;
    if (dir === null || flipDir !== null) return;
    const needed = neededForFlip(dir);
    if (needed.every(n => renderedSet.current.has(n))) {
      pendingFlip.current = null;
      executeFlip(dir);
    }
  }

  const markReady = useCallback((n) => {
    renderedSet.current.add(n);
    tryPending();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spread, flipDir, numPages]);

  function flip(dir) {
    if (flipDir !== null || waiting) return;
    if (dir ===  1 && spread >= maxSpread) return;
    if (dir === -1 && spread <= 0)         return;

    const needed = neededForFlip(dir);
    if (needed.every(n => renderedSet.current.has(n))) {
      executeFlip(dir);
    } else {
      // Queue: will fire in markReady once preloads finish
      pendingFlip.current = dir;
      setWaiting(true);
    }
  }

  // ── Keyboard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e) {
      if      (e.key === "ArrowRight" || e.key === "PageDown") flip(1);
      else if (e.key === "ArrowLeft"  || e.key === "PageUp")   flip(-1);
      else if (e.key === "Escape")                              onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // ── Page dimensions ───────────────────────────────────────────────────────
  const pH = Math.min(window.innerHeight * 0.72, 660);

  function renderPage(n, key, textLayer = true) {
    if (!n || n < 1 || (numPages && n > numPages)) {
      return <BlankPage key={key} height={pH} />;
    }
    return (
      <Page
        key={key}
        pageNumber={n}
        height={pH}
        renderAnnotationLayer={false}
        renderTextLayer={textLayer}
        onRenderSuccess={() => markReady(n)}
      />
    );
  }

  // ── Derived flags ─────────────────────────────────────────────────────────
  const canFlipLeft  = !waiting && flipDir === null && spread > 0;
  const canFlipRight = !waiting && flipDir === null && spread < maxSpread;

  const label = numPages
    ? `${leftNum ?? 1} – ${Math.min(rightNum, numPages)}  /  ${numPages}`
    : "—";

  // ── Fly-in origin from the book's desk position ───────────────────────────
  const ox = book.originX ?? 0;
  const oy = book.originY ?? 0;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="book-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Book reader — flies in from book's actual desk position */}
      <motion.div
        className="book-reader"
        initial={{ scale: 0.06, x: `calc(-50% + ${ox}px)`, y: `calc(-50% + ${oy}px)`, opacity: 0 }}
        animate={{ scale: 1,    x: "-50%",                   y: "-50%",                  opacity: 1 }}
        exit={{    scale: 0.06, x: `calc(-50% + ${ox}px)`, y: `calc(-50% + ${oy}px)`, opacity: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 24, mass: 1.0 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="book-close" onClick={onClose} aria-label="Close">×</button>

        <Document
          file={book.pdfPath}
          onLoadSuccess={({ numPages }) => { setNumPages(numPages); setLoadPct(100); }}
          onProgress={({ loaded, total }) => total > 0 && setLoadPct((loaded / total) * 100)}
          loading={
            <div className="book-spread book-spread-loading">
              <LoadProgress pct={loadPct} />
            </div>
          }
          error={
            <div className="book-spread book-spread-loading">
              <div className="book-load-wrap">
                <div className="book-load-title" style={{ color: "#8a3a3a" }}>Could not load PDF.</div>
              </div>
            </div>
          }
        >
          {/* Silent preload of adjacent pages */}
          {preloadPages.map(n => (
            <div
              key={`pre-${n}`}
              style={{ position: "absolute", opacity: 0, pointerEvents: "none",
                       width: 0, height: 0, overflow: "hidden" }}
            >
              <Page
                pageNumber={n}
                height={pH}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                onRenderSuccess={() => markReady(n)}
              />
            </div>
          ))}

          {/* ── Spread ───────────────────────────────────────────────── */}
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

            {/* Clickable page halves */}
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

            {/* Waiting indicator (pages still preloading) */}
            <AnimatePresence>
              {waiting && (
                <motion.div
                  className="book-wait-hint"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  loading page…
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Document>

        {/* Page counter */}
        <div className="book-controls">
          <span className="book-page-label">{label}</span>
        </div>
      </motion.div>
    </>
  );
}
