// This is a presentational component that:
// - Renders the actual UI controls
// - Contains the visual elements (Select, ToggleButtons)
// - Handles direct user interactions
// - Styled with Material-UI components

// Key responsibilities:
// - Visual presentation of controls
// - User interface for sorting selection
// - Legend type toggle buttons
// - Styling and layout of the control panel

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

import { useContext } from "react";
import { ThemeContext } from "../../theme/themeContext";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

const FilterControlsContainer = styled(Paper)(({ theme }) => ({
  // position: "absolute",
  right: theme.spacing(3),
  top: theme.spacing(3),
  padding: theme.spacing(3),
  width: 280,
  backgroundColor: theme.palette.background.default,
  zIndex: 1000,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    right: "5%",
    padding: theme.spacing(2),
  },
}));

const ControlSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "&:last-child": {
    marginBottom: 0,
  },
}));

interface FilterControlsProps {
  sortingMethods: Array<{
    property: string;
    items: Array<{
      label: string;
      NumericRanges: number[];
    }>;
  }>;
  // currentSorting: string;
  onSortingChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTimeSegmentChange: (
    year: number | null,
    month: string | "",
    quarter: string | ""
  ) => void;
  categories: any;
  timeSegment: any;
  // setSortingBy: (value: string) => void;
  // legendType: "category" | "gradient";
  // onLegendTypeChange: (type: "category" | "gradient") => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  sortingMethods,
  onSortingChange,
  onCategoryChange,
  categories,
  timeSegment,
  onTimeSegmentChange,
  // setSortingBy,
  // legendType,
  // onLegendTypeChange,
}) => {
  const [sortingBy, setSortingBy] = useState(sortingMethods[0]?.property);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // const [selectedTimeSegment, setSelectedTimeSegment] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedQuarter, setSelectedQuarter] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const handleSortingChange = (event: SelectChangeEvent) => {
    onSortingChange(event.target.value);
    setSortingBy(event.target.value);
  };
  const handleCategoryChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setSelectedCategory(event.target.value);
    onCategoryChange(event.target.value);
  };

  // const handleTimeSegmentChange = (event: SelectChangeEvent) => {
  //   onTimeSegmentChange(event.target.value);
  //   onTimeSegmentChange(event.target.value);
  // };

  // Filter the segments based on selected year
  const years = timeSegment.map((ts: any) => ts.year);
  const filteredSegments = selectedYear
    ? timeSegment.find((ts: any) => ts.year === selectedYear)?.segments
    : [];

  // console.log(selectedQuarter);
  // console.log(filteredSegments);

  // Filter months based on selected quarter
  const filteredMonths = selectedQuarter
    ? selectedQuarter === "Q1"
      ? ["January", "February", "March"]
      : selectedQuarter === "Q2"
        ? ["April", "May", "June"]
        : selectedQuarter === "Q3"
          ? ["July", "August", "September"]
          : selectedQuarter === "Q4"
            ? ["October", "November", "December"]
            : []
    : [];

  // console.log(filteredMonths);
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within ThemeProviderComponent");
  }

  const { toggleTheme, mode } = themeContext;
  // console.log("timeSegment :", timeSegment);

  useEffect(() => {
    onTimeSegmentChange(
      selectedYear,
      selectedMonth || "",
      selectedQuarter || ""
    );
  }, [selectedYear, selectedMonth, selectedQuarter]);

  return (
    <FilterControlsContainer elevation={3}>
      <IconButton onClick={toggleTheme} sx={{ alignSelf: "flex-end", mb: 2 }}>
        {mode === "dark" ? <MdOutlineDarkMode /> : <MdDarkMode />}
      </IconButton>

      <Typography variant="h6" gutterBottom>
        Map Controls
      </Typography>

      <ControlSection>
        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortingBy}
            label="Sort By"
            onChange={handleSortingChange}
          >
            {sortingMethods.map((method) => (
              <MenuItem
                key={method?.property}
                sx={{
                  backgroundColor: (theme) => theme.palette.background.default,
                  color: (theme) => theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                    color: (theme) => theme.palette.text.primary,
                  },
                  "&.Mui-selected": {
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                    color: (theme) => theme.palette.text.primary,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                  },
                }}
                value={method?.property}
              >
                {method?.property}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ControlSection>
      <ControlSection>
        <FormControl fullWidth size="small">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            {/* Empty option to represent "no category" */}
            <MenuItem
              value=""
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                color: (theme) => theme.palette.text.primary,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.background.default,
                  color: (theme) => theme.palette.text.primary,
                },
              }}
            >
              <em>None</em> {/* You can customize this text */}
            </MenuItem>

            {categories.map((category: any) => (
              <MenuItem
                key={category._id}
                value={category._id}
                sx={{
                  backgroundColor: (theme) => theme.palette.background.default,
                  color: (theme) => theme.palette.text.primary,
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                    color: (theme) => theme.palette.text.primary,
                  },
                  "&.Mui-selected": {
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                    color: (theme) => theme.palette.text.primary,
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.background.default,
                  },
                }}
              >
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ControlSection>

      {/* <ControlSection>
        <FormControl fullWidth size="small">
          <InputLabel>Time Segment</InputLabel>
          <Select
            value={selectedTimeSegment}
            label="Time Segment"
            onChange={handleTimeSegmentChange}
          >
            {timeSegment?.map((segment: any, index: number) => {
              return (
                <MenuItem key={index} value={segment.year}>
                  {segment.year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </ControlSection> */}
      <FormControl fullWidth>
        <InputLabel id="year-label">Select Year</InputLabel>
        <Select
          labelId="year-label"
          value={selectedYear || ""}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          label="Select Year"
        >
          <MenuItem value="">Select Year</MenuItem>
          {years.map((year: number) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Quarter Dropdown */}
      {/*selectedYear && filteredSegments && (
        <FormControl fullWidth>
          <InputLabel id="quarter-label">Select Quarter</InputLabel>
          <Select
            labelId="quarter-label"
            value={selectedQuarter || ""}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            label="Select Quarter"
          >
            <MenuItem value="">Select Quarter</MenuItem>
            {filteredSegments
              .filter((seg: any) => seg.type === "Quarter")
              .map((quarter: any) => (
                <MenuItem key={quarter.label} value={quarter.label}>
                  {quarter.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )*/}

      {/* Month Dropdown (only if Quarter is selected and has months) */}
      {/*selectedQuarter && filteredMonths && (
        <FormControl fullWidth>
          <InputLabel id="month-label">Select Month</InputLabel>
          <Select
            labelId="month-label"
            value={selectedMonth || ""}
            onChange={(e) => setSelectedMonth(e.target.value)}
            label="Select Month"
          >
            <MenuItem value="">Select Month</MenuItem>
            {filteredMonths.map((month: any) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )*/}
    </FilterControlsContainer>
  );
};

export default FilterControls;
