// A single episode's video slot, placed on the essay/piece page it belongs
// to (episodes are numbered entries in the "Through the Storms" series tied
// to a specific piece — e.g. Episode 03 is Movement Was My Oxygen — not a
// generic bundle). Pass `youtubeId` once the episode is posted to YouTube,
// or `videoUrl` for a directly-hosted file; leave both unset while the video
// isn't ready yet.
export default function EpisodeVideo({
  episodeLabel,
  title,
  videoUrl,
  youtubeId,
}: {
  episodeLabel: string;
  title: string;
  videoUrl: string | null;
  youtubeId?: string;
}) {
  const hasVideo = Boolean(youtubeId || videoUrl);

  return (
    <div className="mt-10 overflow-hidden rounded-xl border border-night-600/50 bg-night-800/40">
      <div className="aspect-video bg-night-950/60">
        {youtubeId ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : videoUrl ? (
          <video src={videoUrl} controls className="h-full w-full" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              className="h-10 w-10 text-cream-300/40"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9.25" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 8.5v7l6-3.5-6-3.5Z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
          {episodeLabel}
        </p>
        <p className="mt-1 font-display text-lg text-cream-100">{title}</p>
        {!hasVideo && (
          <p className="mt-1 font-body text-sm text-cream-300">Video coming soon.</p>
        )}
      </div>
    </div>
  );
}
