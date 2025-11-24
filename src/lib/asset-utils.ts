/**
 * Get the asset path with the correct base path for GitHub Pages deployment
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // In production on GitHub Pages, prepend the base path
  const basePath = process.env.NODE_ENV === 'production' ? '/20XX-Love-Chronicles' : '';

  return `${basePath}/${cleanPath}`;
}

/**
 * Get the data path (for files in /public/data/)
 */
export function getDataPath(path: string): string {
  return getAssetPath(`data/${path}`);
}
