export default {
  multipass: true,
  plugins: [
    // preset-default не трогает viewBox — он остаётся для масштабирования
    "preset-default",
    // width/height задаём в HTML — в самом SVG они только мешают
    "removeDimensions",
  ],
};
