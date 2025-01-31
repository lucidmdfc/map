import React from "react";
import { Tooltip } from "@mui/material";
import {
  LegendContainer,
  LegendTitle,
  LegendItem,
  ColorBox,
  CategoryLabel,
} from "./LegendStyles";

interface CategoryLegendProps {
  title: string;
  categories: {
    label: string;
    color: string;
  }[];
}

const CategoryLegend: React.FC<CategoryLegendProps> = ({
  title,
  categories,
}) => {
  return (
    <LegendContainer elevation={3}>
      <LegendTitle variant="h6">{title}</LegendTitle>
      {categories.map((category, index) => (
        <Tooltip key={index} title={category.label} placement="left" arrow>
          <LegendItem>
            <ColorBox bgcolor={category.color} />
            <CategoryLabel>{category.label}</CategoryLabel>
          </LegendItem>
        </Tooltip>
      ))}
    </LegendContainer>
  );
};

export default CategoryLegend;
