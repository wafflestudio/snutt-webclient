// From colorWithContrastingBlackOrWhiteColorOn method of https://github.com/ViccAlexander/Chameleon
// https://github.com/ViccAlexander/Chameleon/blob/dde307d62cff1c0f9d65cf40a334c063db032c8f/Pod/Classes/Objective-C/UIColor%2BChameleon.m#L423
export default function contrast({ r, g, b }) {
  const red = r / 255 * 0.2126;
  const green = g / 255 * 0.7152;
  const blue = b / 255 * 0.0722;
  const luminance = red + green + blue;

  // Light: 'hsb(0, 0, 15)' -> rgb(38, 38, 38)
  // Dark: 'hsb(192, 2, 95)' ->rgb(237, 241, 242)

  if (luminance > 0.6) { return 'rgb(38, 38, 38)'; }
  return 'rgb(237, 241, 242)';
}
