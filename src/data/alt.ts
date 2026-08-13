/**
 * Builds alt text for the app-picker logos on the installation guides.
 *
 * Many of these apps already have "IPTV" or "Player" in their own name, so a
 * fixed suffix produces stutters like "IPTV Smarters Pro IPTV player app logo"
 * or "VLC Media Player IPTV player logo". That reads badly to a screen reader
 * and is the exact repetition pattern search engines treat as stuffed alt text.
 * The noun is chosen from whichever words the name is already carrying.
 */
export function appLogoAlt(name: string, context: string): string {
  const n = name.toLowerCase();
  const hasIptv = n.includes('iptv');
  const hasPlayer = n.includes('player');

  const noun = hasIptv && hasPlayer
    ? 'app logo'
    : hasIptv
      ? 'player app logo'
      : hasPlayer
        ? 'IPTV app logo'
        : 'IPTV player app logo';

  return `${name} ${noun} for ${context}`;
}
