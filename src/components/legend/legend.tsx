import { useTheme } from "@mui/material/styles";
import { CategoryLegend } from "./components/CategoryLegend";
import { GradientLegend } from "./components/GradientLegend";
import { LegendData, LegendType } from "./types/legendTypes";
import {
  generateCategoryColors,
  getThemeColorRanges,
} from "@/src/utils/colorGenerator";

interface LegendProps {
  sortingData: LegendData;
  legendType: LegendType;
}

const Legend = ({ sortingData, legendType }: LegendProps) => {
  // console.log(sortingData);
  const theme = useTheme();
  // console.log(theme.palette);
  const colorRanges = getThemeColorRanges(theme);

  const renderLegend = () => {
    switch (legendType) {
      case "category":
        const colors = generateCategoryColors(
          sortingData.items.length,
          colorRanges.orange
        );
        const categories = sortingData?.items?.map((legend, index) => ({
          label:
            legend.label ||
            `${legend.NumericRanges[0]} - ${legend.NumericRanges[1]}`,
          color: colors[index],
        }));
        return (
          <CategoryLegend title={sortingData?.field} categories={categories} />
        );

      case "gradient":
      default:
        const legendsWithLabels = sortingData.items.map((legend) => ({
          label:
            legend.label ||
            `${legend.NumericRanges[0]} - ${legend.NumericRanges[1]}`,
          NumericRanges: legend.NumericRanges,
        }));
        return (
          <GradientLegend
            title={sortingData.field}
            colorRange={colorRanges.blue}
            endColor={sortingData.items[sortingData.items.length - 1].color}
            minValue={sortingData.items[0].NumericRanges[0]}
            maxValue={
              sortingData.items[sortingData.items.length - 1].NumericRanges[1]
            }
            legends={legendsWithLabels}
          />
        );
    }
  };

  return <div className="legend-container">{renderLegend()}</div>;
};

export default Legend;
