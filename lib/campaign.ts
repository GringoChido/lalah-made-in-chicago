export type CampaignPlaylist = { title: string; description: string; url: string };
export type CampaignAudio = { src: string; title: string; transcript: string };
export type CampaignVideo = { src: string; title: string; poster?: string; captions?: string };

// Publish only artist-supplied material. Empty entries do not render dead links.
// Spotify URLs must point to the team's final playlists, not guessed collections.
export const campaign: {
  playlists: CampaignPlaylist[];
  chicagoMemory: CampaignAudio | null;
  albumFilm: CampaignVideo | null;
} = { playlists: [], chicagoMemory: null, albumFilm: null };

// The amplifier above the right-hand records is distinct from the Tour speaker.
export const memoryObject = {
  id: "memory", label: "A Chicago memory", object: "the amplifier", x: 1040, y: 260, w: 198, h: 72,
  path: "M1045 266 L1228 266 L1235 323 L1040 326 Z",
} as const;
