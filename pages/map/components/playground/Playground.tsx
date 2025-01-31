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


import React from "react";
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
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

const PlaygroundContainer = styled(Paper)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(3),
  top: theme.spacing(3),
  padding: theme.spacing(3),
  width: 280,
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  zIndex: 1000,
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

interface PlaygroundProps {
  sortingMethods: Array<{
    field: string;
    Legends: Array<{
      label: string;
      color: string;
      NumericRanges: number[];
    }>;
  }>;
  currentSorting: string;
  onSortingChange: (value: string) => void;
  legendType: "category" | "gradient";
  onLegendTypeChange: (type: "category" | "gradient") => void;
}

const Playground: React.FC<PlaygroundProps> = ({
  sortingMethods,
  currentSorting,
  onSortingChange,
  legendType,
  onLegendTypeChange,
}) => {
  const handleSortingChange = (event: SelectChangeEvent) => {
    onSortingChange(event.target.value);
  };

  const handleLegendTypeChange = (
    _: React.MouseEvent<HTMLElement>,
    newType: "category" | "gradient"
  ) => {
    if (newType !== null) {
      onLegendTypeChange(newType);
    }
  };

  return (
    <PlaygroundContainer elevation={3}>
      <Typography variant="h6" gutterBottom>
        Map Controls
      </Typography>

      <ControlSection>
        <FormControl fullWidth size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={currentSorting}
            label="Sort By"
            onChange={handleSortingChange}
          >
            {sortingMethods.map((method) => (
              <MenuItem key={method.field} value={method.field}>
                {method.field}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ControlSection>

      <ControlSection>
        <Typography variant="body2" gutterBottom>
          Legend Type
        </Typography>
        <ToggleButtonGroup
          value={legendType}
          exclusive
          onChange={handleLegendTypeChange}
          fullWidth
          size="small"
        >
          <ToggleButton value="gradient">Gradient</ToggleButton>
          <ToggleButton value="category">Category</ToggleButton>
        </ToggleButtonGroup>
      </ControlSection>
    </PlaygroundContainer>
  );
};

export default Playground;
