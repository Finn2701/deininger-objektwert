/**
 * Liest eine vom Menschen getippte Zahl im deutschen oder englischen Format:
 * "94,34", "94.34", "1.234,5", "1 234,5", "174,3". Ungültiges ergibt 0 (wie
 * bisher `Number(x) || 0`), damit fehlende oder kaputte Eingaben nie zu NaN
 * in einer Berechnung führen.
 */
export function parseDecimal(value: string | number | null | undefined): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (!value) return 0;

  let text = value.trim().replace(/\s+/g, "");
  if (!text) return 0;

  const hasComma = text.includes(",");
  const hasDot = text.includes(".");

  if (hasComma && hasDot) {
    // Das zuletzt stehende Zeichen ist das Dezimaltrennzeichen: "1.234,5" oder "1,234.5".
    const decimalIsComma = text.lastIndexOf(",") > text.lastIndexOf(".");
    text = decimalIsComma ? text.replace(/\./g, "").replace(",", ".") : text.replace(/,/g, "");
  } else if (hasComma) {
    text = text.replace(",", ".");
  } else if (hasDot && /^\d{1,3}(\.\d{3})+$/.test(text)) {
    // "1.234" oder "1.234.567" ist praktisch immer ein Tausenderpunkt, nie eine Dezimalzahl.
    text = text.replace(/\./g, "");
  }

  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : 0;
}
