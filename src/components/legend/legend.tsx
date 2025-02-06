import { CategoryLegend } from "./components/CategoryLegend";
import { GradientLegend } from "./components/GradientLegend";
import { LegendData, LegendType } from "./types/legendTypes";

interface LegendProps {
  sortingData: LegendData;
  legendType: LegendType;
}

const Legend = ({ sortingData, legendType }: LegendProps) => {
  const renderLegend = () => {
    switch (legendType) {
      case "category":
        const categories = sortingData.Legends.map((legend) => ({
          label:
            legend.label ||
            `${legend.NumericRanges[0]} - ${legend.NumericRanges[1]}`,
          color: legend.color,
        }));
        return (
          <CategoryLegend title={sortingData.field} categories={categories} />
        );

      case "gradient":
      default:
        return (
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
  };

  return <div className="legend-container">{renderLegend()}</div>;
};

export default Legend;
