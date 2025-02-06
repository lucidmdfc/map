// This is a middleware/controller component that:
// - Manages the local state for sorting method and legend type
// - Acts as a bridge between MapContainer and Playground
// - Handles state changes and passes them up to the parent
// - Doesn't have its own UI, delegates rendering to Playground

// Key responsibilities:
// - State management for sortingBy and legendType
// - Passes sorting methods data down to Playground
// - Handles callbacks for sorting and legend type changes

import { useState } from "react";
import { FilterControls } from "../Filters";

interface SortingByControlProps {
  sortingMethods: Array<{
    field: string;
    Legends: Array<{
      label: string;
      color: string;
      NumericRanges: number[];
    }>;
  }>;
  onSortingByChange: (value: string) => void;
  // onLegendTypeChange: (type: "category" | "gradient") => void;
}

export default function SortingByControl({
  sortingMethods,
  onSortingByChange,
}: // onLegendTypeChange,
SortingByControlProps) {
  return (
    <FilterControls
      sortingMethods={sortingMethods}
      onSortingChange={onSortingByChange}
      // currentSorting={sortingBy}
      // setSortingBy={setSortingBy}
      // legendType={legendType}
      // onLegendTypeChange={handleLegendTypeChange}
    />
  );
}
