import React from "react";
import { Box } from "@mui/material";
import { GradientBar } from "../styles/GradientStyles";
import { HoverLabel } from "./HoverLabel";
import { useGradientHover } from "../hooks/useGradientHover";

interface GradientScaleProps {
  gradient: string;
  breakpoints: number[];
  getLevelLabel: (value: number) => string;
}

export const GradientScale: React.FC<GradientScaleProps> = ({
  gradient,
  breakpoints,
  getLevelLabel,
}) => {
  const { handleMouseMove, hoverPosition, hoverLabel } = useGradientHover(
    breakpoints,
    getLevelLabel
  );

  return (
    <Box sx={{ 
      position: "relative",
      "&:hover .hover-label": {
        opacity: 1,
      },
    }}>
      <GradientBar gradient={gradient} onMouseMove={handleMouseMove} />
      <HoverLabel position={hoverPosition} label={hoverLabel} />
    </Box>
  );
}; 