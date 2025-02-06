import React from "react";
import { Tooltip } from "@mui/material";
import { LegendContainer } from "../common/LegendContainer";
import { LegendLabel } from "../common/LegendLabel";
import { CategoryItem, ColorBox } from "../styles/CategoryStyles";
import { CategoryLegendProps } from "../types/legendTypes";
import { useCategory } from "../hooks/useCategory";

export const CategoryLegend: React.FC<CategoryLegendProps> = ({
  title,
  categories,
}) => {
  const { formatCategoryLabel } = useCategory();

  return (
    <LegendContainer>
      <LegendLabel text={title} variant="title" />
      {categories.map((category, index) => (
        <Tooltip key={index} title={category.label} placement="left" arrow>
          <CategoryItem>
            <ColorBox bgcolor={category.color} />
            <LegendLabel
              text={formatCategoryLabel(category.label)}
              variant="category"
            />
          </CategoryItem>
        </Tooltip>
      ))}
    </LegendContainer>
  );
};
