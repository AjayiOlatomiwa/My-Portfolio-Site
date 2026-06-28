/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Parses any YouTube link (youtu.be, youtube.com/watch, embed, etc.)
 * and returns a clean, secure YouTube Embed URL with standard parameters.
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  
  // Support YouTube Shorts URLs
  if (url.includes('/shorts/')) {
    const parts = url.split('/shorts/');
    if (parts.length > 1) {
      const id = parts[1].split(/[?&#]/)[0];
      if (id) {
        return `https://www.youtube.com/embed/${id}?rel=0&showinfo=0&autoplay=1&enablejsapi=1`;
      }
    }
  }
  
  // Regular expression to match standard YouTube URLs and extract the 11-char video ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    const videoId = match[2];
    return `https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=1&enablejsapi=1`;
  }
  return null;
}
