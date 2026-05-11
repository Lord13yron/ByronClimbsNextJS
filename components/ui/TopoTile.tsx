type TopoTileProps = {
  height?: number;
  className?: string;
};

export function TopoTile({ height = 600, className }: TopoTileProps) {
  const paths = Array.from({ length: 9 }, (_, i) => {
    const off = i * 24;
    return `M -20 ${30 + off * 0.6} Q 100 ${off * 0.9 - 20}, 240 ${50 + off * 0.5} T 520 ${20 + off * 0.7} T 820 ${off * 0.55 + 30}`;
  });

  return (
    <svg
      width="100%"
      height={height}
      viewBox="0 0 800 220"
      preserveAspectRatio="none"
      className={className}
      style={{ display: "block" }}
      aria-hidden="true"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}
