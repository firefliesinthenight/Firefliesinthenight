// Renders an essay stored as an array of short paragraphs, in the same
// type and rhythm as Movement Was My Oxygen. A string starting with "## "
// becomes a section heading; one starting with "> " becomes a set-off quote.
export default function EssayBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="mt-10 flex max-w-prose flex-col gap-5 font-body text-lg leading-loose text-cream-200">
      {paragraphs.map((p, i) => {
        if (p.startsWith("## ")) {
          return (
            <h2 key={i} className="mt-8 font-display text-2xl text-cream-100 sm:text-3xl">
              {p.slice(3)}
            </h2>
          );
        }
        if (p.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-gold-400/60 pl-5 font-display text-xl italic text-cream-100"
            >
              {p.slice(2)}
            </blockquote>
          );
        }
        return <p key={i}>{p}</p>;
      })}
    </div>
  );
}
