export default function Tulips() {
  return (
    <div className="relative w-24 h-32 drop-shadow-xl z-20" style={{ opacity: 0.85 }}>
      <svg viewBox="0 0 100 150" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Stems */}
        <path d="M50,150 Q40,100 30,55" fill="none" stroke="#7CB342" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M50,150 Q62,90 72,42" fill="none" stroke="#689F38" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M50,150 Q54,100 50,62" fill="none" stroke="#558B2F" strokeWidth="3.5" strokeLinecap="round" />
        {/* Leaves */}
        <path d="M44,118 Q28,88 18,108 Q33,128 44,118" fill="#7CB342" />
        <path d="M56,108 Q72,78 82,98 Q67,118 56,108" fill="#689F38" />
        {/* Left flower */}
        <path d="M20,55 Q10,33 30,22 Q40,32 30,55 Z" fill="#F48FB1" />
        <path d="M30,55 Q24,33 40,27 Q44,40 30,55 Z" fill="#F06292" />
        {/* Right flower */}
        <path d="M62,42 Q52,22 72,12 Q82,22 72,42 Z" fill="#F48FB1" />
        <path d="M72,42 Q66,22 82,17 Q86,30 72,42 Z" fill="#EC407A" />
        {/* Center flower */}
        <path d="M40,62 Q34,42 50,32 Q60,46 50,62 Z" fill="#F8BBD0" />
        <path d="M50,62 Q46,42 58,38 Q60,50 50,62 Z" fill="#F48FB1" />
      </svg>
    </div>
  );
}
