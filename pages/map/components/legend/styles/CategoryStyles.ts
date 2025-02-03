import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/material";

export const CategoryItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: alpha(theme.palette.action.hover, 0.1),
  },
  "&:last-child": {
    marginBottom: 0,
  },
}));

export const ColorBox = styled(Box)<{ bgcolor: string }>(
  ({ theme, bgcolor }) => ({
    width: 24,
    height: 24,
    marginRight: theme.spacing(1.5),
    backgroundColor: bgcolor,
    border: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.common.white, 0.1)}`,
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  })
); 