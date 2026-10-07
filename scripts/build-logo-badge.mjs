// Builds the header's round badge logo from Ahmad's approved artwork
// (approved-firefliers-logo.png, Oct 2026 — a vine-wreath badge, replacing
// the Sept round-emblem badge). Auto-detects the visible content inside the
// square canvas and trims the transparent margin around it.
//
// This source is already sharp, so no sharpening/saturation pass is applied
// — unlike the previous badge script, which had to compensate for a soft
// source. If a future logo comes in visibly soft, reintroduce a
// .sharpen()/.modulate() pass (see git history of this file for the recipe).
//
//   node scripts/build-logo-badge.mjs [source.png]

import sharp from "sharp";

const SOURCE = process.argv[2] || "C:/Users/Dell/Downloads/approved-firefliers-logo.png";
const OUT = "public/images/fireflies-logo-badge.png";
const OUT_SIZE = 720; // px; header shows this at ~64-136px, so this covers hi-dpi screens
const PAD = 6; // px of breathing room kept around the detected content, pre-resize

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const alphaAt = (x, y) => data[(y * W + x) * 4 + 3];

let minX = W, maxX = -1, minY = H, maxY = -1;
for (let y = 0; y < H; y += 2) {
  for (let x = 0; x < W; x += 2) {
    if (alphaAt(x, y) > 20) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
const left = Math.max(0, minX - PAD);
const top = Math.max(0, minY - PAD);
const box = {
  left,
  top,
  width: Math.min(W, maxX + PAD) - left,
  height: Math.min(H, maxY + PAD) - top,
};
console.log("content box", box, "of", W, H);

await sharp(SOURCE)
  .extract(box)
  .resize(OUT_SIZE, OUT_SIZE, { kernel: "lanczos3" })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`wrote ${OUT} (${OUT_SIZE}x${OUT_SIZE}) from ${SOURCE}`);
