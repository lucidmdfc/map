import { ColorRange } from "@/src/utils/colorGenerator";

export interface LegendData {
  field: string;
  items: Array<{
    color: string;
    NumericRanges: number[];
    label?: string;
  }>;
}

export interface BaseLegendProps {
  title: string;
}

export interface CategoryLegendProps extends BaseLegendProps {
  categories: Array<{
    label: string;
    color: string;
  }>;
}

export interface GradientLegendProps extends BaseLegendProps {
  colorRange: ColorRange;
  endColor: string;
  minValue: number;
  maxValue: number;
  legends: any;
}

export interface LegendContainerProps {
  children: React.ReactNode;
}

export interface LegendLabelProps {
  text: string;
  variant?: "title" | "value" | "category";
}

export type LegendType = "category" | "gradient";
