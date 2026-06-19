/**
 * Image URL Fixer
 * Normalizes malformed CDN URLs from the data files
 */

const CDN_BASE = "https://npcdn.ratopati.com";
const PLACEHOLDER = "/assets/images/placeholder.png";

/**
 * Fix image URL by converting malformed ../npcdn.ratopati.com paths
 * to proper https://npcdn.ratopati.com URLs
 */
export const fixImageUrl = (imageUrl) => {
  if (!imageUrl) return PLACEHOLDER;
  
  // If it's already a full URL, return it
  if (imageUrl.startsWith("http")) return imageUrl;
  
  // If it has the malformed prefix, fix it
  if (imageUrl.startsWith("../npcdn.ratopati.com")) {
    return imageUrl.replace(/^\.\.\/npcdn\.ratopati\.com/, CDN_BASE);
  }
  
  // If it's a relative path starting with /, return as-is
  if (imageUrl.startsWith("/")) return imageUrl;
  
  // Otherwise construct full CDN URL
  if (!imageUrl.startsWith(CDN_BASE)) {
    return `${CDN_BASE}/${imageUrl}`;
  }
  
  return imageUrl;
};

/**
 * Get image with fallback to placeholder
 */
export const getImageWithFallback = (imageUrl) => {
  return fixImageUrl(imageUrl) || PLACEHOLDER;
};
