import { getColorWithContrastingBlackOrWhite } from 'utils/color';

describe('Utils/ ContrastingBlackOrWhite', () => {
  it('should return light color given dark color', () => {
    const lightColor = {
      r: 244,
      g: 244,
      b: 244,
    };

    const contrastColor = getColorWithContrastingBlackOrWhite({
      r: 10,
      g: 10,
      b: 10,
      lightColor,
    });
    expect(contrastColor).toEqual(lightColor);
  });

  it('should return dark color given light color', () => {
    const darkColor = {
      r: 38,
      g: 38,
      b: 38,
    };
    const contrastColor = getColorWithContrastingBlackOrWhite({
      r: 255,
      g: 255,
      b: 255,
      darkColor,
    });
    expect(contrastColor).toEqual(darkColor);
  });
});
