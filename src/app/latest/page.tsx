import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import ReleaseCarousel from "@/components/ReleaseCarousel";
import ShareButton from "@/components/ShareButton";
import { getReleases } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Latest",
  description: "New releases and work in progress from Ahmad, as they're ready.",
};

export const revalidate = 3600;

export default function LatestPage() {
  const releases = getReleases();
  return (
    <Container className="py-14 sm:py-20">
      <PageIntro
        title="Latest"
        intro="New releases and work in progress — posted here as they're ready, not on a schedule."
      />

      {releases.length > 0 && (
        <div className="mt-10 max-w-3xl sm:mt-14">
          <ReleaseCarousel releases={releases} />
          <div className="mt-5">
            <ShareButton title={`${releases[0].title} — Fireflies in the Night`} />
          </div>
        </div>
      )}
    </Container>
  );
}
