import { useCallback } from "react";
import { gradientConfigs } from "../constants/gradientConfigs";

export const useGradient = (title: string, legends: any) => {
  const getConfig = useCallback(() => {
    const key = title?.toLowerCase();
    return gradientConfigs[key] || gradientConfigs.density; // fallback to density if config not found
  }, [title]);

  const getLevelLabel = useCallback(
    (value: number) => {
      const config = getConfig();
      const level = config.levels.find((level) => value >= level.threshold);
      return level?.label || config.levels[config.levels.length - 1].label;
    },
    [getConfig]
  );

  const getBreakpoints = useCallback(() => {
    return getConfig().breakpoints;
  }, [getConfig]);

  return { getLevelLabel, getBreakpoints };
};
