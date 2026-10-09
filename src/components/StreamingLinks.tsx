// A row of "listen on ___" buttons. Empty until real streaming URLs are
// added to src/lib/releases.ts — see the note there on why those aren't
// guessed at.
export default function StreamingLinks({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  if (links.length === 0) {
    return (
      <p className="mt-4 font-body text-sm italic text-cream-300/70">
        Streaming links coming soon.
      </p>
    );
  }

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/60 px-4 py-2 text-sm font-semibold text-gold-300 transition-colors hover:border-gold-300 hover:text-gold-200"
        >
          {link.label}
          <span aria-hidden="true">&#8599;</span>
        </a>
      ))}
    </div>
  );
}
