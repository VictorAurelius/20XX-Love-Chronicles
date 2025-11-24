import { BASE_PATH } from './constants';

/**
 * Get the asset path with the correct base path for GitHub Pages deployment
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return BASE_PATH ? `${BASE_PATH}/${cleanPath}` : `/${cleanPath}`;
}

/**
 * Get the data path (for files in /public/data/)
 */
export function getDataPath(path: string): string {
  return getAssetPath(`data/${path}`);
}
