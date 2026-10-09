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
  dateLabel: string;
  youtubeId?: string;
  description?: string;
  links: { label: string; href: string }[];
};

export const releases: Release[] = [
  {
    slug: "dim-light-v2",
    title: "Dim Light V2",
    status: "released",
    dateLabel: "October 2026",
    youtubeId: "jupW8pI1jY4",
    links: [],
  },
];
