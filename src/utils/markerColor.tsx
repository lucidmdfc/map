/**
 * Marker Color System
 * Provides color generation for map markers based on their values and legend type.
 */

import {
  getColorForCategory,
  generateCategoryColors,
  getColorForValue,
  getThemeColorRanges,
} from "./colorGenerator";
import { LegendData } from "../components/legend/types/legendTypes";
import { useTheme, Theme } from "@mui/material/styles";

/**
 * Hook that provides color generation for markers.
 * Returns a function that generates colors based on value and sorting data.
 * Uses the same color system as legends to ensure visual consistency.
 */
export const useMarkerColor = () => {
  const theme = useTheme();
  const colorRanges = getThemeColorRanges(theme);

  return (
    value: number,
    sortingData: LegendData & { type: "category" | "gradient" }
  ) => {
    if (sortingData.type === "category") {
      // For category-based visualization (e.g., capacity levels)
      const ranges = sortingData.items.map((legend) => legend.NumericRanges);
      const colors = generateCategoryColors(ranges.length, colorRanges.orange);
      return getColorForCategory(value, ranges, colors);
    } else {
      // For gradient-based visualization (e.g., density)
      const allRanges = sortingData.items.map((legend) => legend.NumericRanges);
      const min = Math.min(...allRanges.map((range) => range[0]));
      const max = Math.max(...allRanges.map((range) => range[1]));
      return getColorForValue(value, min, max, colorRanges.blue);
    }
  };
};

export const getMarkerColor = (
  value: number,
  sortingData: LegendData & { type: "category" | "gradient" },
  theme: Theme
) => {
  const colorRanges = getThemeColorRanges(theme);

  if (sortingData.type === "category") {
    const ranges = sortingData.items.map((legend) => legend.NumericRanges);
    const colors = generateCategoryColors(ranges.length, colorRanges.orange);
    return getColorForCategory(value, ranges, colors);
  } else {
    const allRanges = sortingData.items.map((legend) => legend.NumericRanges);
    const min = Math.min(...allRanges.map((range) => range[0]));
    const max = Math.max(...allRanges.map((range) => range[1]));
    return getColorForValue(value, min, max, colorRanges.blue);
  }
};
