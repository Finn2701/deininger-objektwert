export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** 0 -> 1 -> 0 tent function, peaking at `center`. */
export function triangle(p: number, center: number, halfWidth: number) {
  return clamp(1 - Math.abs(p - center) / halfWidth, 0, 1);
}

/** Ramps 0->1 between x0/x1, holds 1 between x1/x2, ramps 1->0 between x2/x3. */
export function trapezoid(p: number, x0: number, x1: number, x2: number, x3: number) {
  if (p <= x0) return 0;
  if (p < x1) return (p - x0) / (x1 - x0);
  if (p <= x2) return 1;
  if (p < x3) return 1 - (p - x2) / (x3 - x2);
  return 0;
}

/** Ramps 0->1 between `from` and `to`, then holds at 1 (never falls back to 0). */
export function rampUp(p: number, from: number, to: number) {
  return clamp((p - from) / (to - from), 0, 1);
}

/** Evenly spaced band centers for `n` scroll steps across progress 0..1. */
export function stepCenters(n: number) {
  return Array.from({ length: n }, (_, i) => (i + 0.5) / n);
}

/**
 * Like `triangle`, but the first/last step plateaus at full opacity instead
 * of fading at the very start/end of the scroll range.
 */
export function edgeAwareStepOpacity(
  p: number,
  index: number,
  count: number,
  centers: number[],
  halfWidth: number
) {
  if (index === 0 && p <= centers[0]) return 1;
  if (index === count - 1 && p >= centers[count - 1]) return 1;
  return triangle(p, centers[index], halfWidth);
}

/**
 * Signed, unclamped-ish "distance from this step's center" in half-widths:
 * 0 at the center (arrived, holding still), negative while still approaching,
 * positive once departing toward the next step. Used to drive directional
 * drift/blur so a transition reads as continuous travel rather than a flat
 * crossfade. Clamped to +/-limit so drift doesn't grow without bound while
 * a stage is fully hidden. The first/last step never "approaches"/"departs"
 * past the very start/end of the whole scroll range, mirroring
 * `edgeAwareStepOpacity`'s edge handling.
 */
export function signedStepProgress(
  p: number,
  index: number,
  count: number,
  centers: number[],
  halfWidth: number,
  limit = 1.6
) {
  if (index === 0 && p <= centers[0]) return 0;
  if (index === count - 1 && p >= centers[count - 1]) return 0;
  return clamp((p - centers[index]) / halfWidth, -limit, limit);
}
