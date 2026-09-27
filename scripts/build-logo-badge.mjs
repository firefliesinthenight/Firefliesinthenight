// Builds the header's round badge logo from Ahmad's supplied artwork
// (fireflies_in_the_night_logo_1200.png — a 1200px export that was itself
// enlarged from a smaller source, so it reads soft at full size). This trims
// the circle out of its square canvas and applies a moderate unsharp mask to
// crisp up the ring and lettering edges as much as the source allows.
//
// Note: sharpening can only push contrast at existing edges — it cannot
// recover detail the source file never had. If a fresh, higher-resolution
// export of the same design becomes available, re-point SOURCE at it and
// drop the .sharpen()/.modulate() calls (a clean source won't need them).
//
//   node scripts/build-logo-badge.mjs [source.png]

import sharp from "sharp";

const SOURCE = process.argv[2] || "C:/Users/Dell/Downloads/fireflies_in_the_night_logo_1200.png";
const OUT = "public/images/fireflies-logo-badge.png";
const OUT_SIZE = 720; // px; header shows this at ~64-136px, so this covers hi-dpi screens

const { width, height } = await sharp(SOURCE).metadata();
// The badge fills nearly its whole square canvas — trim only the ~1% margin.
const inset = Math.round(Math.min(width, height) * 0.012);

await sharp(SOURCE)
  .extract({ left: inset, top: inset, width: width - inset * 2, height: height - inset * 2 })
  .resize(OUT_SIZE, OUT_SIZE, { kernel: "lanczos3" })
  .sharpen({ sigma: 1.1, m1: 0.6, m2: 1.4, x1: 2, y2: 8, y3: 12 })
  .modulate({ saturation: 1.06, brightness: 1.02 })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`wrote ${OUT} (${OUT_SIZE}x${OUT_SIZE}) from ${SOURCE}`);
