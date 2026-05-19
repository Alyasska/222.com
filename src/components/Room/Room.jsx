import { useState, useEffect, useRef, useCallback } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { songs } from "../../data/songs.js";
import Shelf from "../Shelf/Shelf.jsx";
import VinylPlayer from "../VinylPlayer/VinylPlayer.jsx";
import Books from "../Decorations/Books.jsx";
import Mug from "../Decorations/Mug.jsx";
import FairyLights from "../Decorations/FairyLights.jsx";
import FilmPosters from "../Decorations/FilmPosters.jsx";
import TableDecor from "../Decorations/TableDecor.jsx";
import SecretCode from "../SecretCode/SecretCode.jsx";
import YouTubeHost from "../VinylPlayer/YouTubeHost.jsx";
import { useVinylAudio } from "../../hooks/useVinylAudio.js";

export default function Room() {
  const [selectedId, setSelectedId] = useState(null);
  const [readySongId, setReadySongId] = useState(null);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [secretBursting, setSecretBursting] = useState(false);
  const [brightMode, setBrightMode] = useState(false);
  const swapTimer = useRef(null);

  const activeSong = songs.find((s) => s.id === selectedId);
  const spinning = Boolean(activeSong) && readySongId === activeSong.id;

  useVinylAudio(spinning && !!activeSong);

  useEffect(() => {
    clearTimeout(swapTimer.current);
    if (!activeSong) return;
    swapTimer.current = setTimeout(() => setReadySongId(activeSong.id), 900);
    return () => clearTimeout(swapTimer.current);
  }, [activeSong]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--ambient",
      activeSong ? activeSong.color : "#6a8a2e"
    );
  }, [activeSong]);

  const handleSelect = useCallback((id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const handlePrev = useCallback(() => {
    const visible = songs.filter((s) => !s.secret || secretUnlocked);
    if (!visible.length) return;
    const idx = visible.findIndex((s) => s.id === selectedId);
    const prev = visible[(idx - 1 + visible.length) % visible.length];
    setSelectedId(prev.id);
    setReadySongId(null);
  }, [selectedId, secretUnlocked]);

  const handleNext = useCallback(() => {
    const visible = songs.filter((s) => !s.secret || secretUnlocked);
    if (!visible.length) return;
    const idx = visible.findIndex((s) => s.id === selectedId);
    const next = visible[(idx + 1) % visible.length];
    setSelectedId(next.id);
    setReadySongId(null);
  }, [selectedId, secretUnlocked]);

  const handleSecret = useCallback(() => {
    setSecretUnlocked(true);
    setSecretBursting(true);
  }, []);

  const handleToggleBright = useCallback(() => {
    setBrightMode((prev) => !prev);
  }, []);

  return (
    <LayoutGroup>
      <div className={`room${brightMode ? " bright" : ""}`}>
        <div className="wall" />
        <div className="ambient" />
        <div className="dust" />
        <div className="room-dim" />

        <div
          className="room-title"
          role="button"
          tabIndex={0}
          onClick={handleToggleBright}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleToggleBright();
            }
          }}
          aria-pressed={brightMode}
          title="Toggle room light"
        >
          <div className="title-glow" aria-hidden="true" />
          <div className="num">222</div>
        </div>

        <FairyLights />
        <FilmPosters />

        <Shelf
          songs={songs}
          selectedId={selectedId}
          onSelect={handleSelect}
          secretUnlocked={secretUnlocked}
        />

        <div className="desk">
          <div className="desk-edge" />
          <div className="desk-top" />
        </div>

        <div className="desk-stage">
          <Books />
          <VinylPlayer activeSong={activeSong} spinning={spinning} onPrev={handlePrev} onNext={handleNext} />
          <Mug />
          <TableDecor />
        </div>

        {activeSong && (
          <motion.div
            className="now-playing"
            key={activeSong.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="title">{activeSong.title}</div>
            <div className="artist">{activeSong.artist}</div>
          </motion.div>
        )}

        <div className="cozy-cast" />
        <div className="cozy" />
        <div className="vignette" />

        <YouTubeHost
          youtubeId={activeSong?.youtubeId}
          playing={spinning && !!activeSong}
        />

        <SecretCode
          onUnlock={handleSecret}
          bursting={secretBursting}
          onBurstDone={() => setSecretBursting(false)}
        />
      </div>
    </LayoutGroup>
  );
}
