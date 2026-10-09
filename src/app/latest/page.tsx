import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import StreamingLinks from "@/components/StreamingLinks";
import ShareButton from "@/components/ShareButton";
import { releases } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Latest",
  description: "New releases and work in progress from Ahmad, as they're ready.",
};

export default function LatestPage() {
  const [current, ...earlier] = releases;

  return (
    <Container className="py-14 sm:py-20">
      <PageIntro
        title="Latest"
        intro="New releases and work in progress — posted here as they're ready, not on a schedule."
      />

      {current && (
        <div className="mt-10 max-w-3xl sm:mt-14">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Current release
          </p>
          <h2 className="mt-2 font-display text-2xl text-cream-100 sm:text-3xl">{current.title}</h2>
          <p className="mt-1 font-body text-sm text-cream-300/70">{current.dateLabel}</p>

          <div className="mt-5">
            <YouTubeEmbed youtubeId={current.youtubeId} title={current.title} />
          </div>

          <StreamingLinks links={current.links} />

          {current.description && (
            <p className="mt-5 font-body text-cream-300">{current.description}</p>
          )}

          <div className="mt-5">
            <ShareButton title={`${current.title} — Fireflies in the Night`} />
          </div>
        </div>
      )}

      {earlier.length > 0 && (
        <div className="mt-16 max-w-3xl border-t border-night-600/50 pt-10">
          <h3 className="font-display text-xl text-cream-100">Earlier</h3>
          <ul className="mt-5 flex flex-col gap-5">
            {earlier.map((release) => (
              <li key={release.slug}>
                <p className="font-display text-lg text-cream-100">{release.title}</p>
                <p className="font-body text-sm text-cream-300/70">{release.dateLabel}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}
