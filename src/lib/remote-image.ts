/**
 * Externe URL's (o.a. Unsplash) laten we niet door de Next.js Image Optimizer gaan:
 * die proxy geeft op sommige omgevingen lege/broken responses, terwijl de browser
 * dezelfde URL wél correct laadt.
 */
export function remoteImageProps(src: string): { unoptimized?: true } {
  if (/^https?:\/\//i.test(src)) {
    return { unoptimized: true };
  }
  return {};
}
