type TypeGlyphProps = {
  type: string;
  size?: number;
  className?: string;
};

export default function TypeGlyph({ type, size = 14, className }: TypeGlyphProps) {
  const t = type?.toLowerCase();

  if (t === "boulder") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        className={className}
        aria-label="Boulder"
      >
        <path
          d="M2 13 L4 8 L7 5 L10 7 L13 4 L14 13 Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
    );
  }

  if (t === "sport") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className={className}
        aria-label="Sport"
      >
        <circle cx="8" cy="3.5" r="1.4" />
        <path d="M8 5 L8 14" />
        <path d="M5 8 L8 6.5 L11 8" />
        <path d="M5 11.5 L8 10 L11 11.5" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-label="Trad"
    >
      <path d="M3 3 L3 13" />
      <path d="M13 3 L13 13" />
      <path d="M3 5 L13 5" />
      <path d="M3 9 L13 9" />
      <path d="M3 13 L13 13" />
    </svg>
  );
}
