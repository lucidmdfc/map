export const getMarkerColor = (value: number, sortingData: any) => {
  for (let legend of sortingData.Legends) {
    if (value >= legend.NumericRanges[0] && value <= legend.NumericRanges[1]) {
      return legend.color; // Return the color for the range
    }
  }
  return "gray"; // Default color if no match is found
};
