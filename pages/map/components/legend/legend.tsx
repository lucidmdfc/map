import { useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import CategoryLegend from "./styling/CategoryLegend";
import GradientLegend from "./styling/GradientLegend";
import { createRoot } from "react-dom/client";

interface LegendProps {
  sortingData: {
    field: string;
    Legends: Array<{
      color: string;
      NumericRanges: number[];
      label?: string;
    }>;
  };
  legendType: "category" | "gradient";
}

const LegendControl = ({ sortingData, legendType }: LegendProps) => {
  const map = useMap();

  useEffect(() => {
    const control = new L.Control({ position: "bottomright" });
    const container = L.DomUtil.create("div", "legend-control");
    const root = createRoot(container);

    control.onAdd = () => {
      if (legendType === "category") {
        const categories = sortingData.Legends.map((legend) => ({
          label:
            legend.label ||
            `${legend.NumericRanges[0]} - ${legend.NumericRanges[1]}`,
          color: legend.color,
        }));

        root.render(
          <CategoryLegend title={sortingData.field} categories={categories} />
        );
      } else {
        root.render(
          <GradientLegend
            title={sortingData.field}
            startColor={sortingData.Legends[0].color}
            endColor={sortingData.Legends[sortingData.Legends.length - 1].color}
            minValue={sortingData.Legends[0].NumericRanges[0]}
            maxValue={
              sortingData.Legends[sortingData.Legends.length - 1]
                .NumericRanges[1]
            }
          />
        );
      }
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

export default LegendControl;
