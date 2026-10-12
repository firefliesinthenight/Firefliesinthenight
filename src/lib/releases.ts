// New work Ahmad wants surfaced as soon as it's ready — music, videos,
// anything that isn't an essay/memoir chapter/community piece. Newest first;
// the homepage and /latest both read `releases[0]` as "the current release".
// /latest shows the full list as a carousel (ReleaseCarousel) — released and
// upcoming side by side — so adding the next one is just a new entry here.
//
// `youtubeId` is optional so an "upcoming" entry can be announced before a
// video exists (renders a "Coming soon" slot instead of a player).
//
// `links` is deliberately empty until real streaming URLs (Spotify, Apple
// Music, etc.) are supplied — never guess at those, a wrong link sends
// people to the wrong place. The page falls back to "coming soon" until
// they're added here.
export type Release = {
  slug: string;
  title: string;
  status: "released" | "upcoming";
  // "song" releases also appear on /music; "video" (intro, shorts) only on /latest.
  kind: "song" | "video";
  dateLabel: string;
  youtubeId?: string;
  // Square cover art (in /public). Shown in place of the video slot until a
  // youtubeId exists, so an upcoming release isn't an empty box.
  cover?: string;
  description?: string;
  links: { label: string; href: string }[];
};

// Two Cups of Tea is listed first on purpose: it's the release launch week
// is pointing people to, so the homepage spotlight and /latest lead with it.
// After Oct 16, flip its status to "released", add its youtubeId and the
// real streaming links, and move Beauty in the Fade to the top the following week.
export const releases: Release[] = [
  {
    slug: "two-cups-of-tea",
    kind: "song",
    title: "Two Cups of Tea",
    status: "upcoming",
    dateLabel: "New song · Friday, October 16, 2026",
    cover: "/images/releases/two-cups-of-tea.jpg",
    description:
      "The first Fireflies in the Night song. Pre-save it now and it lands in your library the day it comes out.",
    links: [
      {
        label: "Pre-save on Spotify",
        href: "https://distrokid.com/hyperfollow/ahmadabrar/two-cups-of-tea",
      },
    ],
  },
  {
    slug: "beauty-in-the-fade",
    kind: "song",
    title: "Beauty in the Fade",
    status: "upcoming",
    dateLabel: "New song · Friday, October 23, 2026",
    cover: "/images/releases/beauty-in-the-fade.jpg",
    links: [
      {
        label: "Pre-save on Spotify",
        href: "https://distrokid.com/hyperfollow/ahmadabrar/beauty-in-the-fade",
      },
    ],
  },
  {
    slug: "introduction",
    kind: "video",
    title: "I've Never Grabbed the Microphone",
    status: "released",
    dateLabel: "Introduction · October 12, 2026",
    youtubeId: "1g0i20Cd4RY",
    description:
      "Ahmad introduces Fireflies in the Night: the unofficial record, his father and the Last Poets, and why he's finally putting his voice out there.",
    links: [],
  },
  {
    slug: "dim-light-v2",
    kind: "song",
    title: "Dim Light V2",
    status: "released",
    dateLabel: "October 2026",
    youtubeId: "jupW8pI1jY4",
    links: [],
  },
];

export const songs = releases.filter((r) => r.kind === "song");
