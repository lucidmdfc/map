import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SortingByControlProps {
  sortingMethods: any;
  onSortingByChange: (value: string) => void;
}

export default function SortingByControl({
  sortingMethods,
  onSortingByChange,
}: SortingByControlProps) {
  const [sortingBy, setSortingBy] = useState(sortingMethods[0].field);
  console.log(sortingMethods);
  const handleChange = (event: SelectChangeEvent) => {
    setSortingBy(event.target.value as string);
    onSortingByChange(event.target.value as string);
  };

  return (
    <Box
      sx={{
        width: "fit-content",
        position: "absolute",
        top: 10,
        left: 10,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">SortingBy</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortingBy}
          label="SortingBy"
          onChange={handleChange}
          sx={{ fontSize: { xs: "12px", md: "16px" }, padding: { xs: "0px" } }}
        >
          {sortingMethods.map((sortingBy: any) => (
            <MenuItem
              sx={{
                fontSize: { xs: "12px", md: "16px" },
                padding: "6px",
              }}
              value={sortingBy.field}
            >
              {sortingBy.field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
