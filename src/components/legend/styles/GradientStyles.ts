import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/material";

export const GradientBar = styled(Box)<{ gradient: string }>(
  ({ theme, gradient }) => ({
    height: 24,
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    background: gradient,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
    boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.common.white, 0.1)}`,
  })
);

export const RangeLabels = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
})); 