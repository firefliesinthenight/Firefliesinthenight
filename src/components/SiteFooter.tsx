import Link from "next/link";
import { navLinks } from "@/lib/nav";
import Container from "./Container";

export default function SiteFooter() {
  return (
    <footer className="border-t border-night-700/60 bg-night-950">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-cream-100">Fireflies in the Night</p>
          <p className="mt-1 font-body text-sm text-cream-300">
            Essays, Abrar's Memoir, and the history of one community.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-cream-300 hover:text-gold-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-night-700/40 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-xs text-cream-300/70">
          &copy; {new Date().getFullYear()} Fireflies in the Night. All rights reserved.
        </p>
        <ul className="flex gap-x-5 text-xs">
          <li>
            <Link href="/contact" className="text-cream-300/70 hover:text-gold-300">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="text-cream-300/70 hover:text-gold-300">
              Privacy
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
