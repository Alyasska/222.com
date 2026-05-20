import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const FLIP_EASE = [0.25, 0.1, 0.25, 1.0];
const FLIP_MS   = 900;

function LoadProgress() {
  return (
    <div className="book-load-wrap">
      <div className="book-load-title">Opening book…</div>
      <div className="book-load-bar-track">
        <motion.div
          className="book-load-bar-fill"
          initial={{ width: "0%" }}
          animate={{ width: "60%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function BookReader({ book, onClose }) {
  const [phase, setPhase]       = useState("loading"); // loading | ready | error
  const [spread, setSpread]     = useState(0);
  const [flipDir, setFlipDir]   = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [cacheVer, setCacheVer] = useState(0); // bumped on each new cached page

  const pageCache   = useRef({}); // pageNum -> object URL
  const pdfRef      = useRef(null);
  const pendingFlip = useRef(null);
  const cancelRef   = useRef(false);

  const pH = Math.min(window.innerHeight * 0.72, 660);

  // ── Render one page → JPEG blob URL ────────────────────────────────────────
  async function renderOnePage(pdf, n) {
    if (pageCache.current[n]) return;
    const page = await pdf.getPage(n);
    const dpr  = window.devicePixelRatio || 1;
    const vp1  = page.getViewport({ scale: 1 });
    const scale = (pH * dpr) / vp1.height;
    const vp   = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width  = Math.round(vp.width);
    canvas.height = Math.round(vp.height);
    await page.render({ canvasContext: canvas.getContext("2d"), viewport: vp }).promise;
    await new Promise(res =>
      canvas.toBlob(blob => { pageCache.current[n] = URL.createObjectURL(blob); res(); }, "image/jpeg", 0.88)
    );
  }

  // ── Load + progressive render ───────────────────────────────────────────────
  useEffect(() => {
    cancelRef.current = false;
    pageCache.current = {};
    setCacheVer(0);
    setPhase("loading");
    setSpread(0);
    setFlipDir(null);
    setNumPages(0);
    pendingFlip.current = null;

    (async () => {
      try {
        const pdf = await pdfjsLib.getDocument(book.pdfPath).promise;
        if (cancelRef.current) return;
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);

        // Render page 1 first so the book opens quickly
        await renderOnePage(pdf, 1);
        if (cancelRef.current) return;
        setCacheVer(v => v + 1);
        setPhase("ready");

        // Render all remaining pages in background
        for (let n = 2; n <= pdf.numPages; n++) {
          if (cancelRef.current) return;
          await renderOnePage(pdf, n);
          setCacheVer(v => v + 1);
        }
      } catch {
        if (!cancelRef.current) setPhase("error");
      }
    })();

    return () => {
      cancelRef.current = true;
      Object.values(pageCache.current).forEach(u => URL.revokeObjectURL(u));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book.pdfPath]);

  // ── Spread → page numbers ───────────────────────────────────────────────────
  const maxSpread  = numPages ? Math.ceil(numPages / 2) - 1 : 0;
  const leftNum    = spread === 0 ? null : spread * 2;
  const rightNum   = spread * 2 + 1;

  const underLeft  = flipDir === -1 ? (spread - 1 === 0 ? null : (spread - 1) * 2) : leftNum;
  const underRight = flipDir ===  1 ? (spread + 1) * 2 + 1                          : rightNum;
  const frontPage  = flipDir ===  1 ? rightNum            : flipDir === -1 ? leftNum            : null;
  const backPage   = flipDir ===  1 ? (spread + 1) * 2    : flipDir === -1 ? (spread - 1) * 2 + 1 : null;

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function isReady(n) {
    if (!n || n < 1 || n > numPages) return true; // blank page counts as ready
    return !!pageCache.current[n];
  }

  function neededForFlip(dir) {
    if (dir === 1) {
      return [(spread + 1) * 2, (spread + 1) * 2 + 1].filter(n => n >= 1 && n <= numPages);
    }
    const l = spread - 1 === 0 ? null : (spread - 1) * 2;
    const r = (spread - 1) * 2 + 1;
    return [l, r].filter(n => n && n >= 1 && n <= numPages);
  }

  function executeFlip(dir) {
    pendingFlip.current = null;
    setFlipDir(dir);
    setTimeout(() => { setSpread(s => s + dir); setFlipDir(null); }, FLIP_MS);
  }

  function flip(dir) {
    if (flipDir !== null) return;
    if (dir ===  1 && spread >= maxSpread) return;
    if (dir === -1 && spread <= 0)         return;
    const needed = neededForFlip(dir);
    if (needed.every(n => isReady(n))) {
      executeFlip(dir);
    } else {
      pendingFlip.current = dir; // fires in the effect below once pages are ready
    }
  }

  // Fire pending flip as soon as its pages become cached
  useEffect(() => {
    if (pendingFlip.current === null || flipDir !== null) return;
    const dir    = pendingFlip.current;
    const needed = neededForFlip(dir);
    if (needed.every(n => isReady(n))) executeFlip(dir);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheVer, flipDir]);

  // ── Keyboard ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    function onKey(e) {
      if      (e.key === "ArrowRight" || e.key === "PageDown") flip(1);
      else if (e.key === "ArrowLeft"  || e.key === "PageUp")   flip(-1);
      else if (e.key === "Escape")                              onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // ── Page image element ────────────────────────────────────────────────────────
  function renderPageImg(n, key) {
    const src = n && n >= 1 && n <= numPages ? pageCache.current[n] : null;
    if (!src) return <div key={key} className="book-blank-page" style={{ height: pH }} />;
    return (
      <img
        key={key}
        src={src}
        alt=""
        className="book-page-img"
        style={{ height: pH, width: "auto", display: "block" }}
        draggable={false}
      />
    );
  }

  const canFlipLeft  = flipDir === null && phase === "ready" && spread > 0;
  const canFlipRight = flipDir === null && phase === "ready" && spread < maxSpread;
  const ox = book.originX ?? 0;
  const oy = book.originY ?? 0;

  return (
    <>
      <motion.div
        className="book-overlay"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      <motion.div
        className="book-reader"
        initial={{ scale: 0.06, x: `calc(-50% + ${ox}px)`, y: `calc(-50% + ${oy}px)`, opacity: 0 }}
        animate={{ scale: 1,    x: "-50%",                   y: "-50%",                  opacity: 1 }}
        exit={{    scale: 0.06, x: `calc(-50% + ${ox}px)`, y: `calc(-50% + ${oy}px)`, opacity: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 24, mass: 1.0 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="book-close" onClick={onClose} aria-label="Close">×</button>

        {phase === "loading" && (
          <div className="book-spread book-spread-loading">
            <LoadProgress />
          </div>
        )}

        {phase === "error" && (
          <div className="book-spread book-spread-loading">
            <div className="book-load-wrap">
              <div className="book-load-title" style={{ color: "#8a3a3a" }}>Could not load PDF.</div>
            </div>
          </div>
        )}

        {phase === "ready" && (
          <div className="book-spread-wrapper">
            {/* Static pages underneath */}
            <div className="book-spread">
              <div className="book-page-side book-page-left">
                {renderPageImg(underLeft,  `ul-${underLeft}`)}
              </div>
              <div className="book-spine" />
              <div className="book-page-side book-page-right">
                {renderPageImg(underRight, `ur-${underRight}`)}
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
                    {renderPageImg(frontPage, `ff-${frontPage}`)}
                    <div className={`flip-shadow ${flipDir > 0 ? "fshadow-fwd-front" : "fshadow-bwd-front"}`} />
                  </div>
                  <div className="flip-face flip-back-face">
                    {renderPageImg(backPage, `fb-${backPage}`)}
                    <div className={`flip-shadow ${flipDir > 0 ? "fshadow-fwd-back" : "fshadow-bwd-back"}`} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Invisible click zones — no arrows, no hover hints */}
            {canFlipLeft  && <div className="book-click-zone book-click-left"  onClick={() => flip(-1)} />}
            {canFlipRight && <div className="book-click-zone book-click-right" onClick={() => flip(1)}  />}
          </div>
        )}
      </motion.div>
    </>
  );
}
