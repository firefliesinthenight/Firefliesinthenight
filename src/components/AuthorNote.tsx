import Link from "next/link";
import { mediumBio } from "@/lib/bios";

// The approved medium bio, shown at the end of individual pieces so a reader
// arriving from a shared link knows whose voice this is.
export default function AuthorNote() {
  return (
    <aside className="mt-14 rounded-xl border border-night-600/50 bg-night-800/40 p-6 sm:p-8">
      <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
        About the author
      </p>
      <p className="mt-3 font-body text-cream-200">{mediumBio[0]}</p>
      <Link
        href="/about"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300"
      >
        More about Fireflies in the Night
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </aside>
  );
}
