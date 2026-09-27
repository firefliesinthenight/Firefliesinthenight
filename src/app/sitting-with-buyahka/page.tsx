import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import PieceCallout from "@/components/PieceCallout";

export const metadata: Metadata = {
  title: "Sitting with Buyahka",
  description:
    "Faith examined honestly — where it's inherited, where it's chosen, and what it produces when it's tested.",
};

export default function SittingWithBuyahkaPage() {
  return (
    <Container className="py-14 sm:py-20">
      <PageIntro
        title="Sitting with Buyahka"
        intro="Faith examined honestly — where it's inherited, where it's chosen, and what it produces when it's tested."
      />

      <div className="mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:mt-14">
        <PieceCallout
          flagship
          label="The memoir"
          title="Buyahka & Abrar"
          description="The complete Abrar's Memoir — finished, and free to read online."
          ctaLabel="Read the memoir"
          ctaHref="/sitting-with-buyahka/buyahka-and-abrar"
        />
        <PieceCallout
          label="Essay"
          title="Critical Thinking Did Not Weaken My Faith"
          description="On questioning belief without losing it."
          ctaLabel="Read the piece"
          ctaHref="/sitting-with-buyahka/critical-thinking-did-not-weaken-my-faith"
        />
      </div>
    </Container>
  );
}
