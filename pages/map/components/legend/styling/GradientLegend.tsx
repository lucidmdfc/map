import React from "react";
import { Box } from "@mui/material";
import {
  LegendContainer,
  LegendTitle,
  GradientBar,
  RangeLabels,
} from "./LegendStyles";

interface GradientLegendProps {
  title: string;
  startColor: string;
  endColor: string;
  minValue: number;
  maxValue: number;
}

const GradientLegend: React.FC<GradientLegendProps> = ({
  title,
  startColor,
  endColor,
  minValue,
  maxValue,
}) => {
  const gradient = `linear-gradient(to right, ${startColor}, ${endColor})`;
  const formatValue = (value: number) => new Intl.NumberFormat().format(value);

  const getLevelLabel = (value: number) => {
    if (title.toLowerCase() === "capacity") {
      if (value >= 5000 && value <= 9999) return "High capacity";
      if (value >= 3000 && value <= 4999) return "Medium capacity";
      if (value >= 0 && value <= 2999) return "Low capacity";
      return ""; // Handle any values outside defined ranges
    } else {
      // Density levels - match exact ranges from sortingMethods.json
      if (value >= 100 && value <= 1000) return "Danger Density";
      if (value >= 50 && value < 100) return "High Density";
      if (value >= 20 && value < 50) return "Medium Density";
      if (value >= 0 && value < 20) return "Low Density";
      return ""; // Handle any out of range values
    }
  };

  const breakpoints =
    title.toLowerCase() === "capacity"
      ? [0, 3000, 5000, 10000] // Rounded capacity ranges
      : [0, 20, 50, 100, 1000]; // Clean density ranges

  return (
    <LegendContainer elevation={3}>
      <LegendTitle variant="h6">{title}</LegendTitle>
      <Box
        sx={{
          position: "relative",
          "&:hover .hover-label": {
            opacity: 1,
          },
        }}
      >
        <GradientBar
          gradient={gradient}
          onMouseMove={(e) => {
            const bar = e.currentTarget;
            const rect = bar.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;

            const getValue = (percentage: number) => {
              if (title.toLowerCase() === "capacity") {
                if (percentage <= 25) return 0;
                if (percentage <= 50) return 3000;
                if (percentage <= 75) return 5000;
                return 9999;
              } else {
                // Density ranges
                if (percentage <= 20) return 0;
                if (percentage <= 40) return 20;
                if (percentage <= 60) return 50;
                if (percentage <= 80) return 100;
                return 1000;
              }
            };

            const value = getValue(percentage);
            const label = getLevelLabel(value);

            const hoverLabel = bar.nextElementSibling as HTMLElement;
            if (hoverLabel) {
              hoverLabel.style.left = `${x}px`;
              hoverLabel.textContent = label;
            }
          }}
        />
        <Box
          className="hover-label"
          sx={{
            position: "absolute",
            top: "-30px",
            transform: "translateX(-50%)",
            backgroundColor: "background.paper",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            opacity: 0,
            transition: "opacity 0.2s",
            pointerEvents: "none",
            boxShadow: 1,
            zIndex: 1,
          }}
        />
      </Box>
      <RangeLabels>
        {breakpoints.map((value, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-4px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "1px",
                height: "4px",
                backgroundColor: "text.secondary",
              },
            }}
          >
            <span>{formatValue(value)}</span>
          </Box>
        ))}
      </RangeLabels>
    </LegendContainer>
  );
};

export default GradientLegend;
