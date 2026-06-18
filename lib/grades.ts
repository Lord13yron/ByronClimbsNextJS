// Shared climbing grade scales and ordering helpers.
// Boulders use the V-scale (stored as the bare number, e.g. "9" → displayed "V9").
// Sport routes use the YDS scale (e.g. "5.12a").

export const VGRADES = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "10", "11", "12", "13", "14", "15", "16", "17",
];

export const SPORTGRADES = [
  "5.4", "5.5", "5.6", "5.7", "5.8", "5.9",
  "5.10a", "5.10b", "5.10c", "5.10d",
  "5.11a", "5.11b", "5.11c", "5.11d",
  "5.12a", "5.12b", "5.12c", "5.12d",
  "5.13a", "5.13b", "5.13c", "5.13d",
  "5.14a", "5.14b", "5.14c", "5.14d",
  "5.15a", "5.15b", "5.15c", "5.15d",
];

// Returns the hardest grade present in `grades`, ordered by its position in
// `scale`. Grades not found in the scale are ignored. Returns null when none match.
export function hardestGrade(grades: string[], scale: string[]): string | null {
  let bestIndex = -1;
  for (const grade of grades) {
    const index = scale.indexOf(grade);
    if (index > bestIndex) bestIndex = index;
  }
  return bestIndex === -1 ? null : scale[bestIndex];
}

// Numeric difficulty rank for sorting across disciplines. Boulders rank by their
// V-scale index; sport routes rank by their YDS index, offset so the two scales
// don't interleave (e.g. V0 and 5.10a stay distinct). Unknown grades sort last.
export function gradeRank(grade: string, type: string): number {
  if (type === "boulder") {
    const i = VGRADES.indexOf(grade);
    return i === -1 ? -1 : i;
  }
  const i = SPORTGRADES.indexOf(grade);
  return i === -1 ? -1 : 100 + i;
}
