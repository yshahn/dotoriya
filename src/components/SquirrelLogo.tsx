// src/components/SquirrelLogo.tsx
'use client';
export default function SquirrelLogo({ size = 56 }: { size?: number }) {
  const h = Math.round(size * 0.82);
  return (
    <svg width={size} height={h} viewBox="0 0 68 56" xmlns="http://www.w3.org/2000/svg">
      {/* Tail */}
      <g className="sq-tail">
        <path d="M12 42 Q-2 35 -1 22 Q0 10 10 8 Q19 5 20 17 Q21 25 16 31 Q11 37 12 42Z" fill="#C07040"/>
        <ellipse cx="5" cy="9" rx="5" ry="4" fill="#E8C49A" transform="rotate(-20 5 9)"/>
      </g>
      {/* Body */}
      <ellipse cx="38" cy="40" rx="16" ry="18" fill="#C07040"/>
      <ellipse cx="38" cy="43" rx="9" ry="12" fill="#E8C49A"/>
      {/* Arms */}
      <path d="M25 37 Q18 41 17 47" stroke="#C07040" strokeWidth="5" strokeLinecap="round" fill="none"/>
      <path d="M51 37 Q58 41 59 47" stroke="#C07040" strokeWidth="5" strokeLinecap="round" fill="none"/>
      {/* Floating acorn */}
      <g className="sq-acorn">
        <ellipse cx="38" cy="44" rx="6" ry="4" fill="#8B5E3C"/>
        <rect x="36" y="40" width="4" height="5" rx="1.5" fill="#6B4020"/>
        <ellipse cx="38" cy="50" rx="5" ry="6" fill="#D4A050"/>
        <ellipse cx="36" cy="47" rx="1.5" ry="2.5" fill="#E8C070" opacity="0.6"/>
      </g>
      {/* Head */}
      <ellipse cx="38" cy="24" rx="16" ry="15" fill="#C07040"/>
      {/* Left ear */}
      <ellipse cx="27" cy="14" rx="5" ry="8" fill="#C07040" transform="rotate(-15 27 14)"/>
      <ellipse cx="27" cy="14" rx="2.5" ry="4.5" fill="#E8A8A0" transform="rotate(-15 27 14)"/>
      {/* Right ear (twitches) */}
      <g className="sq-earR">
        <ellipse cx="49" cy="14" rx="5" ry="8" fill="#C07040" transform="rotate(15 49 14)"/>
        <ellipse cx="49" cy="14" rx="2.5" ry="4.5" fill="#E8A8A0" transform="rotate(15 49 14)"/>
      </g>
      {/* Eyes */}
      <g className="sq-eyeL">
        <ellipse cx="32" cy="25" rx="3" ry="3.2" fill="#2C1A0E"/>
        <circle cx="31" cy="24" r="1" fill="white" opacity="0.9"/>
      </g>
      <g className="sq-eyeR">
        <ellipse cx="44" cy="25" rx="3" ry="3.2" fill="#2C1A0E"/>
        <circle cx="43" cy="24" r="1" fill="white" opacity="0.9"/>
      </g>
      {/* Nose & mouth */}
      <ellipse cx="38" cy="31" rx="3" ry="2" fill="#8B4020"/>
      <path d="M35 34 Q38 37 41 34" stroke="#8B4020" strokeWidth="1" strokeLinecap="round" fill="none"/>
      {/* Cheeks */}
      <ellipse cx="29" cy="32" rx="5" ry="4" fill="#E88860" opacity="0.6"/>
      <ellipse cx="47" cy="32" rx="5" ry="4" fill="#E88860" opacity="0.6"/>
      {/* Sparkles */}
      <g className="sq-sp1">
        <path d="M62 8 L63 5 L64 8 L67 9 L64 10 L63 13 L62 10 L59 9Z" fill="#F5D070"/>
      </g>
      <g className="sq-sp2">
        <path d="M64 20 L64.8 18 L65.6 20 L67.6 20.8 L65.6 21.6 L64.8 23.6 L64 21.6 L62 20.8Z" fill="#F5D070" style={{transform:'scale(0.75)',transformOrigin:'64px 20px'}}/>
      </g>
    </svg>
  );
}
