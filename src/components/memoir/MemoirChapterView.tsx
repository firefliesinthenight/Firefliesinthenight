"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { MediaRef, MemoirBlock, ProseLine } from "@/lib/memoirBlocks";
import { getSignedChapterMedia } from "@/app/sitting-with-buyahka/buyahka-and-abrar/media-actions";
import SoundtrackPlayer from "./SoundtrackPlayer";
import "@/styles/memoir-cinematic.css";

const SESSION_KEY = "memoir-key";

type LightboxState = { kind: "image" | "video"; src: string; caption: string } | null;
type MediaUrlMap = Record<string, string>;

function collectMediaRefs(blocks: MemoirBlock[]): MediaRef[] {
  const refs: MediaRef[] = [];
  for (const block of blocks) {
    if (block.type === "fpVideo") {
      refs.push(block.video, block.poster);
    } else if (block.type === "fpImage") {
      refs.push(block.image);
    }
  }
  return refs;
}

function ProseLineEl({ line }: { line: ProseLine }) {
  switch (line.kind) {
    case "opener":
      return <p className="mc-opener">{line.text}</p>;
    case "drop-cap":
      return <p className="mc-drop-cap">{line.text}</p>;
    case "center-italic":
      return (
        <p style={{ textAlign: "center", fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: "1.3rem", color: "var(--mc-accent)", margin: "1.5rem 0" }}>
          {line.text}
        </p>
      );
    default:
      return <p>{line.text}</p>;
  }
}

function Block({
  block,
  mediaUrls,
  onOpenLightbox,
}: {
  block: MemoirBlock;
  mediaUrls: MediaUrlMap;
  onOpenLightbox: (state: LightboxState) => void;
}) {
  switch (block.type) {
    case "hero":
      return (
        <section className="mc-hero">
          <div className="mc-book">{block.book}</div>
          <div className="mc-ch-label">{block.chLabel}</div>
          <h1>
            {block.title}
            {block.em && <span className="mc-em">{block.em}</span>}
          </h1>
          <div className="mc-subtitle">{block.subtitle}</div>
          <div className="mc-meta">{block.meta}</div>
        </section>
      );
    case "fpVideo": {
      const videoUrl = mediaUrls[block.video.publicId];
      const posterUrl = mediaUrls[block.poster.publicId];
      return (
        <aside className="mc-fp-centerpiece">
          <div className="mc-fp-eyebrow">{block.eyebrow}</div>
          <div
            className="mc-fp-frame"
            onClick={() => videoUrl && onOpenLightbox({ kind: "video", src: videoUrl, caption: block.caption })}
          >
            <video poster={posterUrl} preload="metadata" muted>
              {videoUrl && <source src={videoUrl} type="video/mp4" />}
            </video>
            <div className="mc-fp-play-btn" />
          </div>
          <div className="mc-fp-caption">{block.caption}</div>
        </aside>
      );
    }
    case "fpImage": {
      const imageUrl = mediaUrls[block.image.publicId];
      return (
        <div className="mc-fp-centerpiece">
          <div className="mc-fp-eyebrow">{block.eyebrow}</div>
          <div
            className="mc-fp-frame"
            onClick={() => imageUrl && onOpenLightbox({ kind: "image", src: imageUrl, caption: block.caption })}
          >
            {imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt={block.alt} loading="lazy" />
            )}
          </div>
          <div className="mc-fp-caption">{block.caption}</div>
        </div>
      );
    }
    case "poem":
      return (
        <section className="mc-poem-section">
          <div className="mc-poem-wrap">
            <div className="mc-poem-title">{block.title}</div>
            <div className="mc-poem-trans">{block.translit}</div>
            {block.arabic && (
              <div style={{ direction: "rtl", fontFamily: "var(--font-cormorant), serif", fontSize: "1.4rem", color: "var(--mc-ink)", textAlign: "center", marginBottom: "1.5rem" }}>
                {block.arabic}
              </div>
            )}
            <div className="mc-poem-body" style={block.align === "left" ? { textAlign: "left" } : undefined}>
              {block.stanzas.map((stanza, i) => (
                <div key={i} className="mc-stanza" style={stanza.accent ? { color: "var(--mc-accent)" } : undefined}>
                  {stanza.lines.map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < stanza.lines.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "spine":
      return (
        <section className="mc-spine">
          <span className="mc-label">{block.label}</span>
          <div className="mc-body">
            {block.lines.map((line, i) => (
              <span key={i}>
                {line.emphasis ? <em>{line.text}</em> : line.text}
                {i < block.lines.length - 1 && <br />}
              </span>
            ))}
          </div>
        </section>
      );
    case "hinaPoem":
      return (
        <div className="mc-hina-poem">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.imageSrc} alt={block.alt} loading="lazy" />
          <div>
            <span className="mc-meta">{block.meta}</span>
            <h3>{block.title}</h3>
            {block.paragraphs.map((p, i) => (
              <p key={i} className={p.accent ? "mc-accent" : undefined}>
                {p.text}
              </p>
            ))}
          </div>
        </div>
      );
    case "artifactRow":
      return (
        <div className="mc-artifact-row">
          <span className="mc-row-label">{block.rowLabel}</span>
          <h3>{block.heading}</h3>
          {block.intro && <p className="mc-intro">{block.intro}</p>}
          <div className="mc-grid">
            {block.items.map((item, i) => (
              <div key={i} className="mc-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageSrc} alt={item.alt} loading="lazy" />
                <div className="mc-caption">{item.caption}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "prose":
      return (
        <section className="mc-block">
          <div className="mc-prose">
            {block.lines.map((line, i) => (
              <ProseLineEl key={i} line={line} />
            ))}
          </div>
        </section>
      );
    case "pullquote":
      return (
        <section className="mc-pullquote">
          <div className="mc-body">
            {block.lines.map((line, i) => (
              <span key={i}>
                {line || " "}
                {i < block.lines.length - 1 && <br />}
              </span>
            ))}
            <span className="mc-src">{block.src}</span>
          </div>
        </section>
      );
    case "sectionCard":
      return (
        <section className="mc-section-card">
          <div className="mc-roman">— {block.roman} —</div>
          <h2>{block.heading}</h2>
          <div className="mc-lede">{block.lede}</div>
        </section>
      );
    case "duaCard":
      return (
        <div className="mc-dua-card">
          <span className="mc-label">{block.label}</span>
          <div className="mc-arabic">{block.arabic}</div>
          <div className="mc-translit">{block.translit}</div>
          <div className="mc-meaning">{block.meaning}</div>
          <div className="mc-gloss">{block.gloss}</div>
        </div>
      );
    case "artifactCard":
      return (
        <div className="mc-artifact-card">
          <span className="mc-label">{block.label}</span>
          <h3>{block.heading}</h3>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.imageSrc} alt={block.alt} loading="lazy" />
          <div className="mc-caption">{block.caption}</div>
        </div>
      );
    case "artifactGrid":
      return (
        <div className="mc-artifact-card">
          <span className="mc-label">{block.label}</span>
          <h3>{block.heading}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", margin: "1.5rem 0" }}>
            {block.images.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={img.src} alt={img.alt} loading="lazy" style={{ width: "100%", height: "auto", display: "block", border: "1px solid var(--mc-rule)" }} />
            ))}
          </div>
          <div className="mc-caption">{block.caption}</div>
        </div>
      );
    case "quoteBlock":
      return (
        <div
          style={{
            maxWidth: "640px",
            margin: "2.5rem auto",
            padding: "1.5rem 2rem",
            borderLeft: "3px solid var(--mc-accent)",
            background: "rgba(212, 164, 74, 0.05)",
            fontStyle: "italic",
            lineHeight: 1.7,
            color: "var(--mc-ink)",
          }}
        >
          {block.text}
        </div>
      );
    case "essayDrop":
      return (
        <div className="mc-essay-drop">
          <span className="mc-label">{block.label}</span>
          <h3>{block.title}</h3>
          <div className="mc-byline">{block.byline}</div>
          {block.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      );
    case "births":
      return (
        <div className="mc-births">
          <span className="mc-label">{block.label}</span>
          {block.entries.map((e, i) => (
            <div key={i} className="mc-entry">
              <div className="mc-name">{e.name}</div>
              <div className="mc-date">{e.date}</div>
            </div>
          ))}
        </div>
      );
    case "driveVideo":
      return (
        <div className="mc-aside-card" style={{ maxWidth: "720px", margin: "3rem auto" }}>
          <span className="mc-label">{block.label}</span>
          <h3>{block.heading}</h3>
          <div style={{ margin: "1.5rem 0" }}>
            <iframe
              src={block.src}
              width="100%"
              height="480"
              allow="autoplay; encrypted-media; fullscreen"
              style={{ border: "1px solid var(--mc-rule)", background: "#000" }}
              loading="lazy"
            />
          </div>
          <p style={{ fontStyle: "italic", color: "var(--mc-ink-soft)" }}>{block.caption}</p>
        </div>
      );
    case "driveVideoRow":
      return (
        <div className="mc-artifact-row">
          <span className="mc-row-label">{block.rowLabel}</span>
          <h3>{block.heading}</h3>
          <div className="mc-grid">
            {block.items.map((item, i) => (
              <div key={i} className="mc-item">
                <iframe
                  src={item.src}
                  width="100%"
                  height="280"
                  allow="autoplay; encrypted-media; fullscreen"
                  style={{ border: "none", background: "#000" }}
                  loading="lazy"
                />
                <div className="mc-caption">{item.caption}</div>
              </div>
            ))}
          </div>
        </div>
      );
    case "asideCard":
      return (
        <section className="mc-block" style={{ maxWidth: "880px" }}>
          <aside className="mc-aside-card">
            <span className="mc-label">{block.label}</span>
            <h3>{block.heading}</h3>
            {block.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </aside>
        </section>
      );
    case "ornament":
      return <div className="mc-ornament">· · ·</div>;
    case "chapterEnd":
      return (
        <section className="mc-chapter-end">
          <div className="mc-symbol">{block.symbol ?? "✦"}</div>
          <div className="mc-next-label">Next</div>
          <div className="mc-next-title">{block.nextTitle}</div>
        </section>
      );
    default:
      return null;
  }
}

export default function MemoirChapterView({
  blocks,
  prev,
  next,
  soundtrack,
}: {
  blocks: MemoirBlock[];
  prev: { href: string; title: string } | null;
  next: { href: string; title: string } | null;
  soundtrack?: { name: string; tracks: { media: MediaRef; title: string }[] };
}) {
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [mediaUrls, setMediaUrls] = useState<MediaUrlMap | null>(null);
  const [checking, setChecking] = useState(true);
  const [key, setKey] = useState("");
  const [error, setError] = useState(false);

  const mediaRefs = useMemo(() => {
    const refs = collectMediaRefs(blocks);
    if (soundtrack) refs.push(...soundtrack.tracks.map((t) => t.media));
    return refs;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks, soundtrack]);

  async function tryUnlock(candidateKey: string): Promise<boolean> {
    const result = await getSignedChapterMedia(candidateKey, mediaRefs);
    if (!result.ok) return false;
    const map: MediaUrlMap = {};
    mediaRefs.forEach((ref, i) => {
      map[ref.publicId] = result.urls[i];
    });
    setMediaUrls(map);
    return true;
  }

  useEffect(() => {
    const remembered = sessionStorage.getItem(SESSION_KEY);
    if (!remembered) {
      setChecking(false);
      return;
    }
    let cancelled = false;
    tryUnlock(remembered).then((ok) => {
      if (!cancelled) setChecking(false);
      if (!ok && !cancelled) sessionStorage.removeItem(SESSION_KEY);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(false);
    const ok = await tryUnlock(key);
    if (ok) {
      sessionStorage.setItem(SESSION_KEY, key);
    } else {
      setError(true);
    }
  }

  if (checking) return null;

  if (!mediaUrls) {
    return (
      <div className="memoir-chapter">
        <div style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "2rem" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: "22rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
              padding: "2.5rem",
              border: "1px solid var(--mc-rule, #2c241a)",
              background: "var(--mc-bg-elev, #110f0c)",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <p style={{ fontStyle: "italic", color: "var(--mc-ink-soft, #ada290)" }}>
              This is Abrar's Memoir, kept private. Enter the key to keep reading.
            </p>
            <input
              type="password"
              autoComplete="off"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key"
              style={{
                borderRadius: "6px",
                border: "1px solid var(--mc-rule, #2c241a)",
                background: "#05040388",
                color: "var(--mc-ink, #f0e6d4)",
                padding: "0.6rem 0.8rem",
                textAlign: "center",
              }}
            />
            <button
              type="submit"
              style={{
                borderRadius: "6px",
                background: "var(--mc-accent, #d4a44a)",
                color: "#1a1612",
                fontWeight: 600,
                padding: "0.6rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Unlock
            </button>
            {error && <p style={{ color: "#e28b6d", fontSize: "0.9rem" }}>That key doesn&apos;t match. Try again.</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="memoir-chapter">
      {blocks.map((block, i) => (
        <Block key={i} block={block} mediaUrls={mediaUrls} onOpenLightbox={setLightbox} />
      ))}

      <nav className="mc-chapter-nav" aria-label="Chapter navigation">
        {prev ? (
          <a href={prev.href}>
            <span className="mc-nav-label">&larr; Previous</span>
            {prev.title}
          </a>
        ) : (
          <span className="mc-nav-empty">.</span>
        )}
        <a href="/sitting-with-buyahka/buyahka-and-abrar">
          <span className="mc-nav-label">Table</span>
          of Contents
        </a>
        {next ? (
          <a href={next.href}>
            <span className="mc-nav-label">Next &rarr;</span>
            {next.title}
          </a>
        ) : (
          <span className="mc-nav-empty">.</span>
        )}
      </nav>

      {lightbox && (
        <div className="mc-lightbox" onClick={() => setLightbox(null)}>
          <div className="mc-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="mc-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">
              &times;
            </button>
            {lightbox.kind === "video" ? (
              <video src={lightbox.src} controls autoPlay />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={lightbox.src} alt={lightbox.caption} />
            )}
            <div className="mc-lightbox-caption">{lightbox.caption}</div>
          </div>
        </div>
      )}

      {soundtrack && (
        <SoundtrackPlayer
          name={soundtrack.name}
          tracks={soundtrack.tracks
            .map((t) => ({ url: mediaUrls[t.media.publicId], title: t.title }))
            .filter((t): t is { url: string; title: string } => Boolean(t.url))}
        />
      )}
    </div>
  );
}
