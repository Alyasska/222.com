import { useEffect, useRef } from "react";

function buildCrackleBuffer(ctx) {
  const len = ctx.sampleRate * 4;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  // Pink noise via Voss–McCartney approximation
  let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99886*b0 + w*0.0555179;
    b1 = 0.99332*b1 + w*0.0750759;
    b2 = 0.96900*b2 + w*0.1538520;
    b3 = 0.86650*b3 + w*0.3104856;
    b4 = 0.55000*b4 + w*0.5329522;
    b5 = -0.7616*b5 + w*0.0168980;
    b6 = w * 0.115926;
    let out = (b0+b1+b2+b3+b4+b5+b6+w*0.5362) * 0.045;
    // Rare crackle pops
    if (Math.random() < 0.00012) out += (Math.random() - 0.5) * 0.12;
    d[i] = Math.max(-1, Math.min(1, out));
  }
  return buf;
}

export function useVinylAudio(playing) {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    let ctx;
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (err) {
        void err;
        return;
      }
    ctxRef.current = ctx;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    return () => { ctx.close(); };
  }, []);

  useEffect(() => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;

    if (playing) {
      if (ctx.state === "suspended") ctx.resume();
      const buf = buildCrackleBuffer(ctx);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      src.connect(gain);
      src.start();
      sourceRef.current = src;
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 1.4);
    } else {
      const src = sourceRef.current;
      if (!src) return;
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
      setTimeout(() => {
        try { src.stop(); } catch (err) { void err; }
        sourceRef.current = null;
      }, 700);
    }
  }, [playing]);
}
