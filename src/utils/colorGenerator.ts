/**
 * Color generation utility for the map visualization system.
 * Provides functions to generate and interpolate colors for both gradient and category-based visualizations.
 */

import { interpolateRgb, interpolateHsl } from "d3-interpolate";
import { Theme } from "@mui/material/styles";

export interface ColorRange {
  colors: string[]; // Array of color stops
  stops: number[]; // Array of positions (0-1) for each color
}

export const getThemeColorRanges = (
  theme: Theme
): Record<string, ColorRange> => ({
  blue: {
    colors: [
      theme.palette.primary.light,
      theme.palette.primary.light,
      theme.palette.primary.main,
      theme.palette.primary.dark,
    ],
    stops: [0, 0.2, 0.6, 1],
  },
  orange: {
    colors: [
      theme.palette.secondary.light,
      theme.palette.secondary.light,
      theme.palette.secondary.main,
      theme.palette.secondary.dark,
    ],
    stops: [0, 0.2, 0.6, 1],
  },
});

// Fallback color ranges for when theme is not available
export const defaultColorRanges: Record<string, ColorRange> = {
  blue: {
    colors: ["#BAE2E8", "#BAE2E8", "#33A9BB", "#02859A"],
    stops: [0, 0.2, 0.6, 1],
  },
  orange: {
    colors: ["#E8CAB2", "#E8CAB2", "#BB8A33", "#9A6F02"],
    stops: [0, 0.2, 0.6, 1],
  },
};

/**
 * Interpolates between multiple colors using HSL color space.
 * @param colors Array of colors to interpolate between
 * @param stops Array of positions for each color
 * @param t Value between 0-1 indicating position in the gradient
 */
export const interpolateMultiColor = (
  colors: string[],
  stops: number[],
  t: number
): string => {
  // Ensure t is properly bounded
  const boundedT = Math.max(0, Math.min(1, t));

  // Find the segment where t falls
  const index = stops.findIndex(
    (stop, i) => boundedT >= stop && boundedT <= stops[i + 1]
  );

  // Handle edge cases
  if (index === -1) {
    if (boundedT <= stops[0]) return colors[0];
    return colors[colors.length - 1];
  }

  // Calculate the relative position within the segment
  const segmentT =
    (boundedT - stops[index]) / (stops[index + 1] - stops[index]);
  return interpolateHsl(colors[index], colors[index + 1])(segmentT);
};

/**
 * Generates an array of colors for gradient visualization.
 * @param steps Number of colors to generate
 * @param colorRange Optional custom color range
 */
export const generateGradientColors = (
  steps: number,
  colorRange?: ColorRange
): string[] => {
  const range = colorRange || defaultColorRanges.blue;
  return Array.from({ length: steps }, (_, i) => {
    const t = steps === 1 ? 0.5 : i / (steps - 1);
    return interpolateMultiColor(range.colors, range.stops, t);
  });
};

/**
 * Generates an array of colors for category visualization.
 * @param count Number of categories
 * @param colorRange Optional custom color range
 */
export const generateCategoryColors = (
  count: number,
  colorRange?: ColorRange
): string[] => {
  return generateGradientColors(count, colorRange || defaultColorRanges.orange);
};

/**
 * Gets a color for a specific value in a range.
 * @param value The value to get a color for
 * @param min Minimum value in the range
 * @param max Maximum value in the range
 * @param colorRange Optional custom color range
 */
export const getColorForValue = (
  value: number,
  min: number,
  max: number,
  colorRange?: ColorRange
): string => {
  const range = colorRange || defaultColorRanges.blue;

  // Handle edge cases
  if (value <= min) return range.colors[0];
  if (value >= max) return range.colors[range.colors.length - 1];

  // Use a logarithmic scale for better distribution of colors
  const normalizedValue = Math.log(value - min + 1) / Math.log(max - min + 1);
  return interpolateMultiColor(range.colors, range.stops, normalizedValue);
};

/**
 * Gets a color for a specific category based on value ranges.
 * @param value The value to get a color for
 * @param ranges Array of [min, max] ranges for each category
 * @param colors Array of colors corresponding to ranges
 */
export const getColorForCategory = (
  value: number,
  ranges: number[][],
  colors: string[]
): string => {
  const index = ranges.findIndex(([min, max]) => value >= min && value <= max);
  return index >= 0 ? colors[index] : colors[colors.length - 1];
};
