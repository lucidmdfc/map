import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { createRoot } from "react-dom/client";
import { CategoryLegend } from "./components/CategoryLegend";
import { GradientLegend } from "./components/GradientLegend";
import { LegendData, LegendType } from "./types/legendTypes";

interface LegendProps {
  sortingData: LegendData;
  legendType: LegendType;
}

const Legend = ({ sortingData, legendType }: LegendProps) => {
  const map = useMap();

  const renderLegend = () => {
    switch (legendType) {
      case "category":
        const categories = sortingData.Legends.map((legend) => ({
          label: legend.label || `${legend.NumericRanges[0]} - ${legend.NumericRanges[1]}`,
          color: legend.color,
        }));
        return <CategoryLegend title={sortingData.field} categories={categories} />;

      case "gradient":
      default:
        return (
          <GradientLegend
            title={sortingData.field}
            startColor={sortingData.Legends[0].color}
            endColor={sortingData.Legends[sortingData.Legends.length - 1].color}
            minValue={sortingData.Legends[0].NumericRanges[0]}
            maxValue={sortingData.Legends[sortingData.Legends.length - 1].NumericRanges[1]}
          />
        );
    }
  };

  useEffect(() => {
    const control = new L.Control({ position: "bottomright" });
    const container = L.DomUtil.create("div", "legend-control");
    const root = createRoot(container);

    control.onAdd = () => {
      root.render(renderLegend());
      return container;
    };

    control.addTo(map);

    return () => {
      root.unmount();
      control.remove();
    };
  }, [map, sortingData, legendType]);

  return null;
};

export default Legend;
