import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PosterZoom from "./PosterZoom";

const POSTERS = [
  {
    title: "AMÉLIE", year: "2001", img: "posters/amelie-print.png",
    pA: "#9e1a1a", pB: "#4a0808", accent: "#f4c030", accentX: "50%", accentY: "58%",
    rotation: -5,
    pos: { left: "12vw", top: "28vh", width: "9vh", height: "13vh" },
  },
  {
    title: "BLACK MIRROR", year: "2011", img: "posters/black-mirror-print.png",
    pA: "#0d0d14", pB: "#050508", accent: "#38e8ff", accentX: "50%", accentY: "48%",
    rotation: 5,
    pos: { left: "3vw", top: "26vh", width: "9vh", height: "13vh" },
  },
  {
    title: "THE PERKS OF BEING A WALLFLOWER", year: "2012", img: "posters/wallflower-print.png",
    pA: "#0e1928", pB: "#06101a", accent: "#ffd060", accentX: "50%", accentY: "32%",
    rotation: 3,
    pos: { right: "3vw", top: "26vh", width: "9vh", height: "13vh" },
  },
  {
    title: "INSIDE JOB", year: "2010", img: "posters/inside-job-print.png",
    pA: "#0d1520", pB: "#060c14", accent: "#c8a840", accentX: "50%", accentY: "40%",
    rotation: -3,
    pos: { left: "22vw", top: "27vh", width: "9vh", height: "13vh" },
  },
  {
    title: "HAMILTON", year: "2020", img: "posters/hamilton-print.png",
    pA: "#16100a", pB: "#0a0604", accent: "#d4a060", accentX: "50%", accentY: "35%",
    rotation: 4,
    pos: { right: "13vw", top: "28vh", width: "9vh", height: "13vh" },
  },
];

export default function FilmPosters() {
  const [zoomed, setZoomed] = useState(null);
  const refs = useRef({});

  function handleClick(p, i) {
    if (zoomed) return;
    const el = refs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const originX = rect.left + rect.width  / 2 - window.innerWidth  / 2;
    const originY = rect.top  + rect.height / 2 - window.innerHeight / 2;
    setZoomed({ ...p, index: i, originX, originY });
  }

  return (
    <>
      <div className="posters" aria-hidden="true">
        {POSTERS.map((p, i) => (
          <motion.div
            key={i}
            ref={el => (refs.current[i] = el)}
            className="poster"
            style={{
              ...p.pos,
              "--p-a":      p.pA,
              "--p-b":      p.pB,
              "--accent":   p.accent,
              "--accent-x": p.accentX,
              "--accent-y": p.accentY,
              rotate: p.rotation,
              originX: "50%",
              originY: "0%",
            }}
            animate={{ opacity: zoomed?.index === i ? 0 : 1 }}
            whileHover={zoomed ? {} : {
              scale: 1.14,
              rotate: 0,
              y: -5,
              filter: "brightness(1.18) saturate(1.1)",
              zIndex: 9,
              transition: { type: "spring", stiffness: 280, damping: 18 },
            }}
            whileTap={zoomed ? {} : {
              scale: 0.96,
              transition: { duration: 0.08 },
            }}
            onClick={() => handleClick(p, i)}
            transition={{ opacity: { duration: 0.15 } }}
          >
            <img
              className="poster-img"
              src={p.img}
              alt=""
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="p-inner" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {zoomed && (
          <PosterZoom key="zoom" poster={zoomed} onClose={() => setZoomed(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
