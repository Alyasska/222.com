import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PosterZoom from "./PosterZoom";

const POSTERS = [
  {
    title: "AMÉLIE", year: "2001", img: "posters/amelie-print.png",
    pA: "#9e1a1a", pB: "#4a0808", accent: "#f4c030", accentX: "50%", accentY: "58%",
    style: { left: "12vw", top: "28vh", width: "9vh", height: "13vh", transform: "rotate(-5deg)" },
  },
  {
    title: "BLACK MIRROR", year: "2011", img: "posters/black-mirror-print.png",
    pA: "#0d0d14", pB: "#050508", accent: "#38e8ff", accentX: "50%", accentY: "48%",
    style: { left: "3vw", top: "26vh", width: "9vh", height: "13vh", transform: "rotate(5deg)" },
  },
  {
    title: "THE PERKS OF BEING A WALLFLOWER", year: "2012", img: "posters/wallflower-print.png",
    pA: "#0e1928", pB: "#06101a", accent: "#ffd060", accentX: "50%", accentY: "32%",
    style: { right: "3vw", top: "26vh", width: "9vh", height: "13vh", transform: "rotate(3deg)" },
  },
  {
    title: "INSIDE JOB", year: "2010", img: "posters/inside-job-print.png",
    pA: "#0d1520", pB: "#060c14", accent: "#c8a840", accentX: "50%", accentY: "40%",
    style: { left: "22vw", top: "27vh", width: "9vh", height: "13vh", transform: "rotate(-3deg)" },
  },
  {
    title: "HAMILTON", year: "2020", img: "posters/hamilton-print.png",
    pA: "#16100a", pB: "#0a0604", accent: "#d4a060", accentX: "50%", accentY: "35%",
    style: { right: "13vw", top: "28vh", width: "9vh", height: "13vh", transform: "rotate(4deg)" },
  },
];

export default function FilmPosters() {
  const [zoomedPoster, setZoomedPoster] = useState(null);

  return (
    <>
      <div className="posters" aria-hidden="true">
        {POSTERS.map((p, i) => (
          <motion.div
            key={i}
            className="poster"
            style={{
              ...p.style,
              "--p-a": p.pA,
              "--p-b": p.pB,
              "--accent": p.accent,
              "--accent-x": p.accentX,
              "--accent-y": p.accentY,
            }}
            animate={{ opacity: zoomedPoster?.index === i ? 0 : 1 }}
            whileHover={zoomedPoster ? {} : { scale: 1.1, zIndex: 9 }}
            onClick={() => !zoomedPoster && setZoomedPoster({ ...p, index: i })}
            transition={{ duration: 0.15 }}
          >
            <img
              className="poster-img"
              src={p.img}
              alt=""
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <div className="p-inner">
              <div className="p-title">{p.title}</div>
              <div className="p-sub">{p.year}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {zoomedPoster && (
          <PosterZoom
            key="zoom"
            poster={zoomedPoster}
            onClose={() => setZoomedPoster(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
