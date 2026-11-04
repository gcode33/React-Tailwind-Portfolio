# Portfolio UI upgrade: "Match Day" spec

Status: draft for George's review. Nothing here is built yet.
Layout boards: https://claude.ai/artifact/JmeKMeFHBSfvU56Wer3Uvm (private to George)

## 1. Goal

Make the portfolio feel like a designed experience and show who George is (music, soccer, Hunter x Hunter), while a recruiter can still find his résumé, experience and contact details within seconds.

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

Each interest gets one job, so the three read as one design:

- **Soccer drives motion.** Night-pitch look, chalk lines, a ball that travels the career timeline and carries transitions.
- **Music drives sound and structure.** Projects are a tracklist (Side A is 2026, Side B is 2025). A persistent dock holds the sound control.
- **Hunter x Hunter is the hidden layer.** The skills dial uses the six Nen types, and "Gyo" mode reveals hidden notes on how the site was built. Someone who has never seen the show still gets a working skills section.

Labels recruiters rely on stay plain in the navigation: About, Experience, Projects, Skills, Contact, Résumé.

## 4. Sections

| Section | Layout | Personal layer | Motion |
| --- | --- | --- | --- |
| Hero | Large condensed name over centre-circle chalk lines, real stats strip | "Kick off" button, live status | Letter stagger, lines draw in, slow parallax |
| About | Text plus an "Off the clock" column | Apple Music embed, club and position, Nen type | Fade and lift |
| Experience | Vertical timeline, newest first | "The season so far", ball, kick-off marker | Ball follows scroll along the line |
| Projects | Full-width track rows | Side A and B numbering | Row hover shifts type, soft tick if sound is on |
| Skills | Hexagon dial with a detail panel | Six Nen types, Gyo toggle | Selected group animates in with a shared layout |
| Contact | Headline, button, licence-style card | "Put it in the net", net ripple | Ball shot on click |
| Dock | Sticky bottom bar | Sound control, track name | Equalizer bars move only while playing |

**Skills mapping** (wheel order, starting at the top):

| Nen type | Group | Reason |
| --- | --- | --- |
| Enhancer | Testing & Tools | Strengthens what already exists |
| Transmuter | Languages | One idea, many forms |
| Conjurer | Frontend | Makes things you can see and touch |
| Specialist | AI & Tooling | Doesn't fit the others |
| Manipulator | Data | Controls what's already out there |
| Emitter | Backend | Sends power across a distance |

All six points are equal size. No skill percentages, because they would claim something George can't measure.

## 5. Stack

| Need | Choice | Licence | Note |
| --- | --- | --- | --- |
| Animation | **Motion** (`motion` 14.9.0) | MIT | Free core library. Motion+ is a paid add-on and isn't needed. Fits React directly: `useScroll`, `AnimatePresence`, layout animations. |
| Smooth scroll | Lenis 1.3.27, only if native scrolling feels rough in testing | MIT | Desktop only |
| Sound | Browser Web Audio API, no library | n/a | Gain and low-pass filter nodes, effects synthesized in code, so no licence and almost no download |
| Net ripple | SVG or Canvas 2D | n/a | No 3D library |

**Why Motion over GSAP.** GSAP is also free for this use, including its plugins, and it's what edolus uses. But its licence is Webflow's own "standard no charge" licence rather than open source, and Motion suits React components better. GSAP stays as the fallback if a scrubbed timeline gets too hard to manage in Motion.

## 6. Music

**George's Apple Music can't be the soundtrack:**

- The library on this Mac reports 0 tracks, there are no local audio files, and reading playlists returned "Access not allowed".
- Apple Music streams can't be hosted on a site, and a subscription doesn't grant rights to do that.
- MusicKit needs an Apple Developer Program token, and each visitor must sign in with their own subscription.
- The official embed gives signed-out visitors 30-second clips only.

**Plan:**

1. **Background music:** one licensed instrumental track, from Pixabay. Its summary says no attribution is needed but forbids distributing content as-is. So: stream only, no download link, and read the full terms before shipping.
2. **George's real taste:** an Apple Music embed of a public playlist in the About section. Visitors press play and hear previews.
3. **Fallback if no track feels right:** generate a short loop in code with Tone.js (MIT).

**Shortlist.** Listed on Pixabay on 2026-11-03. Nobody has listened to these yet, and any could contain vocals, so George picks by ear. Pixabay's listings don't state BPM.

| Track | Artist | Length | Feel |
| --- | --- | --- | --- |
| [Groovy Chill Hip Hop Instrumental, Waves](https://pixabay.com/music/beats-groovy-chill-hip-hop-instrumental-waves-nerdyboyz-491896/) | Nerdworld | 2:57 | Chill hip hop |
| [Groovy Happy Chill Hip Hop, Feel So Good](https://pixabay.com/music/beats-groovy-happy-chill-hip-hop-instrumental-feel-so-good-nerdyboyz-491894/) | Nerdworld | 3:10 | Brighter hip hop |
| [Longing Pulse](https://pixabay.com/music/lofi-longing-pulse-hip-hop-zen-475593/) | Turning_Pages | 3:08 | Lofi, chillhop |
| [Sundrift](https://pixabay.com/music/disco-sundrift-lounge-disco-556857/) | 9JackJack8 | 2:06 | Lounge, nu-disco |
| [Melodic House Groovy Instrumental](https://pixabay.com/music/house-melodic-house-groovy-instrumental-565691/) | rediskasound | 4:08 | Chill house |
| [Chill Instrumental](https://pixabay.com/music/funk-chill-instrumental-584928/) | Sub_Clair | 2:31 | Funk |

### Sound rules

- Off by default. Nothing plays until the visitor presses the dock button, and the choice is remembered.
- The audio file downloads only after opt-in, so visitors who never press it pay nothing.
- Music fades in over 2s and fades out over 0.6s on toggle. It pauses when the tab is hidden.
- The low-pass filter opens from muffled at the top to full at Contact.
- Effects, all synthesized: soft kick (section jump), thump plus net swish (contact), faint tick (decode, row hover), optional referee whistle (first opt-in).
- No crowd noise, commentary or anime audio.

## 7. Hunter x Hunter rules

The show and its assets are copyrighted, and this site is used to get hired.

- **Allowed:** original art and code inspired by its concepts, and short references by name, such as Nen types and Gyo.
- **Not used:** characters, screenshots, the Hunter emblem or logo, show audio, or lifted fan art.
- The contact card reads "Developer Licence" and is an original design.

## 8. Requirements

- All content is real DOM text. No text in canvas.
- Everything readable without animation, and if JavaScript effects fail.
- `prefers-reduced-motion`: no scrubbing, parallax, decode or wipes. Content appears at once.
- Keyboard: full tab order, visible focus, dial buttons usable by keyboard. Gyo is a real button.
- Touch: 44px targets, no custom cursor, native scroll, dial becomes cards.
- Contrast: 4.5:1 for text.
- Budget: JavaScript at most 160 KB gzipped (currently 92 KB). No autoloaded audio. Page weight before opt-in under 1 MB excluding the résumé PDF.
- Lighthouse on phone: performance and accessibility at 90 or above.
- Existing site features kept: résumé download path, old-URL redirect, no phone number.
- The current light/dark toggle needs a decision (open question 5).

## 9. Build plan

Each phase is one PR, with a Vercel preview to review before the next.

| Phase | Work | Done when |
| --- | --- | --- |
| 0 | Fix the production domain | The public URL loads and serves the current résumé |
| 1 | Tokens, fonts, Motion, shared reduced-motion setup, new section layouts | All sections match the boards with no special effects, tests pass at phone and desktop width |
| 2 | Hero stagger, decode headings, bracket button, through-ball transition | Works with mouse, keyboard and reduced motion |
| 3 | Pitch lines, ball on timeline, track rows, net ripple | Smooth at 60fps on a mid-range phone profile |
| 4 | Dock, audio engine, filter, effects, Apple Music embed | Sound stays off until opted in, and works on iOS Safari |
| 5 | Nen dial, Gyo mode, licence card | Keyboard usable, reads fine to someone who has never seen the show |
| 6 | Lighthouse, screen reader pass, device checks, tracks licence recheck | Section 8 budgets all met |

## 10. Open questions for George

1. Which track, after listening to the shortlist?
2. What's a public Apple Music playlist link for the embed?
3. Which club, position and number should the site show?
4. Which Nen type are you, and who's your favourite character? (Sets the aura colour and copy.)
5. Keep the light theme, or commit to dark only? Recommendation: dark only to start, since the night-pitch look is the concept.
6. Any location, name or wording changes to the hero?

## 11. Sources

- [Motion pricing](https://motion.dev/pricing), [Motion+](https://motion.dev/plus); `npm view motion license` returned MIT
- [GSAP standard licence](https://gsap.com/standard-license)
- [Pixabay licence summary](https://pixabay.com/service/license-summary/)
- [Apple Music marketing tools](https://artists.apple.com/support/1117-apple-music-marketing-tools)
- [MusicKit on the web](https://js-cdn.music.apple.com/musickit/v1/index.html)
