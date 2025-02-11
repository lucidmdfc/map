import { Legend } from "../legend";
// import sortingMethods from "../../dataMocks/sortingMethods.json";
// import { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { FilterControls } from "../Filters";

import { useContext } from "react";
import { ThemeContext } from "../../theme/themeContext";

const LegendWithFilters = ({
  onSortingByChange,
  sortingByMethod,
  // setLegendType,
  legendType,
  sortingByMethods,
}: any) => {
  // console.log(sortingByMethod);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <FilterControls
        onSortingChange={onSortingByChange}
        sortingMethods={sortingByMethods}
      />
      <Legend sortingData={sortingByMethod} legendType={legendType} />
    </Box>
  );
};
export default LegendWithFilters;
