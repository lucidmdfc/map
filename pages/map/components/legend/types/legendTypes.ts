export interface LegendData {
  field: string;
  Legends: Array<{
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
  startColor: string;
  endColor: string;
  minValue: number;
  maxValue: number;
}

export interface LegendContainerProps {
  children: React.ReactNode;
}

export interface LegendLabelProps {
  text: string;
  variant?: "title" | "value" | "category";
}

export type LegendType = "category" | "gradient"; 