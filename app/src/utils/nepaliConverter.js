/**
 * Convert Arabic numerals to Nepali numerals
 * 0-9 → ०-९
 */
export const toNepaliNumber = (value) => {
  if (!value && value !== 0) return "०";
  const nepaliDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return String(value)
    .split("")
    .map((digit) => nepaliDigits[Number(digit)] || digit)
    .join("");
};

/**
 * Normalize slug by decoding URI and converting hyphens to spaces
 */
export const normalizeSlug = (slug) => {
  if (!slug) return "";
  return decodeURIComponent(slug).replace(/-/g, " ");
};
