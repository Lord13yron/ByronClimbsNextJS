type BrandMarkProps = {
  size?: number;
  light?: boolean;
  className?: string;
};

export default function BrandMark({ size = 40, light = false, className }: BrandMarkProps) {
  const fg = light ? "var(--chalk)" : "var(--granite-100)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" stroke={fg} strokeWidth="1.5" />
      <circle cx="20" cy="20" r="13" stroke={fg} strokeWidth="0.8" opacity="0.5" />
      <path d="M8 28 L16 16 L20 21 L26 12 L32 28 Z" fill={fg} />
      <circle cx="26" cy="12" r="1.6" fill="var(--ember)" />
    </svg>
  );
}
