import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import PieceCallout from "@/components/PieceCallout";
import CtaLink from "@/components/CtaLink";

export const metadata: Metadata = {
  title: "Sitting with Buyahka",
  description:
    "Faith examined honestly — where it's inherited, where it's chosen, and what it produces when it's tested.",
};

// Essays sit in the main column so readers see right away what's open to them.
// Abrar's Memoir is private (each chapter asks for a key), so it sits in a side
// panel and says so plainly — nobody should think the whole page is locked.
export default function SittingWithBuyahkaPage() {
  return (
    <Container className="py-14 sm:py-20">
      <PageIntro
        title="Sitting with Buyahka"
        intro="Faith examined honestly — where it's inherited, where it's chosen, and what it produces when it's tested."
      />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-10">
        <section aria-label="Essays" className="flex min-w-0 flex-col gap-6">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Essays · open to everyone
          </p>
          <PieceCallout
            label="Essay"
            title="Critical Thinking Did Not Weaken My Faith"
            description="On questioning belief without losing it."
            ctaLabel="Read the piece"
            ctaHref="/sitting-with-buyahka/critical-thinking-did-not-weaken-my-faith"
          />
        </section>

        <aside
          aria-label="Abrar's Memoir"
          className="h-fit rounded-xl border border-night-600/50 bg-night-900/40 p-5 lg:sticky lg:top-36"
        >
          <p className="flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth={2}>
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            Private · by invitation
          </p>
          <h3 className="mt-2 font-display text-xl text-cream-100">Buyahka &amp; Abrar</h3>
          <p className="mt-2 font-body text-sm text-cream-300">
            Abrar&apos;s Memoir is finished and kept private. Each chapter asks for a key.
            If you&apos;d like to read it, ask Ahmad.
          </p>
          <div className="mt-4 flex flex-col items-start gap-3">
            <CtaLink href="/sitting-with-buyahka/buyahka-and-abrar" variant="outline">
              I have a key
            </CtaLink>
            <CtaLink href="/contact?about=Buyahka%20%26%20Abrar" variant="outline">
              Ask Ahmad for access
            </CtaLink>
          </div>
        </aside>
      </div>
    </Container>
  );
}
