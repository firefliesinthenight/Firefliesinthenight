export type NavLink = {
  label: string;
  href: string;
  // How the header menu breaks a long label across two lines. Optional —
  // short labels stay on one line.
  lines?: [string, string];
};

// Top-level navigation only. The Buyahka & Abrar memoir intentionally lives
// nested at /sitting-with-buyahka/buyahka-and-abrar and must never be added
// here — it is surfaced instead via featured cards on the homepage and on
// /sitting-with-buyahka.
export const navLinks: NavLink[] = [
  { label: "Latest", href: "/latest" },
  { label: "In Search of Beauty", href: "/in-search-of-beauty", lines: ["In Search", "of Beauty"] },
  { label: "Sitting with Buyahka", href: "/sitting-with-buyahka", lines: ["Sitting with", "Buyahka"] },
  { label: "Community", href: "/community" },
  { label: "Recommended", href: "/recommended" },
  { label: "About", href: "/about" },
];
