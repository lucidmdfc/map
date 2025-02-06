import { useState, useCallback } from "react";

export const useGradientHover = (
  breakpoints: number[],
  getLevelLabel: (value: number) => string
) => {
  const [hoverPosition, setHoverPosition] = useState(0);
  const [hoverLabel, setHoverLabel] = useState("");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const bar = e.currentTarget;
      const rect = bar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const value = breakpoints[Math.floor((percentage / 100) * (breakpoints.length - 1))];
      
      setHoverPosition(x);
      setHoverLabel(getLevelLabel(value));
    },
    [breakpoints, getLevelLabel]
  );

  return { handleMouseMove, hoverPosition, hoverLabel };
}; 