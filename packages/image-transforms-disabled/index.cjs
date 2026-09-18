// Original project code. No Sharp or libvips code is included.
// The game serves authored PNG assets directly and needs no image transformer.
throw new Error(
  "Native image transformations are disabled in Teachback Lab. " +
    "Use pre-sized static assets and unoptimized images. " +
    "See docs/DEPENDENCIES.md before introducing an image-processing feature.",
);
