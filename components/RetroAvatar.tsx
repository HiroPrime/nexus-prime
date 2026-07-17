export function RetroAvatar() {
  return (
    <svg
      viewBox="0 0 64 64"
      width="320"
      height="320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="BasicHiro in retro pixel form"
    >
      <rect width="64" height="64" fill="#0a0a1a" />

      {/* Hair */}
      <rect x="20" y="8" width="24" height="6" fill="#1a1a3a" />
      <rect x="18" y="14" width="28" height="4" fill="#1a1a3a" />
      <rect x="16" y="18" width="6" height="8" fill="#1a1a3a" />
      <rect x="42" y="18" width="6" height="8" fill="#1a1a3a" />

      {/* Face */}
      <rect x="20" y="18" width="24" height="20" fill="#f5c99a" />
      <rect x="18" y="22" width="4" height="12" fill="#f5c99a" />
      <rect x="42" y="22" width="4" height="12" fill="#f5c99a" />

      {/* Eyes */}
      <rect x="24" y="26" width="6" height="6" fill="#fff" />
      <rect x="34" y="26" width="6" height="6" fill="#fff" />
      <rect x="26" y="28" width="3" height="3" fill="#1a1a3a" />
      <rect x="36" y="28" width="3" height="3" fill="#1a1a3a" />

      {/* Smile */}
      <rect x="26" y="34" width="12" height="2" fill="#c47a5a" />
      <rect x="24" y="32" width="2" height="2" fill="#c47a5a" />
      <rect x="38" y="32" width="2" height="2" fill="#c47a5a" />

      {/* Shirt */}
      <rect x="18" y="38" width="28" height="14" fill="#00e5ff" />
      <rect x="28" y="38" width="8" height="14" fill="#006d80" />

      {/* Collar */}
      <rect x="26" y="38" width="4" height="4" fill="#fff" />
      <rect x="34" y="38" width="4" height="4" fill="#fff" />

      {/* Arms */}
      <rect x="12" y="40" width="6" height="10" fill="#f5c99a" />
      <rect x="46" y="40" width="6" height="10" fill="#f5c99a" />

      {/* Pixel accent — star on shirt */}
      <rect x="30" y="44" width="4" height="4" fill="#ffe600" />
      <rect x="28" y="46" width="8" height="2" fill="#ffe600" />
      <rect x="30" y="42" width="4" height="2" fill="#ffe600" />
      <rect x="30" y="48" width="4" height="2" fill="#ffe600" />

      {/* Pants hint */}
      <rect x="22" y="52" width="8" height="6" fill="#1a1a5a" />
      <rect x="34" y="52" width="8" height="6" fill="#1a1a5a" />

      {/* Neon glow border pixels */}
      <rect x="0" y="0" width="64" height="2" fill="#00e5ff" opacity="0.6" />
      <rect x="0" y="62" width="64" height="2" fill="#00e5ff" opacity="0.6" />
      <rect x="0" y="0" width="2" height="64" fill="#00e5ff" opacity="0.6" />
      <rect x="62" y="0" width="2" height="64" fill="#00e5ff" opacity="0.6" />
    </svg>
  );
}
