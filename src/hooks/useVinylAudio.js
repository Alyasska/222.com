import { useEffect, useRef } from "react";

export function useVinylAudio(playing) {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const sourceRef = useRef(null);
  const bufferRef = useRef(null);

  useEffect(() => {
    let ctx;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      return;
    }
    ctxRef.current = ctx;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    fetch("/sounds/crackle.mp3")
      .then((r) => {
        if (!r.ok) return null;
        return r.arrayBuffer();
      })
      .then((ab) => {
        if (!ab) return;
        return ctx.decodeAudioData(ab);
      })
      .then((decoded) => {
        if (decoded) bufferRef.current = decoded;
      })
      .catch((error) => {
        void error;
      });

    return () => {
      ctx.close();
    };
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    const buffer = bufferRef.current;
    if (!ctx || !gain || !buffer) return;

    if (playing) {
      if (ctx.state === "suspended") ctx.resume();
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      src.connect(gain);
      src.start();
      sourceRef.current = src;
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 1.2);
    } else {
      const src = sourceRef.current;
      if (!src) return;
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      setTimeout(() => {
        try {
          src.stop();
        } catch (error) {
          void error;
        }
        sourceRef.current = null;
      }, 700);
    }
  }, [playing]);
}
