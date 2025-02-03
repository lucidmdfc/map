export interface GradientLevel {
  threshold: number;
  label: string;
}

export interface GradientConfig {
  breakpoints: number[];
  levels: GradientLevel[];
}

export const gradientConfigs: Record<string, GradientConfig> = {
  capacity: {
    breakpoints: [0, 3000, 5000, 10000],
    levels: [
      { threshold: 5000, label: "High Capacity" },
      { threshold: 3000, label: "Medium Capacity" },
      { threshold: 0, label: "Low Capacity" },
    ],
  },
  density: {
    breakpoints: [0, 20, 50, 100, 1000],
    levels: [
      { threshold: 100, label: "Danger Density" },
      { threshold: 50, label: "High Density" },
      { threshold: 20, label: "Medium Density" },
      { threshold: 0, label: "Low Density" },
    ],
  },
};
