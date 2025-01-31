import { styled, alpha } from "@mui/material/styles";
import { Box, Typography, Paper } from "@mui/material";

export const LegendContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.95),
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
  minWidth: 200,
  maxWidth: 300,
  backdropFilter: "blur(8px)",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: 150,
    padding: theme.spacing(1.5),
  },
}));

export const LegendTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  fontSize: "1rem",
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(1),
}));

export const LegendItem = styled(Box)(({ theme }) => ({
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
  "& > span": {
    fontWeight: 500,
  },
}));

export const CategoryLabel = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.primary,
  fontWeight: 500,
  flex: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));
