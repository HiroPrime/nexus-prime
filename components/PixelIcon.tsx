/**
 * 8-bit pixel art icons rendered as SVGs.
 * Each icon is an 8×8 grid; characters map to colours from PALETTE.
 * '.' = transparent (skipped). Display size is controlled by the `size` prop.
 */

const PALETTE: Record<string, string> = {
  C: "#00e5ff", // cyan
  Y: "#ffe600", // yellow
  P: "#ff2d95", // pink / magenta
  G: "#00ff88", // green
  B: "#4488ff", // blue
  O: "#ff8c00", // orange
  W: "#ffffff", // white
  S: "#aac0dd", // silver / steel blue
  L: "#cc88ff", // lavender / purple
  T: "#44ddff", // teal (lighter cyan, used for liquids)
  R: "#ff4444", // red
};

/** 8-character strings = one row of 8 pixels */
const ICONS: Record<string, string[]> = {
  /* ── Inventory ─────────────────────────────────────── */
  scroll: [
    ".CCCCCC.",
    "C......C",
    "C.WWWW.C",
    "C.W..W.C",
    "C.WWWW.C",
    "C......C",
    ".CCCCCC.",
    "........",
  ],
  flask: [
    "...SS...",
    "...SS...",
    "..SSSS..",
    "..STTS..",
    ".STTTTS.",
    ".STTTTS.",
    "..SSSS..",
    "........",
  ],
  compass: [
    ".YYYYY..",
    "Y.....Y.",
    "Y..P..Y.",
    "Y.P.W.Y.",
    "Y..W..Y.",
    "Y.....Y.",
    ".YYYYY..",
    "........",
  ],
  crystal: [
    "..GG....",
    ".GGGG...",
    "GG..GG..",
    "GGTTGG..",
    ".GGGG...",
    "..GG....",
    "........",
    "........",
  ],
  bag: [
    ".OOOO...",
    "O.WW.O..",
    "OOOOOO..",
    "O....O..",
    "O....O..",
    "O....O..",
    ".OOOO...",
    "........",
  ],

  /* ── Quests ─────────────────────────────────────────── */
  sword: [
    "...S....",
    "...S....",
    "...S....",
    ".SSSSS..",
    "...S....",
    "...S....",
    "..SSS...",
    "........",
  ],
  gamepad: [
    ".SSSSS..",
    "S.....S.",
    "S.W.W.S.",
    "SWWWWWS.",
    "S.....S.",
    ".SSSSS..",
    "........",
    "........",
  ],
  book: [
    ".LLLLL..",
    "L.WWWWL.",
    "L.W..WL.",
    "L.WWWWL.",
    "L.W..WL.",
    "L.WWWWL.",
    ".LLLLL..",
    "........",
  ],
  trophy: [
    "YYYYYYY.",
    "YY...YY.",
    ".YYYYY..",
    "..YYY...",
    "..YYY...",
    ".YYYYY..",
    "........",
    "........",
  ],

  /* ── Character Equipment ────────────────────────────── */
  headphones: [
    "...SS...",
    "..S..S..",
    ".S....S.",
    "S......S",
    "CC....CC",
    "CC....CC",
    ".CC..CC.",
    "........",
  ],
  keyboard: [
    ".SSSSSS.",
    "SWSWSWSS",
    "SWSWSWSS",
    "SWWWWWSS",
    ".SSSSSS.",
    "........",
    "........",
    "........",
  ],
  monitor: [
    "SSSSSSSS",
    "S......S",
    "S......S",
    "S......S",
    "SSSSSSSS",
    "...SS...",
    ".SSSSSS.",
    "........",
  ],
  coffee: [
    ".Y.Y....",
    "Y.Y.....",
    ".OOOO...",
    "O....OO.",
    "O....OO.",
    "OOOOOO..",
    "........",
    "........",
  ],
};

type PixelIconProps = {
  name: string;
  /** Rendered size in CSS pixels (icon is always square). Default 32. */
  size?: number;
};

export function PixelIcon({ name, size = 32 }: PixelIconProps) {
  const rows = ICONS[name];
  if (!rows) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated", display: "block", flexShrink: 0 }}
      aria-hidden="true"
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) => {
          const fill = PALETTE[ch];
          if (!fill) return null;
          return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />;
        })
      )}
    </svg>
  );
}
