// Responsive 16:9 YouTube embed. Uses the privacy-enhanced domain (no
// tracking cookies until the viewer presses play) and lazy-loads, same
// treatment as the video blocks elsewhere on the site.
export default function YouTubeEmbed({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  return (
    <div className="aspect-video overflow-hidden rounded-xl border border-night-600/50 bg-night-950">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
