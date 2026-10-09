"use client";

import { useEffect, useRef, useState } from "react";
import CtaLink from "./CtaLink";

export type FeaturedSlide = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

const INTERVAL_MS = 3000;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The homepage's "what's happening on the site right now" spotlight — cycles
// through a few highlights (the memoir, a new release, a new episode, ...)
// every 3s. Auto-rotation pauses on hover/focus and has an explicit
// pause/play control (WCAG 2.2.2 — an auto-advancing carousel needs a way to
// stop it, hover alone doesn't count on touch devices). Starts paused for
// anyone with prefers-reduced-motion set.
export default function FeaturedCarousel({ slides }: { slides: FeaturedSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);

  // Set after mount, not as the initial state, so the client's first render
  // matches the server-rendered markup (no hydration mismatch) — the
  // reduced-motion check only runs once hydration is already done.
  useEffect(() => {
    if (prefersReducedMotion()) setPaused(true);
  }, []);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;
  const slide = slides[index];

  return (
    <div
      className="border-b border-night-700/60 pb-10 sm:pb-14"
      onMouseEnter={() => {
        hoverRef.current = true;
        setPaused(true);
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
        if (!focusRef.current) setPaused(false);
      }}
      onFocus={() => {
        focusRef.current = true;
        setPaused(true);
      }}
      onBlur={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) return;
        focusRef.current = false;
        if (!hoverRef.current) setPaused(false);
      }}
    >
      <div key={index} className="featured-fade">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
          {slide.eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl text-cream-100 sm:text-4xl">{slide.title}</h2>
        <p className="mt-3 max-w-2xl font-body text-lg text-cream-300">{slide.description}</p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-5">
        <CtaLink href={slide.ctaHref}>{slide.ctaLabel}</CtaLink>

        {slides.length > 1 && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2" role="group" aria-label="Choose what's shown">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${s.title}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-gold-400" : "w-1.5 bg-cream-100/30 hover:bg-cream-100/50"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                hoverRef.current = false;
                focusRef.current = false;
                setPaused((p) => !p);
              }}
              aria-label={paused ? "Resume automatic rotation" : "Pause automatic rotation"}
              className="text-cream-300/60 hover:text-gold-300"
            >
              {paused ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                  <path d="M7 5.5h3.2v13H7v-13Zm6.8 0H17v13h-3.2v-13Z" />
                </svg>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
