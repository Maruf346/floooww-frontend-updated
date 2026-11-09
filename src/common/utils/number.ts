/** Formats a number with Indian digit grouping (₹4,12,800). */
export function formatIndian(value: number, fractionDigits = 0): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}
