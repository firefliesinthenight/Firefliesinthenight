// Crisps up the homepage hero photo (public/images/fireflies-bg1.png) —
// specifically the trees and mountains in the background, which render soft
// and hazy straight out of the source file. A contrast lift + saturation
// bump + tuned unsharp mask brings out the tree silhouettes, mountain
// ridgelines, and cloud texture without introducing halos on the already-
// sharp foreground desk objects.
//
// Only for a SOFT source photo. The current hero (Ahmad's new-fireflies.png,
// 28 Sep) was supplied already crisp, so it is used as-is — do NOT run this
// on it, that would sharpen it twice.
//   node scripts/sharpen-hero.mjs [source.png] [out.png]

import sharp from "sharp";

const SRC = process.argv[2] || "public/images/fireflies-bg1.png";
const OUT = process.argv[3] || "public/images/fireflies-bg1.png";

await sharp(SRC)
  .linear(1.07, -6) // gentle contrast lift, cuts through the haze a bit
  .modulate({ saturation: 1.07 })
  .sharpen({ sigma: 1.3, m1: 0.7, m2: 2.4, x1: 2, y2: 10, y3: 18 })
  .toFile(OUT + ".tmp");

// sharp can't read and write the same path in one pipeline; swap in the result.
const { renameSync } = await import("node:fs");
renameSync(OUT + ".tmp", OUT);

console.log(`sharpened ${SRC} -> ${OUT}`);
