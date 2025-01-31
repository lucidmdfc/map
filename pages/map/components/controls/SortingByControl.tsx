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
import Playground from "../playground/Playground";

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
  onLegendTypeChange: (type: "category" | "gradient") => void;
}

export default function SortingByControl({
  sortingMethods,
  onSortingByChange,
  onLegendTypeChange,
}: SortingByControlProps) {
  const [sortingBy, setSortingBy] = useState(sortingMethods[0].field);
  const [legendType, setLegendType] = useState<"category" | "gradient">(
    "gradient"
  );

  const handleSortingChange = (value: string) => {
    setSortingBy(value);
    onSortingByChange(value);
  };

  const handleLegendTypeChange = (type: "category" | "gradient") => {
    setLegendType(type);
    onLegendTypeChange(type);
  };

  return (
    <Playground
      sortingMethods={sortingMethods}
      currentSorting={sortingBy}
      onSortingChange={handleSortingChange}
      legendType={legendType}
      onLegendTypeChange={handleLegendTypeChange}
    />
  );
}
