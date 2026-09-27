"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { navLinks } from "@/lib/nav";
import Container from "./Container";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Solid background once the page has scrolled even a little — transparent
  // at the very top so it can float over a hero image.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Keep the header solid whenever the mobile menu is open, regardless of
  // scroll position, so its contents stay legible over a hero image.
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid
          ? "border-b border-night-700/60 bg-night-900/90 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container
        className={`flex h-24 items-center justify-between transition-[height] duration-300 sm:h-28 ${
          scrolled ? "lg:h-28" : "lg:h-36"
        }`}
      >
        <Link href="/" aria-label="Fireflies in the Night — home" className="shrink-0">
          <Image
            src="/images/fireflies-logo-badge.png"
            alt="Fireflies in the Night"
            width={720}
            height={720}
            priority
            className={`h-20 w-auto transition-[height] duration-300 sm:h-24 ${
              scrolled ? "lg:h-24" : "lg:h-34"
            }`}
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-start">
            {navLinks.map((link, i) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Fragment key={link.href}>
                  {i > 0 && (
                    <li aria-hidden="true" className="mt-1 h-7 w-px bg-cream-100/25" />
                  )}
                  <li>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`group flex flex-col items-center px-5 font-nav text-[13px] font-medium uppercase leading-[1.4] tracking-[0.16em] transition-colors [text-shadow:0_1px_10px_rgba(0,0,0,0.7)] ${
                        active ? "text-gold-300" : "text-cream-100 hover:text-gold-300"
                      }`}
                    >
                      <span className="flex h-[2.8em] items-center justify-center text-center">
                        {link.lines
                          ? link.lines.map((line, n) => (
                              <Fragment key={line}>
                                {n > 0 && <br />}
                                {line}
                              </Fragment>
                            ))
                          : link.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-2 block h-0.5 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(227,186,99,0.65)] transition-all duration-300 ${
                          active ? "w-10" : "w-7 group-hover:w-10"
                        }`}
                      />
                    </Link>
                  </li>
                </Fragment>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-cream-100 hover:text-gold-300"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-6 w-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} stroke="currentColor" className="h-6 w-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          )}
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="lg:hidden border-t border-night-700/60 bg-night-900">
          <Container>
            <ul className="flex flex-col py-2">
              {navLinks.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href} className="border-b border-cream-100/10 last:border-b-0">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`block py-3.5 font-nav text-[13px] font-medium uppercase tracking-[0.16em] ${
                        active ? "text-gold-300" : "text-cream-100 hover:text-gold-300"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
