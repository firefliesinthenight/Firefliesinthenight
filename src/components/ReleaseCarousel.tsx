"use client";

import { useState } from "react";
import type { Release } from "@/lib/releases";
import YouTubeEmbed from "./YouTubeEmbed";
import StreamingLinks from "./StreamingLinks";

// A main player (the selected release) with a scrollable filmstrip of every
// release below it — released and upcoming together, newest first. The
// filmstrip only appears once there's more than one entry; with just one
// release there's nothing to scroll through yet.
export default function ReleaseCarousel({ releases }: { releases: Release[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = releases[activeIndex];

  if (!active) return null;

  return (
    <div>
      <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
        {active.status === "upcoming" ? "Upcoming" : "Current release"}
      </p>
      <h2 className="mt-2 font-display text-2xl text-cream-100 sm:text-3xl">{active.title}</h2>
      <p className="mt-1 font-body text-sm text-cream-300/70">{active.dateLabel}</p>

      <div className="mt-5">
        {active.youtubeId ? (
          <YouTubeEmbed youtubeId={active.youtubeId} title={active.title} />
        ) : active.cover ? (
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-night-600/50 bg-night-950/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.cover}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.cover}
              alt={`${active.title} cover art`}
              className="relative h-full w-auto object-contain"
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-xl border border-night-600/50 bg-night-950/60">
            <p className="font-body text-sm italic text-cream-300/60">Coming soon.</p>
          </div>
        )}
      </div>

      <StreamingLinks links={active.links} />

      {active.description && (
        <p className="mt-5 font-body text-cream-300">{active.description}</p>
      )}

      {releases.length > 1 && (
        <div
          className="mt-10 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollSnapType: "x proximity" }}
        >
          {releases.map((release, i) => (
            <button
              key={release.slug}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-current={i === activeIndex}
              style={{ scrollSnapAlign: "start" }}
              className={`w-36 shrink-0 text-left transition-opacity sm:w-40 ${
                i === activeIndex ? "" : "opacity-55 hover:opacity-90"
              }`}
            >
              <div
                className={`aspect-video overflow-hidden rounded-lg border bg-night-800 ${
                  i === activeIndex ? "border-gold-400" : "border-night-600/50"
                }`}
              >
                {release.youtubeId ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://i.ytimg.com/vi/${release.youtubeId}/hqdefault.jpg`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : release.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={release.cover} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="font-body text-[10px] uppercase tracking-[0.15em] text-cream-300/50">
                      Upcoming
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-1.5 truncate font-body text-xs text-cream-200">{release.title}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
