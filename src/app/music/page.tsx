import type { Metadata } from "next";
import Container from "@/components/Container";
import PageIntro from "@/components/PageIntro";
import ReleaseCarousel from "@/components/ReleaseCarousel";
import ShareButton from "@/components/ShareButton";
import { getSongs } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Songs by Ahmad Abrar, built from his poems and notebooks: love, loss, faith and starting over.",
};

// Songs only, kept apart from the essays and reflections so someone who came
// for the music finds it in one place. Videos (the intro, the shorts) live on
// /latest; songs appear in both.
export const revalidate = 3600;

export default function MusicPage() {
  const songs = getSongs();
  return (
    <Container className="py-14 sm:py-20">
      <PageIntro
        title="Music"
        intro="Songs built from Ahmad's poems and notebooks: love, loss, faith and starting over."
      />

      {songs.length > 0 && (
        <div className="mt-10 max-w-3xl sm:mt-14">
          <ReleaseCarousel releases={songs} />
          <div className="mt-5">
            <ShareButton title={`${songs[0].title} — Fireflies in the Night`} />
          </div>
        </div>
      )}
    </Container>
  );
}
