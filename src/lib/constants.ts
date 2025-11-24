/**
 * Base path configuration for GitHub Pages deployment
 * This MUST match the repository name
 */
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const REPO_NAME = '20XX-Love-Chronicles';
export const BASE_PATH = IS_PRODUCTION ? `/${REPO_NAME}` : '';
