type TopoLineProps = {
  height?: number;
  seed?: number;
  className?: string;
  /**
   * When set, render a full-height contour field of `rows` stacked baselines
   * across a tall viewBox (the SVG fills its container's height) instead of the
   * default single 5-ply band. Used by the Database masthead backdrop.
   */
  rows?: number;
  strokeWidth?: number;
};

const VIEW_WIDTH = 1440;
const N = 24;

function wavyPath(baseY: number, amplitude: number, phase: number): string {
  const points: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const x = (i / N) * VIEW_WIDTH;
    const y =
      baseY +
      Math.sin(i * 0.5 + phase) * amplitude +
      Math.cos(i * 0.9 + phase * 1.5) * amplitude * 0.5;
    points.push([x, y]);
  }
  return points.reduce(
    (acc, [x, y], i) => acc + (i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`),
    "",
  );
}

export default function TopoLine({
  height = 48,
  seed = 1,
  className,
  rows,
  strokeWidth = 1,
}: TopoLineProps) {
  // Full-height field: a stack of contour baselines over a tall viewBox.
  if (rows && rows > 0) {
    const viewHeight = 720;
    const top = 24;
    const step = rows > 1 ? (viewHeight - top * 2) / (rows - 1) : 0;
    const amplitude = 16;

    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEW_WIDTH} ${viewHeight}`}
        preserveAspectRatio="none"
        className={className}
        style={{ display: "block" }}
        aria-hidden="true"
      >
        {Array.from({ length: rows }, (_, k) => (
          <path
            key={k}
            d={wavyPath(top + k * step, amplitude, k * 0.8 + 2 + seed)}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
          />
        ))}
      </svg>
    );
  }

  const width = VIEW_WIDTH;
  const points: [number, number][] = [];

  for (let i = 0; i <= N; i++) {
    const x = (i / N) * width;
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
      <path d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity="1" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} transform={`translate(0, ${offset})`} opacity="0.6" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} transform={`translate(0, ${-offset})`} opacity="0.6" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} transform={`translate(0, ${offset * 2})`} opacity="0.35" />
      <path d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} transform={`translate(0, ${-offset * 2})`} opacity="0.35" />
    </svg>
  );
}
