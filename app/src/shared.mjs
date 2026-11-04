/**
 * Shared styling, fonts, and client scripts for Sanil Mishra's Portfolio
 * Futuristic typography, dark-mode atmosphere, subtle grid lines, and interactive animations.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TECH_TEXT_SCRIPT = fs.readFileSync(path.join(__dirname, 'tech-text-vanilla.mjs'), 'utf8')
  .replace(/export function initTechText/g, 'function initTechText');

export const TABLER_ICONS = {
  'cpu': `<path d="M5 5m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" /><path d="M9 9h6v6h-6z" /><path d="M3 10h2" /><path d="M3 14h2" /><path d="M10 3v2" /><path d="M14 3v2" /><path d="M21 10h-2" /><path d="M21 14h-2" /><path d="M14 21v-2" /><path d="M10 21v-2" />`,
  'bolt': `<path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0z" />`,
  'brain': `<path d="M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8" /><path d="M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8" /><path d="M17.5 16a3.5 3.5 0 0 0 0 -7h-.5" /><path d="M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0" /><path d="M6.5 16a3.5 3.5 0 0 1 0 -7h.5" /><path d="M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v1" /><path d="M12 12v1" />`,
  'sparkles': `<path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />`,
  'robot': `<path d="M6 4m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /><path d="M12 2v2" /><path d="M9 12v9" /><path d="M15 12v9" /><path d="M5 16l4 -2" /><path d="M15 14l4 2" /><path d="M9 18h6" /><path d="M10 8v.01" /><path d="M14 8v.01" />`,
  'shield-lock': `<path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /><path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12l0 2.5" />`,
  'database': `<path d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0" /><path d="M4 6v6a8 3 0 0 0 16 0v-6" /><path d="M4 12v6a8 3 0 0 0 16 0v-6" />`,
  'database-search': `<path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" /><path d="M4 6v6c0 1.657 3.582 3 8 3m8 -3.5v-5.5" /><path d="M4 12v6c0 1.657 3.582 3 8 3" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" />`,
  'world-search': `<path d="M21 12a9 9 0 1 0 -9 9" /><path d="M3.6 9h16.8" /><path d="M3.6 15h7.9" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a16.98 16.98 0 0 1 2.55 8.24" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" />`,
  'file-search': `<path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M12 21h-5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v4.5" /><path d="M16.5 17.5m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" /><path d="M18.5 19.5l2.5 2.5" />`,
  'hierarchy': `<path d="M12 3m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M5 21m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 21m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M10 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M12 5v5" /><path d="M12 14v5" /><path d="M5 19v-2a3 3 0 0 1 3 -3h2" /><path d="M19 19v-2a3 3 0 0 0 -3 -3h-2" />`,
  'git-merge': `<path d="M7 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M7 8v8" /><path d="M7 16a9 9 0 0 1 8 -4" />`,
  'vector': `<path d="M10 5.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1 -5 0z" /><path d="M3 18.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1 -5 0z" /><path d="M17 18.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1 -5 0z" /><path d="M6.5 16.5l3.5 -8.5" /><path d="M14 8l3.5 8.5" /><path d="M8 18.5h8" />`,
  'scan-eye': `<path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />`,
  'chart-dots-3': `<path d="M3 3v18h18" /><path d="M9 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M19 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M14 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M10.16 10.62l2.68 3.08" /><path d="M15.5 13.5l2.5 -5" />`,
  'server': `<path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" /><path d="M3 12m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" /><path d="M7 8l0 .01" /><path d="M7 16l0 .01" />`,
  'api': `<path d="M4 13h5" /><path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3" /><path d="M20 8v8" /><path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5" />`,
  'microscope': `<path d="M5 21h14" /><path d="M6 18h2" /><path d="M7 18v3" /><path d="M9 11l3 3l6 -6l-3 -3z" /><path d="M10.5 12.5l-1.5 1.5" /><path d="M17 3l3 3" /><path d="M12 21a6 6 0 0 0 3.715 -10.712" />`,
  'download': `<path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" />`,
  'arrow-up-right': `<path d="M17 7l-10 10" /><path d="M8 7l9 0l0 9" />`,
  'mail': `<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" />`,
  'phone': `<path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 7a2 2 0 0 1 2 2" /><path d="M15 3a6 6 0 0 1 6 6" />`,
  'map-pin': `<path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />`,
  'brand-github': `<path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />`,
  'brand-linkedin': `<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M8 11l0 5" /><path d="M8 8l0 .01" /><path d="M12 16l0 -5" /><path d="M16 16v-3a2 2 0 0 0 -4 0" />`,
  'target': `<path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 7a5 5 0 1 0 5 5" /><path d="M13 3.055a9 9 0 1 0 7.941 7.945" /><path d="M15 6v3h3l3 -3h-3v-3z" /><path d="M15 9l-3 3" />`,
  'viewfinder': `<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 3l0 4" /><path d="M12 21l0 -4" /><path d="M3 12l4 0" /><path d="M21 12l-4 0" /><path d="M12 12l.01 0" />`,
  'users': `<path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />`,
  'school': `<path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />`,
  'certificate': `<path d="M15 15m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M13 17.5v4.5l2 -1.5l2 1.5v-4.5" /><path d="M10 19h-5a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73" /><path d="M6 9h12" /><path d="M6 12h3" /><path d="M6 15h2" />`,
  'check': `<path d="M5 12l5 5l10 -10" />`,
  'code': `<path d="M7 8l-4 4l4 4" /><path d="M17 8l4 4l-4 4" /><path d="M14 4l-4 16" />`,
  'link': `<path d="M9 15l6 -6" /><path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" /><path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.996 4.996 0 0 1 0 -7.071l.524 -.463" />`,
  'brand-python': `<path d="M12 9h-7a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h3v-2a2 2 0 0 1 2 -2h4a1 1 0 0 0 1 -1v-4a2 2 0 0 0 -2 -2h-1" /><path d="M12 15h7a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-3v2a2 2 0 0 1 -2 2h-4a1 1 0 0 0 -1 1v4a2 2 0 0 0 2 2h1" /><circle cx="9" cy="9" r="0.5" fill="currentColor" /><circle cx="15" cy="15" r="0.5" fill="currentColor" />`,
  'terminal-2': `<path d="M8 9l3 3l-3 3" /><path d="M13 15l3 0" /><path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />`,
  'stack-2': `<path d="M12 4l-8 4l8 4l8 -4l-8 -4" /><path d="M4 12l8 4l8 -4" /><path d="M4 16l8 4l8 -4" />`,
  'file-text': `<path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 9l1 0" /><path d="M9 13l6 0" /><path d="M9 17l6 0" />`,
  'chart-bar': `<path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M4 20l14 0" />`,
  'chart-line': `<path d="M4 19l16 0" /><path d="M4 15l4 -6l4 2l4 -5l4 4" />`,
  'briefcase': `<path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" />`,
  'award': `<path d="M12 9m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" /><path d="M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889" /><path d="M6.802 12.001l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889" />`,
  'shield-check': `<path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /><path d="M9 12l2 2l4 -4" />`,
  'arrows-exchange': `<path d="M7 10h14l-4 -4" /><path d="M17 14h-14l4 4" />`,
  'clock': `<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 7v5l3 3" />`,
  'calendar': `<path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" />`,
  'brand-docker': `<path d="M22 12.54c-1.804 -.345 -2.701 -1.08 -3.523 -2.94c-.033 -.074 -.068 -.15 -.104 -.226c-1.74 -3.61 -6.06 -2.64 -6.269 -.43c-2.457 -.415 -5.19 1.127 -6.054 3.636c-.464 1.35 -.26 3.12 1.05 4.34c-1.28 .43 -2.48 1.09 -3.55 1.95c-.86 .69 -1.55 1.54 -2.05 2.52c-.5 1 -1.05 2.14 -1.5 3.32h21.84c.05 -.46 .08 -.92 .08 -1.39c0 -3.66 -1.97 -6.84 -5.93 -8.87z" /><path d="M5 16h2v-2h-2z" /><path d="M8 16h2v-2h-2z" /><path d="M11 16h2v-2h-2z" /><path d="M8 13h2v-2h-2z" /><path d="M11 13h2v-2h-2z" /><path d="M14 13h2v-2h-2z" />`,
  'x': `<path d="M18 6l-12 12" /><path d="M6 6l12 12" />`,
  'search': `<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />`,
  'chevron-right': `<path d="M9 6l6 6l-6 6" />`,
  'chevron-down': `<path d="M6 9l6 6l6 -6" />`,
  'filter': `<path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-9l-4.414 -4.414a2 2 0 0 1 -.586 -1.414v-2.172z" />`,
  'star': `<path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />`,
  'quote': `<path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" /><path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5" />`
};

export function tabler(name, size = 20, stroke = 2, extraClass = '') {
  const content = TABLER_ICONS[name] || TABLER_ICONS['cpu'];
  return `<svg class="tabler-icon ${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`;
}

export function tablerSvg(name, x = 0, y = 0, size = 16, color = 'currentColor', stroke = 2) {
  const content = TABLER_ICONS[name] || TABLER_ICONS['cpu'];
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`;
}

export function renderPixelHeadingText(text, mode = 'wave') {
  const PIXEL_FONTS = [
    'font-pixel-square',
    'font-pixel-grid',
    'font-pixel-circle',
    'font-pixel-triangle',
    'font-pixel-line'
  ];
  const PHI = (1 + Math.sqrt(5)) / 2;
  const FONT_COUNT = PIXEL_FONTS.length;

  let vi = 0;
  let html = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === ' ') {
      html += ' ';
    } else {
      let initialIdx = 0;
      if (mode === 'wave') {
        initialIdx = vi % FONT_COUNT;
      } else {
        initialIdx = Math.floor((vi * PHI * FONT_COUNT) % FONT_COUNT);
      }
      const fontClass = PIXEL_FONTS[initialIdx];
      const safeCh = ch === '&' ? '&amp;' : (ch === '<' ? '&lt;' : (ch === '>' ? '&gt;' : ch));
      html += `<span class="pixel-char ${fontClass}" data-char-idx="${vi}" aria-hidden="true">${safeCh}</span>`;
      vi++;
    }
  }
  return html;
}

export const FONTS_HEAD = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Gasoek+One&family=Geist+Mono:wght@200;300;400;500;700&family=IBM+Plex+Mono:wght@300;400;500&family=Inter:wght@200;300;400;500;600;700;800&family=Pixelify+Sans:wght@400..700&family=Silkscreen:wght@400;700&family=VT323&display=swap" rel="stylesheet">
`;

export const BASE_CSS = `
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'Geist Mono', 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
  --font-logo: 'Gasoek One', 'Inter', sans-serif;
  --font-pixel-square: 'Silkscreen', 'Pixelify Sans', monospace;
  --font-pixel-grid: 'DotGothic16', monospace;
  --font-pixel-circle: 'Pixelify Sans', 'DotGothic16', monospace;
  --font-pixel-triangle: 'VT323', monospace;
  --font-pixel-line: 'Geist Mono', 'IBM Plex Mono', monospace;
  --bg-dark: #060606;
  --bg-surface: #0c0c0c;
  --bg-card: #121212;
  --bg-card-hover: #171717;
  --bg-light: #ffffff;
  --bg-light-soft: #f7f7f9;
  --text-white: #ffffff;
  --text-muted: #ffffff99;
  --text-subtle: #ffffff59;
  --text-dark: #060606;
  --text-dark-muted: #555555;
  --accent-purple: #b388ff;
  --accent-purple-glow: rgba(179, 136, 255, 0.22);
  --accent-green: #00e676;
  --accent-green-glow: rgba(0, 230, 118, 0.22);
  --accent-blue: #29b6f6;
  --accent-amber: #ffb300;
  --accent-pink: #ff4081;
  --border-subtle: rgba(255, 255, 255, 0.07);
  --border-hover: rgba(179, 136, 255, 0.35);
  --border-light: rgba(0, 0, 0, 0.08);
  --radius-pill: 9999px;
  --radius-lg: 16px;
  --radius-md: 10px;
  --radius-sm: 6px;
  --transition-smooth: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
  background-color: var(--bg-dark);
}

body {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-dark);
  color: var(--text-white);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  overflow-x: hidden;
}

a {
  text-decoration: none;
  color: inherit;
  transition: var(--transition-smooth);
}

ul {
  list-style: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
  transition: var(--transition-smooth);
}

/* Background Grids & Patterns */
.sec-grid-dark {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 25% 360px;
  z-index: 0;
}

.sec-light-tint {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.02);
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
  background-size: 25% 360px;
  z-index: 0;
}

.dot-matrix-dark {
  background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}

.dot-matrix-light {
  background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px);
  background-size: 16px 16px;
}

/* Layout Utilities */
.container {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 2;
}

.section {
  position: relative;
  padding: 100px 0;
  overflow: hidden;
}

.section-light {
  background-color: #ffffff;
  color: var(--text-dark);
}

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-purple);
  margin-bottom: 16px;
}

.section-title {
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 20px;
}

.section-desc {
  font-size: clamp(1rem, 1.5vw, 1.15rem);
  color: var(--text-muted);
  max-width: 680px;
  line-height: 1.7;
}

.section-light .section-desc {
  color: var(--text-dark-muted);
}

.section-light .section-label {
  color: #5b21b6;
}

/* Header & Nav — Supaste Notch + macOS Dock Magnification */
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.nav-notch-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

/* Inverted liquid corner fillets connecting top of viewport to the black notch */
.nav-notch-wrap::before,
.nav-notch-wrap::after {
  content: '';
  position: absolute;
  top: 0;
  width: 28px;
  height: 28px;
  pointer-events: none;
}

.nav-notch-wrap::before {
  left: -28px;
  background: radial-gradient(circle at 0 100%, transparent 28px, #040404 28.5px);
}

.nav-notch-wrap::after {
  right: -28px;
  background: radial-gradient(circle at 100% 100%, transparent 28px, #040404 28.5px);
}

.nav-container {
  position: relative;
  background: #040404;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 1px solid rgba(255, 255, 255, 0.06);
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0 0 28px 28px;
  padding: 10px 26px 12px;
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 36px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.78), 0 1px 0 rgba(255, 255, 255, 0.04) inset;
  transition: padding 0.25s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
}

.nav-container:hover {
  box-shadow: 0 22px 58px rgba(0, 0, 0, 0.9), 0 0 28px rgba(179, 136, 255, 0.12);
}

.nav-logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transform-origin: center center;
  will-change: transform;
}

.nav-logo-img {
  height: clamp(30px, 3.5vw, 36px);
  width: auto;
  max-width: 165px;
  object-fit: contain;
  display: block;
  transition: filter 0.3s ease;
  filter: drop-shadow(0 2px 8px rgba(179, 136, 255, 0.3));
}

.nav-logo:hover .nav-logo-img {
  filter: drop-shadow(0 4px 16px rgba(179, 136, 255, 0.65));
}

.footer-logo-img {
  height: clamp(38px, 4.5vw, 48px);
  width: auto;
  max-width: 220px;
  object-fit: contain;
  display: block;
  transition: transform 0.3s ease, filter 0.3s ease;
  filter: drop-shadow(0 2px 10px rgba(179, 136, 255, 0.35));
}

.footer-logo-img:hover {
  transform: scale(1.03);
  filter: drop-shadow(0 4px 18px rgba(179, 136, 255, 0.65));
}

.nav-logo-icon {
  width: 28px;
  height: 28px;
  background: #ffffff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #060606;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-link {
  font-size: 0.82rem;
  font-weight: 500;
  color: #a0a0ab;
  position: relative;
  padding: 6px 14px;
  border-radius: 9999px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transform-origin: center center;
  will-change: transform;
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  transition: color 0.2s ease, background 0.25s ease, box-shadow 0.25s ease;
  z-index: 1;
  --glow-x: 50%;
  --glow-y: 50%;
}

/* BorderGlow edge glow — Whitish Silver metallic shine */
.nav-link::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 9999px;
  padding: 1.5px;
  background: radial-gradient(circle 52px at var(--glow-x, 50%) var(--glow-y, 50%), #ffffff 0%, rgba(226, 232, 240, 0.9) 35%, rgba(148, 163, 184, 0.5) 70%, transparent 100%),
              linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(203, 213, 225, 0.2), rgba(255, 255, 255, 0.35));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.25s ease;
  pointer-events: none;
}

.nav-link:hover {
  color: #ffffff;
  background: rgba(18, 18, 22, 0.95);
  box-shadow: 
    0 0 16px rgba(255, 255, 255, 0.35),
    0 0 28px rgba(226, 232, 240, 0.18),
    0 4px 12px rgba(0, 0, 0, 0.7);
  z-index: 4;
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link.active {
  color: #ffffff;
  background: rgba(22, 22, 28, 0.9);
  box-shadow: 0 0 12px rgba(255, 255, 255, 0.2);
}

.nav-link.active::before {
  opacity: 0.85;
}

.dock-dot {
  position: absolute;
  bottom: -6px;
  width: 3.5px;
  height: 3.5px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
}

.nav-link.active .dock-dot {
  background: #ffffff;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
}

.nav-link:hover .dock-dot {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.2);
}

/* macOS Dock Bounce Keyframe */
@keyframes macDockBounce {
  0%   { transform: translateY(0) scale(var(--dock-scale, 1)); }
  30%  { transform: translateY(-8px) scale(calc(var(--dock-scale, 1) * 1.05)); }
  55%  { transform: translateY(0) scale(var(--dock-scale, 1)); }
  75%  { transform: translateY(-4px) scale(calc(var(--dock-scale, 1) * 1.02)); }
  100% { transform: translateY(0) scale(var(--dock-scale, 1)); }
}

.dock-item.dock-bouncing {
  animation: macDockBounce 0.55s cubic-bezier(0.28, 0.84, 0.42, 1);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-cta-pill {
  background: #ffffff !important;
  color: #060606 !important;
  border-radius: 9999px !important;
  padding: 8px 18px !important;
  font-weight: 600 !important;
  font-size: 0.84rem !important;
  letter-spacing: -0.01em;
  box-shadow: 0 2px 12px rgba(255, 255, 255, 0.14);
  transform-origin: center center;
  will-change: transform;
  border: none;
  transition: all 0.25s ease;
}

.nav-cta-pill:hover {
  background: #f4f4f7 !important;
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.4), 0 0 28px rgba(203, 213, 225, 0.25) !important;
  z-index: 4;
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 26px;
  border-radius: var(--radius-pill);
  background: #ffffff;
  color: #060606;
  font-weight: 600;
  font-size: 0.92rem;
  letter-spacing: -0.01em;
  transition: var(--transition-smooth);
}

.btn-primary:hover {
  background: #e8e8e8;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.15);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 26px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  border: 1px solid var(--border-subtle);
  font-weight: 500;
  font-size: 0.92rem;
  transition: var(--transition-smooth);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.btn-sm {
  padding: 8px 18px;
  border-radius: var(--radius-pill);
  font-size: 0.82rem;
}

/* Mobile Toggle */
.menu-toggle-btn {
  display: none;
  width: 40px;
  height: 40px;
  background: transparent;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  z-index: 120;
}

.menu-toggle-btn span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: #ffffff;
  transition: var(--transition-smooth);
}

.menu-toggle-btn.active span:nth-child(1) {
  transform: translateY(4px) rotate(45deg);
}

.menu-toggle-btn.active span:nth-child(2) {
  transform: translateY(-4px) rotate(-45deg);
}

/* Mobile Nav Drawer */
.nav-drawer {
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #060606f5;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 99;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  gap: 20px;
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}

.nav-drawer.open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.drawer-link {
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--text-white);
  padding: 12px 0;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-link:hover {
  color: var(--accent-purple);
}

/* Card Styles */
.card-dark {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 32px;
  transition: var(--transition-smooth);
  position: relative;
  overflow: hidden;
}

.card-dark:hover {
  border-color: var(--border-hover);
  box-shadow: 0 16px 40px -12px var(--accent-purple-glow);
  transform: translateY(-4px);
}

.card-light {
  background: #ffffff;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: var(--transition-smooth);
}

.card-light:hover {
  border-color: rgba(91, 33, 182, 0.3);
  box-shadow: 0 16px 40px -12px rgba(91, 33, 182, 0.12);
  transform: translateY(-4px);
}

/* Chips & Badges */
.badge-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  color: var(--text-muted);
}

.badge-tag.accent-purple {
  background: rgba(179, 136, 255, 0.1);
  border-color: rgba(179, 136, 255, 0.25);
  color: var(--accent-purple);
}

.badge-tag.accent-green {
  background: rgba(0, 230, 118, 0.1);
  border-color: rgba(0, 230, 118, 0.25);
  color: var(--accent-green);
}

.badge-tag.accent-blue {
  background: rgba(41, 182, 246, 0.1);
  border-color: rgba(41, 182, 246, 0.25);
  color: var(--accent-blue);
}

/* Filter Tab Chips */
.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 40px;
}

.filter-btn {
  padding: 10px 18px;
  border-radius: var(--radius-pill);
  font-size: 0.88rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-muted);
  border: 1px solid var(--border-subtle);
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.filter-btn.active {
  background: #ffffff;
  color: #060606;
  border-color: #ffffff;
  font-weight: 600;
}

/* Accordion FAQ */
.faq-item {
  border-bottom: 1px solid var(--border-light);
  padding: 24px 0;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.faq-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.faq-question {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-dark);
}

.faq-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease;
  opacity: 0;
  color: var(--text-dark-muted);
  font-size: 1rem;
  line-height: 1.7;
}

.faq-item.open .faq-answer {
  max-height: 400px;
  opacity: 1;
  margin-top: 14px;
}

.faq-item.open .faq-icon {
  transform: rotate(45deg);
  background: #060606;
  color: #ffffff;
  border-color: #060606;
}

/* Footer Tail */
.footer {
  background-color: var(--bg-dark);
  border-top: 1px solid var(--border-subtle);
  padding: 80px 0 40px;
  position: relative;
  overflow: hidden;
}

.footer-giant-brand {
  font-family: var(--font-logo);
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.9;
  color: rgba(255, 255, 255, 0.04);
  text-align: center;
  pointer-events: none;
  user-select: none;
  margin-bottom: 40px;
  letter-spacing: -0.02em;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 48px;
  margin-bottom: 60px;
}

.footer-col h5 {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-subtle);
  margin-bottom: 20px;
}

.footer-col ul {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-col ul li a {
  color: var(--text-muted);
  font-size: 0.92rem;
}

.footer-col ul li a:hover {
  color: #ffffff;
}

.footer-bottom {
  padding-top: 32px;
  border-top: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 0.85rem;
  color: var(--text-subtle);
}

/* Form Styles */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
}

.form-input, .form-textarea {
  width: 100%;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  color: #ffffff;
  font-family: inherit;
  font-size: 0.95rem;
  outline: none;
  transition: var(--transition-smooth);
}

.form-input:focus, .form-textarea:focus {
  border-color: var(--accent-purple);
  box-shadow: 0 0 0 3px rgba(179, 136, 255, 0.15);
  background: rgba(255, 255, 255, 0.05);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

/* Toast Message */
.toast-msg {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: #00e676;
  color: #060606;
  padding: 14px 24px;
  border-radius: var(--radius-pill);
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 10px 30px rgba(0, 230, 118, 0.3);
  z-index: 999;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
  opacity: 0;
  pointer-events: none;
}

.toast-msg.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* Responsive Breakpoints */
@media (max-width: 1024px) {
  .nav-links {
    display: none;
  }
  .nav-notch-wrap {
    width: calc(100% - 32px);
    max-width: 680px;
  }
  .nav-container {
    width: 100%;
    padding: 10px 20px;
    gap: 16px;
  }
  .menu-toggle-btn {
    display: flex;
  }
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .section {
    padding: 70px 0;
  }
}

/* ==========================================================================
   INK ORBIT BENTO & LIVE WORKFLOW DIAGRAMS (Inspired by InkOrbitFeatures)
   ========================================================================== */
.ib-root {
  --ib-page: #060606;
  --ib-hatch: rgba(255, 255, 255, 0.035);
  --ib-paper: #0b0b0b;
  --ib-card: #121212;
  --ib-raise: #171717;
  --ib-ink: #ffffff;
  --ib-soft: #c9c9c9;
  --ib-muted: #8d8d8d;
  --ib-faint: #5d5d5d;
  --ib-line: rgba(255, 255, 255, 0.08);
  --ib-line-strong: rgba(255, 255, 255, 0.16);
  --ib-bracket: rgba(179, 136, 255, 0.45);
  --ib-inv: #ffffff;
  --ib-inv-ink: #060606;
  --ib-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 16px 36px -12px rgba(0, 0, 0, 0.7);
  --ib-sans: var(--font-sans);
  --ib-mono: var(--font-mono);
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--ib-page);
  background-image: repeating-linear-gradient(135deg, var(--ib-hatch) 0 1px, transparent 1px 12px);
  color: var(--ib-ink);
  font-family: var(--ib-sans);
  font-size: 15px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  padding: 40px clamp(10px, 2.4vw, 28px);
  transition: background-color 0.45s ease, color 0.45s ease;
}

.ib-shell {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.ib-sec {
  position: relative;
  background: var(--ib-paper);
  border: 1px solid var(--ib-line);
  border-radius: var(--radius-lg);
  padding: clamp(32px, 5vw, 64px) clamp(16px, 3.5vw, 44px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.ib-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  margin-bottom: clamp(28px, 4vw, 48px);
  position: relative;
  z-index: 2;
}

.ib-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-purple);
  background: rgba(179, 136, 255, 0.08);
  border: 1px solid rgba(179, 136, 255, 0.25);
  border-radius: var(--radius-pill);
}

.ib-h2 {
  font-size: clamp(2rem, 3.8vw, 3.4rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 700;
  color: #ffffff;
}

.ib-muted {
  color: var(--ib-faint);
}

.ib-frame {
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Tactical CAD Corner Brackets */
.ib-c {
  position: absolute;
  width: 12px;
  height: 12px;
  border-color: var(--ib-bracket);
  border-style: solid;
  border-width: 0;
  pointer-events: none;
  z-index: 10;
  transition: border-color 0.3s ease, transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.ib-c-tl {
  top: -5px;
  left: -5px;
  border-top-width: 2px;
  border-left-width: 2px;
}

.ib-c-tr {
  top: -5px;
  right: -5px;
  border-top-width: 2px;
  border-right-width: 2px;
}

.ib-c-bl {
  bottom: -5px;
  left: -5px;
  border-bottom-width: 2px;
  border-left-width: 2px;
}

.ib-c-br {
  bottom: -5px;
  right: -5px;
  border-bottom-width: 2px;
  border-right-width: 2px;
}

.ib-frame-hover:hover > .ib-c {
  border-color: var(--accent-purple);
}

.ib-frame-hover:hover > .ib-c-tl {
  transform: translate(-3px, -3px);
}

.ib-frame-hover:hover > .ib-c-tr {
  transform: translate(3px, -3px);
}

.ib-frame-hover:hover > .ib-c-bl {
  transform: translate(-3px, 3px);
}

.ib-frame-hover:hover > .ib-c-br {
  transform: translate(3px, 3px);
}

/* Bento Grid */
.ib-bento {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(20px, 2.5vw, 32px);
  position: relative;
  z-index: 2;
}

.ib-wide {
  grid-column: 1 / -1;
  width: 100%;
}

.ib-card {
  background: linear-gradient(180deg, var(--ib-raise), var(--ib-card));
  border: 1px solid var(--ib-line);
  border-radius: var(--radius-lg);
  padding: clamp(20px, 2.5vw, 28px);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: border-color 0.3s ease, box-shadow 0.35s ease, transform 0.3s ease;
  position: relative;
  overflow: hidden;
  flex: 1;
}

.ib-card:hover {
  border-color: rgba(179, 136, 255, 0.4);
  box-shadow: 0 16px 40px -10px var(--accent-purple-glow);
}

.ib-card h3 {
  font-size: 1.18rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #ffffff;
  margin-bottom: 6px;
}

.ib-card p {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--ib-muted);
}

/* Interactive Tabs inside Bento */
.ib-tab-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  padding: 5px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--ib-line);
  margin-bottom: 8px;
}

.ib-tab-btn {
  padding: 8px 16px;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 700;
  border-radius: var(--radius-sm);
  color: #a1a1aa;
  background: transparent;
  transition: all 0.25s ease;
  cursor: pointer;
  letter-spacing: -0.01em;
}

.ib-tab-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.ib-tab-btn.active {
  color: #060606;
  background: #ffffff;
  font-weight: 700;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.35);
}

/* SVG Flow Diagram */
.ib-diagram {
  width: 100%;
  height: auto;
  overflow: visible;
  display: block;
}

.ib-flow {
  stroke: rgba(179, 136, 255, 0.45);
  fill: none;
  stroke-width: 1.8;
  transition: stroke 0.3s ease, filter 0.3s ease;
}

.ib-flow-on {
  stroke: var(--accent-purple);
  filter: drop-shadow(0 0 5px rgba(179, 136, 255, 0.65));
}

.ib-dash {
  stroke-dasharray: 4 5;
  animation: ib-dash 1.4s linear infinite;
}

.ib-pkt {
  fill: var(--accent-green);
  filter: drop-shadow(0 0 6px var(--accent-green));
}

.ib-node {
  fill: var(--ib-raise);
  stroke: var(--ib-line-strong);
  transition: stroke 0.3s ease, transform 0.3s ease;
}

.ib-node:hover {
  stroke: var(--accent-purple);
}

.ib-glow {
  animation: ib-pulse 2.2s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}

@keyframes ib-dash {
  to { stroke-dashoffset: -18; }
}

@keyframes ib-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(1.15); }
}

/* Output Live Printed Sheets */
.ib-sheet {
  transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.7s;
}

.ib-sheet-new {
  animation: ib-sheet-in 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes ib-sheet-in {
  from { opacity: 0; transform: translate(14px, -10px) rotate(4deg); }
  to { opacity: 1; transform: none; }
}

/* Tool Ecosystem Nodes */
.ib-tool {
  cursor: pointer;
}

.ib-tool rect.ib-node {
  transition: stroke 0.3s ease, fill 0.3s ease, filter 0.3s ease;
}

.ib-tool:hover rect.ib-node {
  stroke: var(--accent-purple);
  fill: rgba(179, 136, 255, 0.12);
}

.ib-tool-on rect.ib-node {
  stroke: var(--accent-purple);
  stroke-width: 1.6;
  fill: rgba(179, 136, 255, 0.18);
  filter: drop-shadow(0 0 12px rgba(179, 136, 255, 0.65));
}

.ib-tool-wire {
  stroke: rgba(255, 255, 255, 0.14);
  fill: none;
  stroke-width: 1.4;
  stroke-dasharray: 4 4;
  transition: stroke 0.3s ease, stroke-width 0.3s ease, filter 0.3s ease;
}

.ib-tool-wire.ib-flow-on {
  stroke: var(--accent-purple);
  stroke-width: 2.2;
  stroke-dasharray: none;
  filter: drop-shadow(0 0 7px rgba(179, 136, 255, 0.9));
}

.ib-tool-pkt {
  fill: var(--accent-green);
  opacity: 0.2;
  transition: opacity 0.3s ease;
}

.ib-tool-pkt.ib-pkt-on {
  opacity: 1;
  fill: #00e676;
  filter: drop-shadow(0 0 8px #00e676);
}

/* Chart Scrubbing */
.ib-chart-wrap {
  position: relative;
  width: 100%;
}

.ib-chart {
  cursor: crosshair;
  user-select: none;
  width: 100%;
  height: auto;
}

.ib-line-draw {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 1.8s cubic-bezier(0.4, 0.1, 0.2, 1);
}

.ib-scrub-guide {
  stroke: rgba(179, 136, 255, 0.6);
  stroke-dasharray: 2 3;
  pointer-events: none;
}

.ib-scrub-dot {
  fill: #b388ff;
  stroke: #ffffff;
  stroke-width: 2px;
  filter: drop-shadow(0 0 8px rgba(179, 136, 255, 0.9));
  transition: cx 0.08s ease, cy 0.08s ease;
  pointer-events: none;
}

.ib-chart-pill {
  position: absolute;
  padding: 5px 12px;
  background: #ffffff;
  color: #060606;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 600;
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -130%);
  transition: left 0.08s ease, top 0.08s ease, opacity 0.2s ease;
  opacity: 0;
  z-index: 20;
}

.ib-chart-pill.active {
  opacity: 1;
}

/* TechText Blueprint Canvas Styles */
.tech-text {
  position: relative;
  width: 100%;
  height: 100%;
  touch-action: pan-y;
  user-select: none;
  letter-spacing: normal !important;
}

.tech-text-canvas {
  display: block;
  width: 100%;
  height: 100%;
  letter-spacing: normal !important;
}

@media (max-width: 900px) {
  .ib-bento {
    grid-template-columns: 1fr;
  }
}
`;

export function renderClientScript() {
  const serializedIcons = JSON.stringify(TABLER_ICONS);
  return `
<script>
const CLIENT_ICONS = ${serializedIcons};
function getTablerSvg(name, x = 0, y = 0, size = 16, color = 'currentColor', stroke = 2) {
  const path = CLIENT_ICONS[name] || CLIENT_ICONS['cpu'];
  return \`<svg x="\${x}" y="\${y}" width="\${size}" height="\${size}" viewBox="0 0 24 24" fill="none" stroke="\${color}" stroke-width="\${stroke}" stroke-linecap="round" stroke-linejoin="round">\${path}</svg>\`;
}

${TECH_TEXT_SCRIPT}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize React Bits TechText Blueprint Effect on Hero Name
  const heroTechContainer = document.getElementById('heroTechText');
  if (heroTechContainer) {
    initTechText(heroTechContainer, {
      text: 'Sanil Mishra',
      fontWeight: 800,
      fontSize: 140,
      reveal: 'letter',
      dashLength: 4,
      dashGap: 2,
      specks: 15,
      intro: 'none',
      introDuration: 2,
      clickKick: true,
      guides: false,
      fontFamily: '',
      letterSpacing: -0.04,
      accentColor: '#b388ff',
      reach: 200,
      softness: 0.7,
      lineStyle: 'dashed',
      strokeWidth: 1.5,
      speed: 1,
      bounce: 0.4,
      selection: true,
      labels: true,
      color: '#ffffff',
      align: 'left',
      draggable: true,
      sweep: true
    });
  }

  // Hero Video Autoplay Assurance
  const heroVideo = document.getElementById('heroVideoBg') || document.querySelector('.hero-video-bg');
  if (heroVideo) {
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }

  // 3D Mouse Parallax on Hero Video Background
  const heroSection = document.getElementById('heroSection') || document.querySelector('.hero-section');
  const heroOverlay = document.getElementById('heroVideoOverlay') || document.querySelector('.hero-video-overlay');

  if (heroSection && heroVideo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let animId = null;

    const loop = () => {
      // Smooth spring/lerp easing
      currentX += (targetX - currentX) * 0.055;
      currentY += (targetY - currentY) * 0.055;

      // Video translation & 3D tilt
      const vx = -currentX * 42;
      const vy = -currentY * 32;
      const rx = -currentY * 5.5;
      const ry = currentX * 5.5;

      heroVideo.style.transform =
        'translate(calc(-50% + ' + vx.toFixed(2) + 'px), calc(-50% + ' + vy.toFixed(2) + 'px)) ' +
        'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) scale(1.1)';

      if (heroOverlay) {
        const ox = -currentX * 16;
        const oy = -currentY * 12;
        heroOverlay.style.transform = 'translate3d(' + ox.toFixed(2) + 'px, ' + oy.toFixed(2) + 'px, 0)';
      }

      if (Math.abs(targetX - currentX) > 0.0003 || Math.abs(targetY - currentY) > 0.0003) {
        animId = requestAnimationFrame(loop);
      } else {
        animId = null;
      }
    };

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
      if (!animId) animId = requestAnimationFrame(loop);
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      if (!animId) animId = requestAnimationFrame(loop);
    }, { passive: true });
  }

  // Navigation Menu Drawer Toggle
  const toggleBtn = document.getElementById('menuToggleBtn');
  const drawer = document.getElementById('navDrawer');
  
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('active');
      drawer.classList.toggle('open');
      document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // macOS Dock Magnification & Bounce Physics on Navbar
  const macDock = document.getElementById('macDockNav');
  if (macDock && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const dockItems = Array.from(macDock.querySelectorAll('[data-dock-item]'));
    const DISTANCE = 140;
    const MAX_SCALE = 1.07;
    const MAX_LIFT = 2.5;
    let mouseX = -9999;
    let rafId = null;

    const currentScales = new Float32Array(dockItems.length).fill(1);
    const targetScales = new Float32Array(dockItems.length).fill(1);
    const currentLifts = new Float32Array(dockItems.length).fill(0);
    const targetLifts = new Float32Array(dockItems.length).fill(0);

    function computeDockTargets() {
      for (let i = 0; i < dockItems.length; i++) {
        if (mouseX < -1000) {
          targetScales[i] = 1;
          targetLifts[i] = 0;
          continue;
        }
        const rect = dockItems[i].getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const dist = Math.abs(mouseX - center);
        if (dist < DISTANCE) {
          const factor = Math.cos((dist / DISTANCE) * (Math.PI / 2));
          const smooth = factor * factor;
          targetScales[i] = 1 + (MAX_SCALE - 1) * smooth;
          targetLifts[i] = MAX_LIFT * smooth;
        } else {
          targetScales[i] = 1;
          targetLifts[i] = 0;
        }
      }
    }

    function animateDock() {
      computeDockTargets();
      let moving = false;
      for (let i = 0; i < dockItems.length; i++) {
        currentScales[i] += (targetScales[i] - currentScales[i]) * 0.22;
        currentLifts[i] += (targetLifts[i] - currentLifts[i]) * 0.22;

        if (Math.abs(targetScales[i] - currentScales[i]) > 0.001 || Math.abs(targetLifts[i] - currentLifts[i]) > 0.01) {
          moving = true;
        } else {
          currentScales[i] = targetScales[i];
          currentLifts[i] = targetLifts[i];
        }

        const el = dockItems[i];
        el.style.setProperty('--dock-scale', currentScales[i].toFixed(3));
        if (!el.classList.contains('dock-bouncing')) {
          if (currentScales[i] === 1 && currentLifts[i] === 0) {
            el.style.transform = '';
          } else {
            el.style.transform = 'translateY(' + currentLifts[i].toFixed(2) + 'px) scale(' + currentScales[i].toFixed(3) + ')';
          }
        }
      }
      if (moving) {
        rafId = requestAnimationFrame(animateDock);
      } else {
        rafId = null;
      }
    }

    macDock.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      if (!rafId) rafId = requestAnimationFrame(animateDock);
    }, { passive: true });

    macDock.addEventListener('mouseleave', () => {
      mouseX = -9999;
      if (!rafId) rafId = requestAnimationFrame(animateDock);
    }, { passive: true });

    dockItems.forEach((item) => {
      item.addEventListener('mousemove', (e) => {
        const r = item.getBoundingClientRect();
        item.style.setProperty('--glow-x', (e.clientX - r.left) + 'px');
        item.style.setProperty('--glow-y', (e.clientY - r.top) + 'px');
      }, { passive: true });

      item.addEventListener('click', () => {
        item.classList.remove('dock-bouncing');
        void item.offsetWidth;
        item.classList.add('dock-bouncing');
        setTimeout(() => item.classList.remove('dock-bouncing'), 560);
      });
    });
  }

  // Typewriter Animation for Hero Section with React Bits GlitchText Effect
  const typewriterEl = document.getElementById('typewriterText');
  const glitchWrapperEl = document.getElementById('glitchTextWrapper');
  if (typewriterEl) {
    const roles = [
      'Enterprise RAG Architect',
      'Agentic AI & LLM Specialist',
      'AI Engineer',
      'Multi-Agent Systems Developer',
      'Data Analyst & ML Engineer'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 85;

    function type() {
      const currentRole = roles[roleIdx];
      let newText = '';
      if (isDeleting) {
        newText = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 38;
      } else {
        newText = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 85;
      }

      typewriterEl.textContent = newText;
      if (glitchWrapperEl) {
        glitchWrapperEl.setAttribute('data-text', newText);
      }

      if (!isDeleting && charIdx === currentRole.length) {
        typingSpeed = 2400; // Pause at full word to display full glitch slicing effect
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next role
      }

      setTimeout(type, typingSpeed);
    }
    type();
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Project Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'All' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // Contact Form Submission Handler
  const contactForms = document.querySelectorAll('#contactForm, #contactFormOverlay');
  const toastMsg = document.getElementById('toastMsg');

  contactForms.forEach((contactForm) => {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.elements['name']?.value || '';
      const email = contactForm.elements['email']?.value || '';
      let message = contactForm.elements['message']?.value || '';
      const usecase = contactForm.elements['usecase']?.value || '';
      const timeline = contactForm.elements['timeline']?.value || '';
      if (usecase) message += '\\n\\nProject type: ' + usecase;
      if (timeline) message += '\\nTimeline: ' + timeline;

      // Direct mailto fallback
      const mailtoUrl = \`mailto:sanilmishra010@gmail.com?subject=Portfolio Inquiry from \${encodeURIComponent(name)}&body=\${encodeURIComponent(message + '\\n\\nFrom: ' + email)}\`;
      window.location.href = mailtoUrl;

      if (toastMsg) {
        toastMsg.textContent = 'Opening your email client to send message to sanilmishra010@gmail.com...';
        toastMsg.classList.add('show');
        setTimeout(() => toastMsg.classList.remove('show'), 5000);
      }
      contactForm.reset();
    });
  });

  // Expandable Contact Screen (Let's Work Together)
  const coBtn = document.getElementById('workTogetherBtn');
  const coOverlay = document.getElementById('contactOverlay');
  const coClose = document.getElementById('contactOverlayClose');
  if (coBtn && coOverlay) {
    let coOpen = false;
    const clipFromButton = () => {
      const r = coBtn.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      return 'inset(' + r.top + 'px ' + (vw - r.right) + 'px ' + (vh - r.bottom) + 'px ' + r.left + 'px round 100px)';
    };
    const openCo = () => {
      if (coOpen) return;
      coOpen = true;
      coOverlay.style.transition = 'none';
      coOverlay.style.clipPath = clipFromButton();
      coOverlay.classList.add('visible');
      coOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      void coOverlay.offsetWidth;
      coOverlay.style.transition = '';
      coOverlay.style.clipPath = 'inset(0px 0px 0px 0px round 0px)';
      coOverlay.classList.add('open');
      setTimeout(() => { const f = coOverlay.querySelector('input'); if (f) f.focus({ preventScroll: true }); }, 520);
    };
    const closeCo = () => {
      if (!coOpen) return;
      coOpen = false;
      coOverlay.classList.remove('open');
      coOverlay.style.clipPath = clipFromButton();
      setTimeout(() => {
        coOverlay.classList.remove('visible');
        coOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        coBtn.focus({ preventScroll: true });
      }, 560);
    };
    coBtn.addEventListener('click', openCo);
    if (coClose) coClose.addEventListener('click', closeCo);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCo(); });
  }

  // Pricing / Engagement Frequency Toggle
  const billingToggle = document.getElementById('billingToggle');
  if (billingToggle) {
    let yearly = false;
    billingToggle.addEventListener('click', () => {
      yearly = !yearly;
      billingToggle.classList.toggle('active', yearly);
      document.querySelectorAll('[data-price-monthly]').forEach(el => {
        const m = el.getAttribute('data-price-monthly');
        const y = el.getAttribute('data-price-yearly');
        el.textContent = yearly ? y : m;
      });
    });
  }

  // =========================================================================
  // INK ORBIT LIVE WORKFLOW & SYSTEM ARCHITECTURE INTERACTIVITY
  // =========================================================================
  
  // 1. Interactive Workflow Switcher (Enterprise RAG / Multi-Agent / Hybrid RAG)
  const WF_DATA = {
    enterprise: {
      hubTitle: 'NEMOTRON 3 PLANNER',
      hubSub: 'Bounded 3-Step GraphRAG',
      hubIcon: 'brain',
      leftNodes: [
        { label: 'JWT Auth & RBAC', sub: 'Header Token Verified', icon: 'shield-lock' },
        { label: 'PostgreSQL Store', sub: 'Conversation History', icon: 'database' },
        { label: 'User Knowledge Query', sub: 'Natural Language Input', icon: 'world-search' }
      ],
      rightNodes: [
        { label: 'pgvector Semantic', sub: '384-d dense vector cosine', icon: 'vector' },
        { label: 'tsvector Lexical', sub: 'BM25 keyword search', icon: 'file-search' },
        { label: 'GraphRAG Triples', sub: 'Entity relations (3 hops)', icon: 'hierarchy' },
        { label: 'RRF & Reranker', sub: 'Cross-Encoder scoring', icon: 'git-merge' }
      ],
      sheetHeader: 'ENTERPRISE RAG TRACE',
      sheets: [
        '[Query Rewriter] Intent isolated: "RBAC Bounded GraphRAG Traversal"',
        '[RRF Re-Ranker] Fused 5 pgvector chunks + 3 entity triples (score: 0.96)',
        '[Nemotron 3 Ultra] Grounding Score: 9.9/10 · Source citation verified'
      ],
      descLeft: 'User queries are authenticated with JWT and RBAC permissions, then rewritten with conversational context to extract deterministic intent.',
      descRight: 'Dispatches parallel retrieval across pgvector semantic chunks and GraphRAG knowledge triples, fused via RRF and cross-encoder reranked before Nemotron synthesis.'
    },
    multiagent: {
      hubTitle: 'SUPERVISOR AGENT',
      hubSub: 'LangChain State Graph',
      hubIcon: 'robot',
      leftNodes: [
        { label: 'Research Objective', sub: 'Autonomous User Prompt', icon: 'target' },
        { label: 'Tavily Search API', sub: 'Ranked Web Crawler', icon: 'world-search' },
        { label: 'HTML Sanitizer', sub: 'BeautifulSoup Cleaner', icon: 'filter' }
      ],
      rightNodes: [
        { label: '1. Research Agent', sub: 'Queries web & extracts data', icon: 'search' },
        { label: '2. Reader Agent', sub: 'Filters core insights', icon: 'file-text' },
        { label: '3. Writer Agent', sub: 'Synthesizes Gemini 2.5 draft', icon: 'sparkles' },
        { label: '4. Critic Agent', sub: 'Self-audit loop (Score 1-10)', icon: 'award' }
      ],
      sheetHeader: 'MULTI-AGENT SWARM TRACE',
      sheets: [
        '[Tavily Search] 8 source URLs fetched & ranked by topical relevance',
        '[Gemini 2.5 Writer] 1,450-word structured Markdown research report drafted',
        '[Critic Agent Audit] Quality Score: 9.6/10 -> Approved for final export'
      ],
      descLeft: 'Autonomous supervisor orchestrates tasks across specialized worker agents with dynamic state routing and structured execution graphs.',
      descRight: 'Independent Critic Agent scores drafts from 1 to 10; syntheses scoring below 8.0 are automatically looped back for targeted revision.'
    },
    hybridrag: {
      hubTitle: 'HYBRID EMBEDDING HUB',
      hubSub: 'Dense + BM25 Sparse Index',
      hubIcon: 'vector',
      leftNodes: [
        { label: 'Raw PDF Ingestion', sub: 'pypdf text extractor', icon: 'file-text' },
        { label: 'Recursive Splitter', sub: '~500 chars (overlap 50)', icon: 'stack-2' },
        { label: 'Token Cleaner', sub: 'Normalized whitespace', icon: 'check' }
      ],
      rightNodes: [
        { label: 'all-MiniLM-L6-v2', sub: 'HuggingFace 384-dim dense', icon: 'database-search' },
        { label: 'BM25 Sparse Model', sub: 'Term frequency scoring', icon: 'chart-bar' },
        { label: 'Pinecone Serverless', sub: 'Batched hybrid upsert', icon: 'database' },
        { label: 'Gemini 2.5 Flash', sub: 'Grounded streaming (temp 0.2)', icon: 'sparkles' }
      ],
      sheetHeader: 'HYBRID PINECONE TRACE',
      sheets: [
        '[pypdf Chunker] 54 text chunks extracted with 50-character overlap',
        '[Pinecone Hybrid] top-k=5 retrieved with dense+sparse alpha 0.5',
        '[Gemini 2.5 Stream] 100% grounded response with exact page-level citations'
      ],
      descLeft: 'Processes technical PDF documentation, splitting into semantic chunks with consistent overlap to preserve critical context.',
      descRight: 'Dual-encodes chunks into 384-d dense vectors and BM25 sparse frequencies, queried simultaneously via PineconeHybridSearchRetriever.'
    }
  };

  const wfButtons = document.querySelectorAll('.ib-wf-btn');
  const hubTitleEl = document.getElementById('ibHubTitle');
  const hubSubEl = document.getElementById('ibHubSub');
  const sheetHeaderEl = document.getElementById('ibSheetHeader');
  const sheetEl1 = document.getElementById('ibSheet1');
  const sheetEl2 = document.getElementById('ibSheet2');
  const sheetEl3 = document.getElementById('ibSheet3');
  const wfDescLeftEl = document.getElementById('ibWfDescLeft');
  const wfDescRightEl = document.getElementById('ibWfDescRight');
  const sheetContainer = document.getElementById('ibSheetStack');

  wfButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      wfButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const wfKey = btn.getAttribute('data-wf') || 'enterprise';
      const data = WF_DATA[wfKey];
      if (!data) return;

      if (hubTitleEl) hubTitleEl.textContent = data.hubTitle;
      if (hubSubEl) hubSubEl.textContent = data.hubSub;
      if (sheetHeaderEl) sheetHeaderEl.textContent = data.sheetHeader;
      if (sheetEl1) sheetEl1.textContent = data.sheets[0];
      if (sheetEl2) sheetEl2.textContent = data.sheets[1];
      if (sheetEl3) sheetEl3.textContent = data.sheets[2];
      if (wfDescLeftEl) wfDescLeftEl.textContent = data.descLeft;
      if (wfDescRightEl) wfDescRightEl.textContent = data.descRight;

      // Update node labels and icons dynamically
      if (data.hubIcon) {
        const hubIconEl = document.getElementById('ibHubIcon');
        if (hubIconEl) hubIconEl.innerHTML = getTablerSvg(data.hubIcon, 10, 13, 20, 'var(--accent-purple)', 2);
      }

      data.leftNodes.forEach((node, i) => {
        const titleEl = document.getElementById('ibNodeL' + (i + 1) + 'Title');
        const subEl = document.getElementById('ibNodeL' + (i + 1) + 'Sub');
        const iconEl = document.getElementById('ibNodeL' + (i + 1) + 'Icon');
        const colors = ['#b388ff', '#00e676', '#29b6f6'];
        if (titleEl) titleEl.textContent = node.label;
        if (subEl) subEl.textContent = node.sub;
        if (iconEl && node.icon) {
          iconEl.innerHTML = getTablerSvg(node.icon, 7, 11, 16, colors[i] || 'currentColor', 2);
        }
      });

      data.rightNodes.forEach((node, i) => {
        const titleEl = document.getElementById('ibNodeR' + (i + 1) + 'Title');
        const subEl = document.getElementById('ibNodeR' + (i + 1) + 'Sub');
        const iconEl = document.getElementById('ibNodeR' + (i + 1) + 'Icon');
        const colors = ['#b388ff', '#00e676', '#29b6f6', '#ffb300'];
        if (titleEl) titleEl.textContent = node.label;
        if (subEl) subEl.textContent = node.sub;
        if (iconEl && node.icon) {
          iconEl.innerHTML = getTablerSvg(node.icon, 7, 9, 15, colors[i] || 'currentColor', 2);
        }
      });

      if (sheetContainer) {
        sheetContainer.classList.remove('ib-sheet-new');
        void sheetContainer.offsetWidth; // Trigger reflow
        sheetContainer.classList.add('ib-sheet-new');
      }
    });
  });

  // Continuous auto-incrementing trace report counter
  const reportCountEl = document.getElementById('ibReportCount');
  if (reportCountEl) {
    let count = 128;
    setInterval(() => {
      count++;
      reportCountEl.textContent = 'TRACE #' + count;
      if (sheetContainer) {
        sheetContainer.classList.remove('ib-sheet-new');
        void sheetContainer.offsetWidth;
        sheetContainer.classList.add('ib-sheet-new');
      }
    }, 3800);
  }

  // 2. Integrations Hub Auto-Cycling
  const TOOLS = [
    { name: 'Pinecone Index', tag: 'Serverless Vector DB · top-k=5', status: 'syncing · pinecone hybrid vector index (top-k=5)' },
    { name: 'PostgreSQL Store', tag: 'pgvector HNSW Store · sub-8ms', status: 'syncing · postgres + pgvector sub-8ms retrieval' },
    { name: 'Tavily Search', tag: 'Live Web Grounding · Real-time', status: 'syncing · tavily real-time web grounding index' },
    { name: 'LangChain & MCP', tag: 'Agent State Graph · Tool Dispatch', status: 'syncing · langchain & mcp state graph dispatch' },
    { name: 'Gemini 2.5 Flash', tag: 'Fast Streaming LLM · Grounded', status: 'syncing · gemini 2.5 flash token streaming' },
    { name: 'Nemotron 3 Ultra', tag: 'Factuality & Grounding Critic', status: 'syncing · nemotron 3 factuality & critic check' }
  ];

  const syncStatusEl = document.getElementById('ibSyncStatus');
  const toolElements = document.querySelectorAll('.ib-tool');
  const toolWireElements = document.querySelectorAll('.ib-tool-wire');
  const toolPktElements = document.querySelectorAll('.ib-tool-pkt');
  let activeToolIdx = 0;
  let toolCycleInterval = null;

  function activateTool(idx) {
    toolElements.forEach((el, i) => el.classList.toggle('ib-tool-on', i === idx));
    toolWireElements.forEach((wire, i) => wire.classList.toggle('ib-flow-on', i === idx));
    toolPktElements.forEach((pkt, i) => pkt.classList.toggle('ib-pkt-on', i === idx));
    if (syncStatusEl && TOOLS[idx]) {
      syncStatusEl.textContent = TOOLS[idx].status;
    }
  }

  function startToolCycle() {
    if (toolCycleInterval) clearInterval(toolCycleInterval);
    toolCycleInterval = setInterval(() => {
      activeToolIdx = (activeToolIdx + 1) % TOOLS.length;
      activateTool(activeToolIdx);
    }, 2000);
  }

  toolElements.forEach((el, i) => {
    el.addEventListener('mouseenter', () => {
      clearInterval(toolCycleInterval);
      activateTool(i);
    });
    el.addEventListener('mouseleave', () => {
      startToolCycle();
    });
  });
  startToolCycle();

  // 3. Scrubbable Performance & Inference Benchmark Chart
  const BENCHMARKS = {
    xgboost: {
      title: 'Clinical Risk Prediction',
      desc: 'XGBoost with SHAP explainability on clinical risk benchmarks (98.19% ROC-AUC).',
      metric: 'ROC-AUC',
      unit: '%',
      values: [82.4, 85.1, 87.6, 90.2, 92.8, 94.7, 96.0, 97.2, 97.9, 98.19, 98.2],
      forecastFrom: 7
    },
    yolo: {
      title: 'Mammography & Object Detection',
      desc: 'Custom Ultralytics YOLOv8 & YOLOv11 detection on CBIS-DDSM & VinDr-Mammo (92.0% mAP).',
      metric: 'mAP@0.5',
      unit: '%',
      values: [62.0, 69.5, 74.8, 79.4, 83.1, 86.5, 88.7, 90.1, 91.4, 91.9, 92.0],
      forecastFrom: 7
    },
    rag: {
      title: 'Enterprise Hybrid Retrieval',
      desc: 'MiniLM 384-d dense + BM25 sparse reciprocal rank fusion (97.5% Recall@5).',
      metric: 'Recall@5',
      unit: '%',
      values: [71.2, 76.8, 81.5, 86.0, 89.4, 92.1, 94.3, 95.7, 96.4, 97.2, 97.5],
      forecastFrom: 7
    }
  };

  const chartSvg = document.getElementById('ibChartSvg');
  const chartLine = document.getElementById('ibChartLine');
  const chartArea = document.getElementById('ibChartArea');
  const forecastLine = document.getElementById('ibForecastLine');
  const scrubGuide = document.getElementById('ibScrubGuide');
  const scrubDot = document.getElementById('ibScrubDot');
  const chartPill = document.getElementById('ibChartPill');
  const chartTitleEl = document.getElementById('ibChartTitle');
  const chartDescEl = document.getElementById('ibChartDesc');
  const benchBtns = document.querySelectorAll('.ib-bench-btn');

  let currentBench = 'xgboost';
  let chartPoints = [];
  const W = 320;
  const H = 130;
  const PAD = 16;

  function calculatePaths(values) {
    const n = values.length;
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    const span = hi - lo || 1;
    const pts = values.map((v, i) => [
      PAD + (n < 2 ? 0 : (i / (n - 1)) * (W - PAD * 2)),
      H - PAD - ((v - lo) / span) * (H - PAD * 2)
    ]);
    let line = '';
    pts.forEach(([x, y], i) => {
      if (i === 0) {
        line = 'M' + x.toFixed(1) + ',' + y.toFixed(1);
        return;
      }
      const [px, py] = pts[i - 1];
      const cx = (px + x) / 2;
      line += ' C' + cx.toFixed(1) + ',' + py.toFixed(1) + ' ' + cx.toFixed(1) + ',' + y.toFixed(1) + ' ' + x.toFixed(1) + ',' + y.toFixed(1);
    });
    const area = n ? line + ' L' + pts[n - 1][0].toFixed(1) + ',' + (H - PAD) + ' L' + pts[0][0].toFixed(1) + ',' + (H - PAD) + ' Z' : '';
    return { line, area, points: pts };
  }

  function renderBenchmark(key) {
    const bench = BENCHMARKS[key];
    if (!bench) return;
    currentBench = key;

    if (chartTitleEl) chartTitleEl.textContent = bench.title;
    if (chartDescEl) chartDescEl.textContent = bench.desc;

    const { line, area, points } = calculatePaths(bench.values);
    chartPoints = points;

    if (chartLine) chartLine.setAttribute('d', line);
    if (chartArea) chartArea.setAttribute('d', area);

    const splitIdx = Math.min(bench.forecastFrom, points.length - 1);
    const splitX = points[splitIdx][0];
    if (forecastLine) {
      forecastLine.setAttribute('x1', splitX);
      forecastLine.setAttribute('x2', splitX);
    }

    // Default cursor dot to last point
    const lastPt = points[points.length - 1];
    if (scrubDot) {
      scrubDot.setAttribute('cx', lastPt[0]);
      scrubDot.setAttribute('cy', lastPt[1]);
    }
    if (scrubGuide) {
      scrubGuide.setAttribute('x1', lastPt[0]);
      scrubGuide.setAttribute('x2', lastPt[0]);
    }
  }

  benchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      benchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-bench') || 'xgboost';
      renderBenchmark(key);
    });
  });

  if (chartSvg) {
    renderBenchmark('xgboost');

    function onPointerScrub(clientX) {
      const rect = chartSvg.getBoundingClientRect();
      const relativeX = Math.max(PAD, Math.min(W - PAD, ((clientX - rect.left) / rect.width) * W));
      
      // Find nearest point
      let bestIdx = 0;
      let minDiff = Infinity;
      chartPoints.forEach(([px], i) => {
        const diff = Math.abs(px - relativeX);
        if (diff < minDiff) {
          minDiff = diff;
          bestIdx = i;
        }
      });

      const pt = chartPoints[bestIdx];
      const bench = BENCHMARKS[currentBench];
      const val = bench.values[bestIdx];
      const isForecast = bestIdx >= bench.forecastFrom;

      if (scrubGuide) {
        scrubGuide.setAttribute('x1', pt[0]);
        scrubGuide.setAttribute('x2', pt[0]);
      }
      if (scrubDot) {
        scrubDot.setAttribute('cx', pt[0]);
        scrubDot.setAttribute('cy', pt[1]);
      }

      if (chartPill) {
        const pixelX = (pt[0] / W) * rect.width;
        const pixelY = (pt[1] / H) * rect.height;
        chartPill.style.left = pixelX + 'px';
        chartPill.style.top = pixelY + 'px';
        chartPill.textContent = (isForecast ? '★ Test Validated: ' : 'Epoch #' + (bestIdx + 1) + ': ') + bench.metric + ' ' + val + bench.unit + ' · ' + (12 + (10 - bestIdx)) + 'ms';
        chartPill.classList.add('active');
      }
    }

    chartSvg.addEventListener('pointermove', (e) => onPointerScrub(e.clientX));
    chartSvg.addEventListener('pointerdown', (e) => onPointerScrub(e.clientX));
    chartSvg.addEventListener('pointerleave', () => {
      if (chartPill) chartPill.classList.remove('active');
    });
  }
});
</script>
`;
}
