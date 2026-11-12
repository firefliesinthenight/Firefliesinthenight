import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import BackLink from "@/components/BackLink";
import CtaLink from "@/components/CtaLink";
import ShareButton from "@/components/ShareButton";
import { chapters, parts } from "@/lib/memoir";

export const metadata: Metadata = {
  title: "Buyahka & Abrar",
  description: "Abrar's Memoir — finished, and kept private. Readers need a key from Ahmad.",
};

export default function BuyahkaAndAbrarPage() {
  return (
    <Container className="py-14 sm:py-20">
      <BackLink href="/sitting-with-buyahka" label="Sitting with Buyahka" />

      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-3xl text-cream-100 sm:text-4xl md:text-5xl">
          Buyahka & Abrar
        </h1>
        <p className="mt-3 font-body text-lg italic text-cream-300">
          Abrar's Memoir — finished, and kept private. Each chapter asks for a key; ask Ahmad if you'd like to read it.
        </p>
        <p className="mt-3 font-body text-sm text-cream-300/70">
          Twelve chapters, across four parts.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <CtaLink href={`/sitting-with-buyahka/buyahka-and-abrar/${chapters[0].slug}`}>
            Start reading
          </CtaLink>
          <CtaLink href="/contact?about=Buyahka%20%26%20Abrar" variant="outline">
            Tell Ahmad what you think
          </CtaLink>
          <ShareButton title="Buyahka & Abrar — Fireflies in the Night" />
        </div>
      </header>

      <nav aria-label="Chapters" className="mt-10 max-w-2xl rounded-xl border border-night-600/50 bg-night-800/40 p-5 sm:p-6">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
          Chapters
        </p>
        <div className="mt-4 flex flex-col gap-4">
          {parts.map((part) => (
            <div key={part.title}>
              <p className="font-body text-xs font-semibold text-cream-300/70">{part.title}</p>
              <ol className="mt-1.5 flex flex-col gap-1.5">
                {chapters
                  .filter((c) => c.number >= part.range[0] && c.number <= part.range[1])
                  .map((chapter) => (
                    <li key={chapter.slug}>
                      <Link
                        href={`/sitting-with-buyahka/buyahka-and-abrar/${chapter.slug}`}
                        className="font-body text-cream-200 hover:text-gold-300"
                      >
                        {chapter.number}. {chapter.title}
                      </Link>
                    </li>
                  ))}
              </ol>
            </div>
          ))}
        </div>
      </nav>
    </Container>
  );
}
