# Client feedback review

September 13, 2026. Implementation pass for Joshua's review; no client reply sent.

## Direction

The client approves the existing room, layout, and exploration. Preserve that direction, finish the requested corrections, and add only the expressly approved experiences. Clarify ideas 1 and 3 before expanding their scope. Defer ideas 4, 6, 8–14, and 17.

## Implemented for review

- Stronger golden object outlines and glows for desktop hover/focus, Explore links, and touch screens.
- Homepage title changed to “Made In Chicago.”
- The supplied Chicago paragraph replaces the previous album story copy exactly.
- Bandsintown uses regular-weight Arial for practical information and sentence/title case controls; RSVP stays uppercase.
- Tour dates remain the official live Bandsintown feed. The new responsive poster treatment supports approved idea 18 without introducing the deferred separate poster/date-index concept (17). Ticket and RSVP destinations remain managed by Bandsintown. Event descriptions expand when the feed supplies them.
- Five missing catalog editions added with official artwork and Apple Music destinations: A Moment, The Song Lives On (Joe Sample & Lalah Hathaway), Outrun the Sky, Honestly (Deluxe Edition), and Vantablack: Expansion Pack. Eleven catalog entries now sit below the featured Made In Chicago release.
- A small CSS crop removes the narrow source-image borders around Self Portrait. The original file is preserved.
- Explore labels use measured object positions, leader arrows, responsive placement, and collision spacing. Room movement pauses while a label is active.
- TikTok now points to https://www.tiktok.com/@officiallalahhhathaway?lang=en.
- Approved idea 2: the album sleeve moves from its opener into the album dialog and returns when it closes. Reduced-motion preferences retain a direct open/close.
- Approved idea 19: a brief speaker-grille transition connects the Tour speaker and Tour page, with a direct-navigation reduced-motion fallback.

## Prepared, awaiting supplied content

- Ideas 5 and 7: a playlist collection in the Music page and album experience, ready for the team's final Spotify playlist URLs, names, and introductions. Empty collections remain hidden. No guessed songs or invented personal preferences.
- Idea 15: an audio dialog and transcript, connected specifically to the amplifier above the right-hand records. It becomes visible when Lalah's recording is supplied.
- Idea 16: a video dialog for the supplied album film. The repetitive Behind the album action has been removed until the real film is available. The existing implementation accepts a hosted video file, optional poster image, and caption file; adapt if the team supplies a video-platform link instead.
- Final biography: replace the provisional bio when the team sends approved copy.

## Decisions needed

1. VB: confirm the destination email address for the contact form. Do not infer it from a first name.
2. VB: choose the newsletter system of record. Prefer retaining the existing Bandzoogle list if the team plans to keep its mailing service and a supported signup connection can be established. Otherwise select a dedicated mailing platform and migrate the list deliberately.
3. Backend email collection is possible, but storing email addresses alone does not provide campaign sending, unsubscribe management, and the rest of a mailing platform. Keep one maintained subscriber list. Forms remain in their truthful preview state until delivery is configured.
4. Team: supply the influence playlist, any additional approved personal playlists, Chicago recording with transcript, album video with captions/poster if available, and final bio.

## Clarification to discuss before replying

- Idea 1, layered room: subtle depth between the photograph, foreground elements, and typography as the pointer moves. Keep Lalah's supplied portrait intact. The current site already contains a restrained version; explain the proposed degree of movement before enhancing it.
- Idea 3, distinct object interactions: each object has a small action related to what it opens, for example a book revealing the bio or the speaker leading into Tour. This does not require redesigning the room. The separately approved sleeve and speaker actions can serve as concrete examples; avoid treating them as approval for every other object animation.

## Approval map

| Idea | Concept | Client response | This pass |
| --- | --- | --- | --- |
| 1 | Layered room | Clarify | Existing treatment preserved; explanation prepared |
| 2 | Sleeve comes forward | Approved | Implemented |
| 3 | Distinct object interactions | Clarify | Explanation prepared; no broader rollout |
| 4 | Wall projections | Later | Deferred |
| 5 | Album-influence Spotify playlist | Approved | Ready for final playlist |
| 6 | Donny's favorites | Later | Deferred |
| 7 | Personal playlist collection | Approved | Ready for team selections |
| 8 | Sleeve stories | Later | Deferred |
| 9 | Inside Harmony | Later | Deferred |
| 10 | Fashion timeline | Later | Deferred |
| 11 | Outfit stories | Later | Deferred |
| 12 | Outfit hotspot | Later | Deferred |
| 13 | Chicago guide | Later | Deferred |
| 14 | Chicago map | Later | Deferred |
| 15 | Chicago memory audio | Approved | Amplifier player prepared; recording needed |
| 16 | Album film | Approved | Player prepared; film needed |
| 17 | Tour poster plus date index | Later | Deferred |
| 18 | Gig poster wall | Approved | Poster styling on the live event feed |
| 19 | Speaker-to-Tour transition | Approved | Implemented |

## Verification and review limits

TypeScript checking and the static production build pass; all nine routes export. Static checks confirm the new title, exact story, TikTok URL, twelve release covers including the featured album, local image availability, and widget configuration. Album artwork was visually inspected.

The new interactions and third-party widget have not been checked in a browser in this pass. Review the golden glow strength, arrow placement on desktop and phones, sleeve open/close, speaker transition and browser Back, and live ticket/RSVP layout before calling these visually approved. Widget styling follows its current DOM and can need maintenance if Bandsintown changes that markup.

The public Netlify deployment has not been updated because its CLI publishing session is disconnected. Use the existing owner-private Site for Joshua's review; restore Netlify publishing before updating the public client link.

## Suggested next sequence

1. Joshua reviews the polished room and Tour treatment.
2. Agree on short explanations for ideas 1 and 3.
3. Reply with completed changes and a compact asset/decision request.
4. Connect the supplied content and confirmed forms, then finish the device review and public release.

## Sources checked

- Apple Music artist catalog: https://music.apple.com/us/artist/lalah-hathaway/3895759
- Official album artwork and release destinations: reference/media-assets.json and lib/media.ts.
- Bandzoogle mailing list feature: https://bandzoogle.com/help/articles/477-mailing-list-feature
- Bandzoogle signup form feature: https://bandzoogle.com/help/articles/611-mailing-list-signup-form-feature
- Bandsintown API access, if a fully custom feed is pursued later: https://help.artists.bandsintown.com/en/articles/7053475-what-is-the-bandsintown-api
