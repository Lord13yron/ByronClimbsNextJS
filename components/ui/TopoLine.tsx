type TopoLineProps = {
  height?: number;
  seed?: number;
  className?: string;
};

export default function TopoLine({ height = 48, seed = 1, className }: TopoLineProps) {
  const width = 1440;
  const n = 24;
  const points: [number, number][] = [];

  for (let i = 0; i <= n; i++) {
    const x = (i / n) * width;
    const y =
      height / 2 +
      Math.sin(i * 0.7 + seed) * (height * 0.28) +
      Math.cos(i * 1.3 + seed * 2) * (height * 0.12);
    points.push([x, y]);
  }

  const d = points.reduce(
    (acc, [x, y], i) => acc + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`),
    "",
  );

  const offset = height * 0.18;

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1" opacity="1" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1" transform={`translate(0, ${offset})`} opacity="0.6" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1" transform={`translate(0, ${-offset})`} opacity="0.6" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1" transform={`translate(0, ${offset * 2})`} opacity="0.35" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1" transform={`translate(0, ${-offset * 2})`} opacity="0.35" />
    </svg>
  );
}
