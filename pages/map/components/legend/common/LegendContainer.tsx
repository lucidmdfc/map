import { Paper } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { LegendContainerProps } from "../types/legendTypes";

const StyledContainer = styled(Paper)(({ theme }) => ({
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

export const LegendContainer: React.FC<LegendContainerProps> = ({ children }) => {
  return <StyledContainer elevation={3}>{children}</StyledContainer>;
}; 