import React from "react";
import { Box } from "@mui/material";
import { LegendContainer } from "../common/LegendContainer";
import { LegendLabel } from "../common/LegendLabel";
import { GradientBar, RangeLabels } from "../styles/GradientStyles";
import { GradientLegendProps } from "../types/legendTypes";
import { useGradient } from "../hooks/useGradient";
import { HoverLabel } from "./HoverLabel";
import { GradientScale } from "./GradientScale";

export const GradientLegend: React.FC<GradientLegendProps> = ({
  title,
  colorRange,
  endColor,
  minValue,
  maxValue,
  legends,
}) => {
  const { getLevelLabel, getBreakpoints } = useGradient(title, legends);
  const gradient = `linear-gradient(to right, ${colorRange.colors
    .map((color, i) => `${color} ${colorRange.stops[i] * 100}%`)
    .join(", ")})`;
  const breakpoints = getBreakpoints();

  return (
    <LegendContainer>
      <LegendLabel text={title} variant="title" />
      <GradientScale
        gradient={gradient}
        breakpoints={breakpoints}
        getLevelLabel={getLevelLabel}
      />
      <RangeLabels>
        {breakpoints.map((value, index) => (
          <Box key={index}>
            <LegendLabel
              text={new Intl.NumberFormat().format(value)}
              variant="value"
            />
          </Box>
        ))}
      </RangeLabels>
    </LegendContainer>
  );
};
