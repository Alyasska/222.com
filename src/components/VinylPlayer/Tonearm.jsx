export default function Tonearm({ playing }) {
  return (
    <div className={`tonearm-pivot ${playing ? "tonearm-playing" : ""}`}>
      <div className="tonearm-arm" />
      <div className="tonearm-base" />
    </div>
  );
}
