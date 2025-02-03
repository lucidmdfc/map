import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { LegendLabelProps } from "../types/legendTypes";

const StyledLabel = styled(Typography)<{
  legendvariant: "title" | "value" | "category";
}>(
  ({
    theme,
    legendvariant,
  }: {
    theme: Theme;
    legendvariant: "title" | "value" | "category";
  }) => ({
    ...(legendvariant === "title" && {
      fontWeight: 600,
      marginBottom: theme.spacing(2),
      fontSize: "1rem",
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing(1),
    }),
    ...(legendvariant === "value" && {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
      fontWeight: 500,
    }),
    ...(legendvariant === "category" && {
      fontSize: "0.875rem",
      color: theme.palette.text.primary,
      fontWeight: 500,
      flex: 1,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
  })
);

export const LegendLabel: React.FC<LegendLabelProps> = ({
  text,
  variant = "value",
}) => {
  const formattedText =
    variant === "title" ? text.charAt(0).toUpperCase() + text.slice(1) : text;

  return <StyledLabel legendvariant={variant}>{formattedText}</StyledLabel>;
};
