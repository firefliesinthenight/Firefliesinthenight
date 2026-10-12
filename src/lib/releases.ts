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
  // Songs with a releaseDate switch themselves from "upcoming" to "released"
  // at that moment (US Eastern midnight), and pick up `afterRelease` — so
  // "Pre-save" becomes "Listen now" on release day without a new deploy.
  // Pages that read releases revalidate hourly (see getReleases callers).
  releaseDate?: string;
  afterRelease?: Partial<Pick<Release, "dateLabel" | "description" | "links">>;
};

// Order is computed by getReleases(): the newest song that is out leads;
// before any dated song is out, the soonest upcoming one leads. So Two Cups
// of Tea leads until Oct 23, then Beauty in the Fade takes the top spot.
// Once a song's YouTube video exists, add its youtubeId here.
const allReleases: Release[] = [
  {
    slug: "two-cups-of-tea",
    kind: "song",
    title: "Two Cups of Tea",
    status: "upcoming",
    releaseDate: "2026-10-16T00:00:00-04:00",
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
    afterRelease: {
      dateLabel: "New song · Out now · October 16, 2026",
      description: "The first Fireflies in the Night song. Out now on Spotify, Apple Music and everywhere you listen.",
      links: [
        {
          label: "Listen now",
          href: "https://distrokid.com/hyperfollow/ahmadabrar/two-cups-of-tea",
        },
      ],
    },
  },
  {
    slug: "beauty-in-the-fade",
    kind: "song",
    title: "Beauty in the Fade",
    status: "upcoming",
    releaseDate: "2026-10-23T00:00:00-04:00",
    dateLabel: "New song · Friday, October 23, 2026",
    cover: "/images/releases/beauty-in-the-fade.jpg",
    links: [
      {
        label: "Pre-save on Spotify",
        href: "https://distrokid.com/hyperfollow/ahmadabrar/beauty-in-the-fade",
      },
    ],
    afterRelease: {
      dateLabel: "New song · Out now · October 23, 2026",
      links: [
        {
          label: "Listen now",
          href: "https://distrokid.com/hyperfollow/ahmadabrar/beauty-in-the-fade",
        },
      ],
    },
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

function resolve(r: Release, now: number): Release {
  const { afterRelease, ...base } = r;
  if (!r.releaseDate) return base;
  const out = now >= Date.parse(r.releaseDate);
  return out ? { ...base, ...afterRelease, status: "released" } : { ...base, status: "upcoming" };
}

// Newest-out dated release first, then upcoming (soonest first), then the
// undated entries in the order written above.
export function getReleases(now: number = Date.now()): Release[] {
  const resolved = allReleases.map((r) => resolve(r, now));
  const t = (r: Release) => Date.parse(r.releaseDate as string);
  const datedOut = resolved.filter((r) => r.releaseDate && r.status === "released").sort((a, b) => t(b) - t(a));
  const upcoming = resolved.filter((r) => r.releaseDate && r.status === "upcoming").sort((a, b) => t(a) - t(b));
  const undated = resolved.filter((r) => !r.releaseDate);
  return [...datedOut, ...upcoming, ...undated];
}

export function getSongs(now: number = Date.now()): Release[] {
  return getReleases(now).filter((r) => r.kind === "song");
}
