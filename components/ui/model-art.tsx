/**
 * Isometrische Modell-Illustration (Haus auf Grundstücksplatte) im Stil der Startseite:
 * flache Flächen, dicke Konturlinie, Markierung und Wolken in sanfter Bewegung. Reines SVG,
 * keine Bilddatei, keine Skripte.
 */

const INK = "#0a2b33";
const S = 26; // Maßstab
const C30 = Math.cos(Math.PI / 6);
const S30 = 0.5;

/** Isometrische Projektion: x nach rechts unten, y nach links unten, z nach oben. */
function p(x: number, y: number, z: number, ox = 300, oy = 120): [number, number] {
  return [ox + (x - y) * C30 * S, oy + (x + y) * S30 * S - z * S];
}

function poly(points: [number, number, number][], fill: string, extra?: { opacity?: number }) {
  const d = points.map(([x, y, z]) => p(x, y, z).join(",")).join(" ");
  return <polygon points={d} fill={fill} stroke={INK} strokeWidth={3} strokeLinejoin="round" opacity={extra?.opacity} />;
}

export function ModelArt({ className = "" }: { className?: string }) {
  const W = 9;
  const D = 7;
  // Haus
  const hx0 = 2.4;
  const hx1 = 5.4;
  const hy0 = 1.4;
  const hy1 = 4.2;
  const hz = 2.2;
  // Garage
  const gx0 = 5.4;
  const gx1 = 7.4;
  const gy0 = 2.4;
  const gy1 = 4.4;
  const gz = 1.35;

  const pin = p(3.9, 2.8, 4.6);
  const treeBase = p(1.0, 5.4, 0);

  return (
    <svg viewBox="0 -50 600 400" className={className} role="img" aria-label="Illustration: Haus als Modell auf einem Grundstück">
      {/* Wolken */}
      <g className="art-cloud" fill="#dcecef" stroke={INK} strokeWidth={3}>
        <ellipse cx="90" cy="48" rx="34" ry="16" />
        <ellipse cx="116" cy="40" rx="24" ry="14" />
      </g>
      <g className="art-cloud art-cloud-2" fill="#dcecef" stroke={INK} strokeWidth={3}>
        <ellipse cx="480" cy="30" rx="30" ry="14" />
        <ellipse cx="502" cy="24" rx="20" ry="12" />
      </g>

      {/* Schatten */}
      <polygon points={[p(-0.3, D + 0.3, -0.9), p(W + 0.3, D + 0.3, -0.9), p(W + 0.6, -0.1, -0.9), p(0.6, -0.4, -0.9)].map((q) => q.join(",")).join(" ")} fill="#04181d" opacity={0.25} />

      {/* Grundstücksplatte: Erde und Gras */}
      {poly([[0, D, 0], [W, D, 0], [W, D, -0.8], [0, D, -0.8]], "#8a5a3c")}
      {poly([[W, D, 0], [W, 0, 0], [W, 0, -0.8], [W, D, -0.8]], "#7a4e33")}
      {poly([[0, 0, 0], [W, 0, 0], [W, D, 0], [0, D, 0]], "#79c455")}

      {/* Straße vorne */}
      {poly([[0, 6.2, 0.02], [W, 6.2, 0.02], [W, D, 0.02], [0, D, 0.02]], "#4b5863")}
      <line x1={p(1.2, 6.6, 0.04)[0]} y1={p(1.2, 6.6, 0.04)[1]} x2={p(2.6, 6.6, 0.04)[0]} y2={p(2.6, 6.6, 0.04)[1]} stroke="#ffd23f" strokeWidth={4} strokeLinecap="round" />
      <line x1={p(4.4, 6.6, 0.04)[0]} y1={p(4.4, 6.6, 0.04)[1]} x2={p(5.8, 6.6, 0.04)[0]} y2={p(5.8, 6.6, 0.04)[1]} stroke="#ffd23f" strokeWidth={4} strokeLinecap="round" />

      {/* Garage */}
      {poly([[gx0, gy1, 0], [gx1, gy1, 0], [gx1, gy1, gz], [gx0, gy1, gz]], "#f1ece2")}
      {poly([[gx1, gy1, 0], [gx1, gy0, 0], [gx1, gy0, gz], [gx1, gy1, gz]], "#d9d2c5")}
      {poly([[gx0, gy1, gz], [gx1, gy1, gz], [gx1, gy0, gz], [gx0, gy0, gz]], "#46566a")}
      {poly([[gx0 + 0.3, gy1, 0], [gx1 - 0.3, gy1, 0], [gx1 - 0.3, gy1, gz - 0.25], [gx0 + 0.3, gy1, gz - 0.25]], "#26404a")}

      {/* Haus */}
      {poly([[hx0, hy1, 0], [hx1, hy1, 0], [hx1, hy1, hz], [hx0, hy1, hz]], "#f1ece2")}
      {poly([[hx1, hy1, 0], [hx1, hy0, 0], [hx1, hy0, hz], [hx1, hy1, hz]], "#d9d2c5")}
      {/* Giebel */}
      {poly([[hx0, hy1, hz], [hx1, hy1, hz], [(hx0 + hx1) / 2, hy1, hz + 1.2]], "#f1ece2")}
      {/* Fenster und Tür */}
      {poly([[hx0 + 0.35, hy1, 0.95], [hx0 + 1.15, hy1, 0.95], [hx0 + 1.15, hy1, 1.75], [hx0 + 0.35, hy1, 1.75]], "#a8dcee")}
      {poly([[hx0 + 1.45, hy1, 0.95], [hx0 + 2.25, hy1, 0.95], [hx0 + 2.25, hy1, 1.75], [hx0 + 1.45, hy1, 1.75]], "#a8dcee")}
      {poly([[hx1, hy1 - 0.5, 0], [hx1, hy1 - 1.2, 0], [hx1, hy1 - 1.2, 1.5], [hx1, hy1 - 0.5, 1.5]], "#26404a")}
      {/* Dach, Seite zur Kamera */}
      {poly([[hx1 + 0.35, hy0 - 0.3, hz], [hx1 + 0.35, hy1 + 0.3, hz], [(hx0 + hx1) / 2, hy1 + 0.3, hz + 1.2], [(hx0 + hx1) / 2, hy0 - 0.3, hz + 1.2]], "#3b4a5e")}
      {/* Solarmodule */}
      {poly([[hx1 + 0.05, hy0 + 0.1, hz + 0.16], [hx1 + 0.05, hy1 - 0.1, hz + 0.16], [hx1 - 0.75, hy1 - 0.1, hz + 0.78], [hx1 - 0.75, hy0 + 0.1, hz + 0.78]], "#2a5bd7")}

      {/* Baum */}
      <g stroke={INK} strokeWidth={3} strokeLinejoin="round">
        <rect x={treeBase[0] - 4} y={treeBase[1] - 22} width={8} height={22} fill="#8a5a3c" />
        <polygon points={`${treeBase[0]},${treeBase[1] - 70} ${treeBase[0] - 24},${treeBase[1] - 20} ${treeBase[0] + 24},${treeBase[1] - 20}`} fill="#2f8f5b" />
        <polygon points={`${treeBase[0]},${treeBase[1] - 90} ${treeBase[0] - 17},${treeBase[1] - 48} ${treeBase[0] + 17},${treeBase[1] - 48}`} fill="#3aa86b" />
      </g>

      {/* Markierung über dem Haus */}
      <g className="art-pin" style={{ ["--px" as string]: `${pin[0]}px`, ["--py" as string]: `${pin[1]}px` }}>
        <path d="M0 0 C-16 -22 -22 -34 -22 -44 a22 22 0 1 1 44 0 C22 -34 16 -22 0 0 Z" fill="#ffd23f" stroke={INK} strokeWidth={3} strokeLinejoin="round" />
        <circle cx="0" cy="-44" r="7" fill={INK} />
      </g>
    </svg>
  );
}
