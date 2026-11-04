# Portfolio UI upgrade: "Match Day" spec

Status: concept approved by George on 2026-11-03. Nothing is built yet.
Layout boards: https://claude.ai/artifact/JmeKMeFHBSfvU56Wer3Uvm (private to George)

## 1. Goal

Make the portfolio feel like a designed experience and show who George is as an engineer and a person, while a recruiter can still find his résumé, experience and contact details within seconds.

**Non-goals:** a 3D game-engine site, gated intros, scroll hijacking, autoplaying sound.

## 2. What edolus.com does

Inspected on 2026-11-03 by loading it in a browser and reading its published scripts. Automated clicks did not get past the intro screen, so everything after the hero comes from the scripts, not from watching it play.

| Area | Finding |
| --- | --- |
| Engine | PlayCanvas 2.23.3 on WebGL2, with GSAP 3.12.5 for tweens. The HTML file is 614 bytes. |
| Structure | 7 scenes on one master scroll timeline from 0 to 1 (`SceneManager.SEGMENTS`). Native page scrolling is off (`overflow: hidden`). Wheel input drives progress, smoothed with `lerpSpeed` 0.1, over 24,000 px of wheel travel. Snap points sit at 0.46 and 0.54. |
| Entry | A preloader with a percentage counter, then a full-screen "INITIATE SYSTEM" button with a "experience with headphones" hint. That click also unlocks browser audio. |
| Type | General Sans display at 96px, with each letter in its own span. JetBrains Mono for HUD labels. Text is real DOM over the canvas. |
| Transitions | A named `TransitionManager`: fade, wipe-up, wipe-down and slice (wipe up with `expo.in`, swap at the midpoint, wipe down with `expo.out`, 0.7s default). |
| Text | `TextScramble` resolves text from a noise character set. It has its own sound. |
| Audio | 3 music stems (melody, bass, instruments) crossfaded per scroll band over 1.2s, 12 one-shot or looping effects tied to reveals, and an audio toggle with a 0.6s fade. One loop speeds up to double with scroll speed. |
| Cursor and texture | Custom cursor with a lagging orbit ring and label, film grain, dot grid, mouse parallax, bracket corners on the main button. |
| Cost | 96 requests and about 50 MB by the time the intro was showing. Largest files: 7.5 MB and 7.3 MB 3D models, two 6 MB videos. |
| Accessibility | No `prefers-reduced-motion` handling anywhere in the 1 MB script bundle. |

### Borrow the idea, build our own

We take the techniques and write our own code and assets. Edolus's code, models, audio and copy are theirs.

| Take | Our version |
| --- | --- |
| Slice transition | Through-ball wipe on nav jumps |
| Scramble text | Headings decode once on first view |
| Per-letter headline | Hero name staggered in with Motion |
| Bracket-corner button | Main call to action |
| Sound tied to reveals | A small effects set, opt-in |
| Stem mix by scroll | A low-pass filter opening with scroll (we have one track, not stems) |
| Grain and line texture | Light grain plus chalk pitch lines |

| Leave | Why |
| --- | --- |
| PlayCanvas and 3D models | 50 MB is wrong for a recruiter on a phone, and building the assets is a project of its own |
| Scroll hijacking and snap | Breaks expected scrolling and keyboard use |
| Entry gate | A recruiter should see George's name first, not a button |
| Missing reduced-motion support | We treat it as a requirement |

## 3. Concept

Three big themes, each with one job:

- **Software engineering is the substance.** A "How I ship" pipeline, a system diagram of the stack, real fixes shown as diffs, and an Inspect mode that shows how the site itself is built.
- **Soccer drives motion and identity.** Night-pitch look, chalk lines, Chelsea blue, a ball that travels the career timeline and carries transitions. George is a striker, and the shirt is No. 3.
- **Music drives sound and structure.** Projects are a tracklist (Side A is 2026, Side B is 2025). A persistent dock holds the sound control, and George's own songs appear in About.

**Hunter x Hunter is a small personal touch, not a theme:** a line in About, one line in Inspect mode, and one ember-coloured detail for Feitan.

Labels recruiters rely on stay plain in the navigation: About, Experience, How I ship, Projects, Skills, Contact, Résumé.

### Personal details

| Item | Value | Note |
| --- | --- | --- |
| Club | Chelsea | Name and colour only. No crest, kit design or other club trademarks. |
| Position | Striker | |
| Number | 3 | Whole years worked, computed from the dates in `profile.js`: about 3.6 years in November 2026, excluding gaps. Matches the "3 years" wording on his résumés. Becomes 4 around April 2027 with no code change. |
| Favourite character | Feitan | Transmuter. Also likes Gon, Killua, Kurapika and Leorio. |

### Palette

| Token | Value | Use |
| --- | --- | --- |
| Pitch | `#0C1410` / `#13201A` | Ground and alternate sections |
| Chalk | `#EEF1E4` | Text, lines, dock |
| Chelsea blue | `#034694` | Button fills, with white text |
| Chelsea tint | `#7FB2FF` | Accent text and the ball on dark ground, because `#034694` is too dark to read there |
| Terminal mint | `#8FE3CF` | Engineering: Inspect notes, pipeline, diagram |
| Rising Sun ember | `#FF8A5C` | One Feitan detail only |

Dark only to start. The light theme toggle is removed.

## 4. Sections

| Section | Layout | Personal layer | Motion |
| --- | --- | --- | --- |
| Hero | Large condensed name over centre-circle chalk lines, real stats strip | No. 3, "Kick off" button | Letter stagger, lines draw in, slow parallax |
| About | Text plus an "Off the clock" column | Chelsea shirt, songs and Apple Music embed, HxH line | Fade and lift |
| Experience | Vertical timeline, newest first, with a diff block of real Lynked fixes | "The season so far", ball, kick-off marker | Ball follows scroll along the line |
| How I ship (new) | Six-stage pipeline: Spec, Failing test, Code, Review, Gate, Monitor | Engineering theme | Stages light up in turn with scroll |
| Projects | Full-width track rows | Side A and B numbering | Row hover shifts type, soft tick if sound is on |
| Skills | System diagram: Frontend to Backend to Data, with Testing & Tools, AI & Tooling and Languages below | Engineering theme | Selected part's tools animate in with a shared layout |
| Contact | Headline, button, licence-style card, build strip | "Put it in the net", net ripple | Ball shot on click |
| Dock | Sticky bottom bar | Sound and Inspect controls | Equalizer bars move only while playing |

**Inspect mode** replaces the earlier Gyo idea. A dock button reveals short notes on how each section is built. The last note is the one HxH wink.

**Build strip** in the footer shows real values only, added at build time: commit hash, Lighthouse score, test count. If a value isn't available, it's hidden instead of faked.

**How I ship facts** come from `CLAUDE.md` and the résumé. The SonarQube gate was at Continuum and the rest at Lynked, so the wording must not imply one employer did all of it if anyone asks.

No skill percentages, because they would claim something George can't measure.

## 5. Stack

| Need | Choice | Licence | Note |
| --- | --- | --- | --- |
| Animation | **Motion** (`motion` 14.9.0) | MIT | Free core library. Motion+ is a paid add-on and isn't needed. Fits React directly: `useScroll`, `AnimatePresence`, layout animations. |
| Smooth scroll | Lenis 1.3.27, only if native scrolling feels rough in testing | MIT | Desktop only |
| Sound | Browser Web Audio API, no library | n/a | Gain and low-pass filter nodes, effects synthesized in code, so no licence and almost no download |
| Net ripple | SVG or Canvas 2D | n/a | No 3D library |

**Why Motion over GSAP.** GSAP is also free for this use, including its plugins, and it's what edolus uses. But its licence is Webflow's own "standard no charge" licence rather than open source, and Motion suits React components better. GSAP stays as the fallback if a scrubbed timeline gets too hard to manage in Motion.

## 6. Music

George's picks are commercial recordings, so they are **not** background music. Playing them on the site from our own files would need licences from the rights holders. Apple's player is the legal way to show them.

### George's songs (About section, Apple's player)

Visitors press play and hear previews through Apple. Signed-out visitors get 30-second clips.

| Song | Artist | Apple Music |
| --- | --- | --- |
| Breeze | Jiro Inagaki and His Soul Media | [Link](https://music.apple.com/ca/album/breeze/1508946500?i=1508946503) |
| L'amore dice Ciao (Main Titles) | Armando Trovajoli | [Link](https://music.apple.com/ca/album/lamore-dice-ciao-main-titles-2022-remastered/882321839?i=882321840) |
| Sylvia | Arthur Verocai | [Link](https://music.apple.com/ca/album/sylvia/495578530?i=495578535) |
| I Choose You | Chicago Gangsters | [Link](https://music.apple.com/ca/album/i-choose-you/1376664672?i=1376665099) |
| Earth, Wind & Fire (from *Spirit*, 1976) | Earth, Wind & Fire | [Link](https://music.apple.com/ca/album/earth-wind-fire/523227111?i=523227120) |

**Favourite Songs is dropped.** Claude can't read it from this Mac, and George said not to worry about it, so the site embeds these five songs one at a time.

### Background music (dock, licensed)

Instrumental jazz funk and lounge in the spirit of George's picks, from Pixabay. Its summary says no attribution is needed but forbids distributing content as-is. So: stream only, no download link, and read the full terms before shipping.

**Chosen by George:** [Jazz Funk Groove Instrumental](https://pixabay.com/music/smooth-jazz-jazz-funk-groove-instrumental-222618/) by ArtManzh, 4:48, tagged smooth jazz, funk and guitar.

### Sound rules

- Off by default. Nothing plays until the visitor presses the dock button, and the choice is remembered.
- The audio file downloads only after opt-in, so visitors who never press it pay nothing.
- Starting Apple's player pauses the background track, so two songs never overlap.
- Music fades in over 2s and fades out over 0.6s on toggle. It pauses when the tab is hidden.
- The low-pass filter opens from muffled at the top to full at Contact.
- Effects, all synthesized: soft kick (section jump), thump plus net swish (contact), faint tick (decode, row hover, pipeline stage), optional referee whistle (first opt-in).
- No crowd noise, commentary or anime audio.

## 7. Third-party rules

The site is used to get hired, so it stays clear of other people's trademarks and art.

- **Hunter x Hunter, allowed:** short references by name (Feitan, Gon, Killua, Kurapika, Leorio, Gyo) and one colour inspired by Rising Sun.
- **Hunter x Hunter, not used:** characters, screenshots, the Hunter emblem or logo, show audio, or lifted fan art.
- **Chelsea, allowed:** saying he supports the club, and a blue colour. The shirt is a generic drawing.
- **Chelsea, not used:** crest, lion, kit designs or sponsor marks.
- The contact card reads "Developer Licence" and is an original design.

## 8. Requirements

- All content is real DOM text. No text in canvas.
- Everything readable without animation, and if JavaScript effects fail.
- `prefers-reduced-motion`: no scrubbing, parallax, decode or wipes. Content appears at once.
- Keyboard: full tab order, visible focus, diagram parts are real buttons. Inspect is a real button.
- Touch: 44px targets, no custom cursor, native scroll, diagram stacks in request order.
- Contrast: 4.5:1 for text.
- Budget: JavaScript at most 160 KB gzipped (currently 92 KB). No autoloaded audio. Page weight before opt-in under 1 MB excluding the résumé PDF. Apple's player loads only when clicked (click-to-load facade), so it doesn't slow the first view.
- Lighthouse on phone: performance and accessibility at 90 or above.
- Existing site features kept: résumé download path, old-URL redirect, no phone number.
- Any AI tooling mention names Claude Code.

## 9. Build plan

Each phase is one PR, with a Vercel preview to review before the next.

| Phase | Work | Done when |
| --- | --- | --- |
| 0 | Assign a production domain in Vercel (see below) | A signed-out visitor can load the site and the current résumé |
| 1 | Tokens, fonts, Motion, shared reduced-motion setup, new section layouts including How I ship and the system diagram, dark only | All sections match the boards with no special effects, tests pass at phone and desktop width |
| 2 | Hero stagger, decode headings, bracket button, through-ball transition | Works with mouse, keyboard and reduced motion |
| 3 | Pitch lines, ball on timeline, pipeline lights, track rows, net ripple | Smooth at 60fps on a mid-range phone profile |
| 4 | Dock, audio engine, filter, effects, Apple Music embed | Sound stays off until opted in, and works on iOS Safari |
| 5 | Inspect mode, build strip, HxH touches | Keyboard usable, build values are real |
| 6 | Lighthouse, screen reader pass, device checks, track licence recheck | Section 8 budgets all met |

### Phase 0 findings (2026-11-03)

Latest production deployment `f8ae95e` succeeded, but signed-out visitors can't reach it:

| Address | Result for a signed-out visitor |
| --- | --- |
| `react-tailwind-portfolio-lyart.vercel.app` | 404 `DEPLOYMENT_NOT_FOUND`: not attached to any deployment |
| `react-tailwind-portfolio-george-fotabongs-projects.vercel.app` | 302 to Vercel login: generated URL behind Deployment Protection |
| `react-tailwind-portfolio-6jt8d3u4p-...vercel.app` | 302 to Vercel login: same reason |

Vercel's Standard Protection covers every address except production domains, so the fix is to attach a domain to Production, and protection stays on for previews. After that, update the repo's homepage link.

## 10. Decisions

| Question | Answer |
| --- | --- |
| Overall concept | Approved, with engineering replacing HxH as the third big theme |
| Theme | Dark only |
| Club, position, number | Chelsea, striker, 3 (years of experience) |
| Character | Feitan |
| Background track | Jazz Funk Groove Instrumental |
| George's songs | Five songs embedded individually, no Favourite Songs playlist |

### Still open

1. Assign the production domain (Phase 0).

## 11. Sources

- [Motion pricing](https://motion.dev/pricing), [Motion+](https://motion.dev/plus); `npm view motion license` returned MIT
- [GSAP standard licence](https://gsap.com/standard-license)
- [Pixabay licence summary](https://pixabay.com/service/license-summary/)
- [Apple Music marketing tools](https://artists.apple.com/support/1117-apple-music-marketing-tools)
- [MusicKit on the web](https://js-cdn.music.apple.com/musickit/v1/index.html)
- Track links from the iTunes Search API, queried 2026-11-03
