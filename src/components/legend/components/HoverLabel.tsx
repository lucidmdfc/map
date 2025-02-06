import React from "react";
import { Box } from "@mui/material";

interface HoverLabelProps {
  position: number;
  label: string;
}

export const HoverLabel: React.FC<HoverLabelProps> = ({ position, label }) => (
  <Box
    className="hover-label"
    sx={{
      position: "absolute",
      top: "-30px",
      left: position,
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
  >
    {label}
  </Box>
);
