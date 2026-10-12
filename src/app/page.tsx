import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import SectionCard from "@/components/SectionCard";
import PieceCallout from "@/components/PieceCallout";
import CtaLink from "@/components/CtaLink";
import CompletePoem from "@/components/CompletePoem";
import FeaturedCarousel, { type FeaturedSlide } from "@/components/FeaturedCarousel";
import { releases } from "@/lib/releases";

const heroLine =
  "Essays, songs, Abrar's Memoir, and the history of one community — written down before it's forgotten.";

const currentRelease = releases[0];

// What's happening on the site right now — the homepage's rotating
// spotlight (the first slide is what a no-JS/first paint shows). Add a slide
// here for anything else worth surfacing this way (a new essay, ...).
const releaseSlides: FeaturedSlide[] = [
  ...(currentRelease
    ? [
        {
          eyebrow: currentRelease.status === "upcoming" ? "New Song" : "New Release",
          title: currentRelease.title,
          description:
            currentRelease.status === "upcoming"
              ? `${currentRelease.dateLabel.replace("New song · ", "Out ")}. Pre-save it now.`
              : "Ahmad's latest release — watch the video now.",
          ctaLabel: currentRelease.status === "upcoming" ? "Pre-save" : "Watch now",
          ctaHref: "/latest",
        } satisfies FeaturedSlide,
      ]
    : []),
];

const memoirSlide: FeaturedSlide = {
  eyebrow: "Featured Now",
  title: "Buyahka & Abrar",
  description:
    "The complete Abrar's Memoir — finished, and free to read online. If you start with one thing on this site, start here.",
  ctaLabel: "Read the memoir",
  ctaHref: "/sitting-with-buyahka/buyahka-and-abrar",
};

const episodeSlide: FeaturedSlide = {
  eyebrow: "New Episode",
  title: "Through the Storms — Episode 03",
  description:
    "“Movement Was My Oxygen,” on video — the companion piece to the essay.",
  ctaLabel: "Watch the episode",
  ctaHref: "/in-search-of-beauty/movement-was-my-oxygen",
};

// While a song is upcoming (launch week), it leads the spotlight — that is
// what people arriving from social posts are looking for. Otherwise the
// memoir leads, as before.
const featuredSlides: FeaturedSlide[] =
  currentRelease?.status === "upcoming"
    ? [...releaseSlides, memoirSlide, episodeSlide]
    : [memoirSlide, ...releaseSlides, episodeSlide];

const aboutTeaser =
  "Fireflies in the Night is the intellectual and creative home for Ahmad's writing — a builder, husband, father, grandfather, and community participant, using one imperfect life as evidence, not as proof of authority.";

export default function Home() {
  return (
    <>
      <section className="relative -mt-24 flex h-[70vh] min-h-110 w-full items-end overflow-hidden sm:-mt-28 lg:-mt-36 sm:h-[85vh] sm:min-h-140">
        <Image
          src="/images/fireflies-bg1.png"
          alt="A lantern-lit writing desk at an open window overlooking a starlit forest and mountains, with keepsake books, a photo, and fireflies glowing in the dark"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-night-950/70 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-night-950/85 to-transparent sm:h-36"
        />
        <Container className="relative pb-12 sm:pb-16">
          <p
            className="hero-tagline max-w-2xl font-display text-2xl italic leading-snug text-cream-100 sm:text-3xl md:text-4xl [text-shadow:0_2px_16px_rgba(0,0,0,0.85)]"
          >
            {heroLine}
          </p>
        </Container>
      </section>

      <CompletePoem />

      <Container className="flex flex-col gap-10 py-14 sm:gap-14 sm:py-20">
        <FeaturedCarousel slides={featuredSlides} />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8">
          <SectionCard
            title="In Search of Beauty"
            href="/in-search-of-beauty"
            intro="Essays about sacrifice, attention, and what holds a family or a 'we' together — written from inside one imperfect life, not above it."
          >
            <PieceCallout
              label="Featured essay"
              title="Movement Was My Oxygen"
              description="The opening essay — where this collection starts."
              ctaLabel="Visual Essays"
              ctaHref="/in-search-of-beauty/movement-was-my-oxygen"
              note="Personal reflections, stories and ideas."
            />
          </SectionCard>

          <SectionCard
            title="Sitting with Buyahka"
            href="/sitting-with-buyahka"
            intro="Faith examined honestly — where it's inherited, where it's chosen, and what it produces when it's tested."
          >
            <PieceCallout
              flagship
              label="The memoir"
              title="Buyahka & Abrar"
              description="The complete Abrar's Memoir — finished, and free to read online."
              ctaLabel="Read the memoir"
              ctaHref="/sitting-with-buyahka/buyahka-and-abrar"
            />
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {currentRelease && (
            <SectionCard
              size="sm"
              title="Latest"
              href="/latest"
              intro="New releases and work in progress — posted here as they're ready."
            >
              <div className="border-t border-night-600/50 pt-4 text-sm">
                <p className="text-cream-200">
                  <span className="font-semibold text-gold-300">
                    {currentRelease.status === "upcoming" ? "Coming soon — " : "Current release — "}
                  </span>
                  {currentRelease.title}
                </p>
                <div className="mt-3">
                  <CtaLink href="/latest" variant="outline">
                    {currentRelease.status === "upcoming" ? "Pre-save" : "Watch now"}
                  </CtaLink>
                </div>
              </div>
            </SectionCard>
          )}

          <SectionCard
            size="sm"
            title="Community"
            href="/community"
            intro="What community gave, what it built, what it failed at, and what's worth passing forward."
          >
            <div className="border-t border-night-600/50 pt-4 text-sm">
              <p className="text-cream-200">
                <span className="font-semibold text-gold-300">Featured — </span>
                I Remember — Dar ul Islah
              </p>
              <div className="mt-3">
                <CtaLink href="/community/i-remember-dar-ul-islah" variant="outline">
                  Read the piece
                </CtaLink>
              </div>
            </div>
          </SectionCard>

          <SectionCard
            size="sm"
            title="Recommended"
            href="/recommended"
            intro="Books, talks, and people worth spending time with — chosen for why they mattered to Ahmad, not as a best-of list."
          >
            <div className="border-t border-night-600/50 pt-4 text-sm">
              <p className="text-cream-200">
                <span className="font-semibold text-gold-300">Featured — </span>
                Three Books I Read Before Fifteen
              </p>
              <div className="mt-3">
                <CtaLink href="/recommended/three-books-i-read-before-fifteen" variant="outline">
                  Read the list
                </CtaLink>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="rounded-2xl border-t border-night-600/60 px-1 pt-8 sm:flex sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-xl text-cream-100 sm:text-2xl">About</h2>
            <p className="mt-3 font-body text-cream-300">{aboutTeaser}</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:shrink-0">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300"
            >
              Read more about Fireflies
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
