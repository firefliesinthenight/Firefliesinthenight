import type { Metadata } from "next";
import Container from "@/components/Container";
import { aboutParagraphs } from "@/lib/bios";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ahmad Abrar: songs, poems, spoken reflections, essays, films and unofficial histories. Where faith meets the street.",
};

export default function AboutPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl text-cream-100 sm:text-4xl md:text-5xl">
          About Fireflies in the Night
        </h1>

        <div className="mt-8 flex flex-col gap-6 font-body text-lg leading-relaxed text-cream-200">
          {aboutParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <p className="mt-14 border-t border-night-600/50 pt-6 font-body text-sm text-cream-300/70">
          Some material here involves real people and real history. What&apos;s
          shared publicly has been chosen with that in mind.
        </p>
      </div>
    </Container>
  );
}
