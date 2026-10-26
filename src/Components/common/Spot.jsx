import { useId } from "react";

// Small hand-drawn (code-made) SVG illustrations used inside cards.
// Brand palette only: navy panels, orange #F97316, cyan #38BDF8. No stock imagery.
const O = "#F97316";
const C = "#38BDF8";
const P = "#13284A";
const L = "rgba(255,255,255,0.18)";

const Browser = ({ x = 30, y = 18, w = 140, h = 86, children }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="8" fill={P} stroke={C} strokeOpacity="0.45" />
    <circle cx={x + 9} cy={y + 8} r="2" fill="#F87171" />
    <circle cx={x + 16} cy={y + 8} r="2" fill="#FBBF24" />
    <circle cx={x + 23} cy={y + 8} r="2" fill="#34D399" />
    <line x1={x} x2={x + w} y1={y + 15} y2={y + 15} stroke={L} />
    {children}
  </g>
);

const scenes = {
  website: () => (
    <Browser>
      <rect x="40" y="40" width="70" height="8" rx="3" fill={O} />
      <rect x="40" y="53" width="95" height="4" rx="2" fill={L} />
      <rect x="40" y="61" width="80" height="4" rx="2" fill={L} />
      {[0, 1, 2].map((i) => <rect key={i} x={40 + i * 43} y="74" width="37" height="22" rx="4" fill="#1C3A66" stroke={C} strokeOpacity="0.3" />)}
    </Browser>
  ),
  webapp: () => (
    <Browser>
      <rect x="36" y="40" width="22" height="58" rx="4" fill="#1C3A66" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x="41" y={46 + i * 12} width="12" height="4" rx="2" fill={i === 0 ? O : L} />)}
      {[0, 1].map((i) => <rect key={i} x={66 + i * 50} y="40" width="44" height="18" rx="4" fill="#1C3A66" />)}
      {[30, 50, 38, 62, 46, 70].map((hgt, i) => <rect key={i} x={68 + i * 15} y={98 - hgt / 2} width="9" height={hgt / 2} rx="2" fill={i % 2 ? O : C} opacity="0.85" />)}
    </Browser>
  ),
  react: () => (
    <g>
      {[0, 60, 120].map((deg) => <ellipse key={deg} cx="100" cy="60" rx="62" ry="22" fill="none" stroke={C} strokeWidth="3" transform={`rotate(${deg} 100 60)`} opacity="0.9" />)}
      <circle cx="100" cy="60" r="10" fill={C} />
      <circle cx="160" cy="48" r="5" fill={O} />
    </g>
  ),
  uiux: () => (
    <g>
      <rect x="60" y="10" width="54" height="100" rx="10" fill={P} stroke={C} strokeOpacity="0.5" />
      <rect x="68" y="24" width="38" height="24" rx="4" fill="#1C3A66" />
      <rect x="68" y="54" width="30" height="4" rx="2" fill={L} />
      <rect x="68" y="62" width="22" height="4" rx="2" fill={L} />
      <rect x="68" y="88" width="38" height="10" rx="5" fill={O} />
      {[O, C, "#A78BFA", "#F472B6"].map((color, i) => <circle key={color} cx={136} cy={26 + i * 22} r="8" fill={color} />)}
      <path d="M126 92 l14 -14 l6 6 l-14 14 z" fill="#FDBA74" />
    </g>
  ),
  saas: () => (
    <g>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M100 ${30 + i * 20} l50 18 l-50 18 l-50 -18 z`} fill={i === 0 ? O : P} stroke={C} strokeOpacity="0.5" opacity={1 - i * 0.2} />
      ))}
      <circle cx="40" cy="30" r="9" fill={C} opacity="0.85" />
      <circle cx="160" cy="26" r="7" fill={C} opacity="0.6" />
      <path d="M40 39 v16 M160 33 v14" stroke={L} strokeDasharray="3 3" />
    </g>
  ),
  ecommerce: () => (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={28 + i * 38} y="22" width="32" height="40" rx="5" fill={P} stroke={C} strokeOpacity="0.4" />
          <rect x={33 + i * 38} y="27" width="22" height="18" rx="3" fill={i === 1 ? O : "#1C3A66"} />
          <rect x={33 + i * 38} y="50" width="16" height="4" rx="2" fill={L} />
        </g>
      ))}
      <path d="M140 52 h8 l8 30 h30 l6 -22 h-40" fill="none" stroke={O} strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="160" cy="92" r="5" fill={O} />
      <circle cx="182" cy="92" r="5" fill={O} />
    </g>
  ),
  code: () => (
    <Browser>
      <text x="44" y="56" fill={O} fontSize="18" fontFamily="monospace">{"</>"}</text>
      {[0, 1, 2].map((i) => <rect key={i} x={44 + (i % 2) * 10} y={66 + i * 9} width={70 - i * 15} height="4" rx="2" fill={i === 1 ? C : L} />)}
    </Browser>
  ),
  shield: () => (
    <g>
      <path d="M100 14 l40 14 v26 c0 26 -18 42 -40 52 c-22 -10 -40 -26 -40 -52 v-26 z" fill={P} stroke={C} strokeWidth="2" />
      <path d="M84 60 l12 12 l22 -24" fill="none" stroke={O} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  chart: () => (
    <g>
      <rect x="30" y="18" width="140" height="86" rx="8" fill={P} stroke={C} strokeOpacity="0.4" />
      <path d="M42 90 L70 70 L92 78 L120 48 L158 36" fill="none" stroke={C} strokeWidth="3" strokeLinecap="round" />
      <path d="M42 90 L70 70 L92 78 L120 48 L158 36 L158 96 L42 96 Z" fill={O} opacity="0.2" />
      {[[70, 70], [120, 48], [158, 36]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" fill={O} />)}
    </g>
  ),
  team: () => (
    <g>
      {[[70, C], [100, O], [130, C]].map(([x, color], i) => (
        <g key={x} opacity={i === 1 ? 1 : 0.8}>
          <circle cx={x} cy={i === 1 ? 40 : 48} r={i === 1 ? 15 : 12} fill={color} />
          <path d={`M${x - 22} ${i === 1 ? 96 : 98} c0 -22 44 -22 44 0`} fill={P} stroke={color} strokeWidth="2" />
        </g>
      ))}
    </g>
  ),
  rocket: () => (
    <g>
      <path d="M100 10 c18 14 24 38 18 62 h-36 c-6 -24 0 -48 18 -62 z" fill={P} stroke={C} strokeWidth="2" />
      <circle cx="100" cy="44" r="8" fill={C} />
      <path d="M82 72 l-14 16 l16 -2 z M118 72 l14 16 l-16 -2 z" fill={O} />
      <path d="M92 76 q8 30 16 0" fill={O} />
    </g>
  ),
};

export default function Spot({ variant = "website", className = "" }) {
  const id = useId();
  const Scene = scenes[variant] || scenes.code;
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="60%" r="60%">
          <stop offset="0%" stopColor={O} stopOpacity="0.28" />
          <stop offset="100%" stopColor={O} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="120" fill={`url(#${id}-glow)`} />
      <Scene />
    </svg>
  );
}
