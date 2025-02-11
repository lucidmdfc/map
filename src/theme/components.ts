import { Components } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";

export const components: Components = {
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: grey[50],
        borderRadius: 8,
        transition: "box-shadow 0.2s ease-in-out",
        "&.map-legend": {
          backgroundColor: alpha(grey[50], 0.95),
          backdropFilter: "blur(8px)",
          border: `1px solid ${alpha(grey[300], 0.2)}`,
        },
        "&.map-control": {
          backgroundColor: alpha(grey[50], 0.95),
          backdropFilter: "blur(8px)",
          border: `1px solid ${alpha(grey[300], 0.2)}`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    defaultProps: {
      elevation: 1,
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        borderRadius: 8,
        fontWeight: 500,
      },
      contained: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    defaultProps: {
      disableElevation: true,
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        overflow: "hidden",
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: alpha(grey[900], 0.9),
        fontSize: "0.75rem",
        padding: "8px 12px",
        borderRadius: 4,
        maxWidth: 300,
        "& .map-tooltip": {
          fontSize: "0.875rem",
          fontWeight: 500,
        },
      },
      arrow: {
        color: alpha(grey[900], 0.9),
      },
    },
    defaultProps: {
      arrow: true,
      placement: "top",
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: {
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        borderRadius: 8,
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        "&.map-control": {
          backgroundColor: alpha(grey[50], 0.95),
          backdropFilter: "blur(8px)",
        },
      },
    },
    defaultProps: {
      MenuProps: {
        PaperProps: {
          elevation: 2,
          sx: {
            maxHeight: 300,
            backgroundColor: alpha(grey[50], 0.95),
            backdropFilter: "blur(8px)",
          },
        },
      },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        minHeight: 40,
        padding: "8px 16px",
        "&:hover": {
          backgroundColor: alpha(grey[200], 0.6),
        },
      },
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        textTransform: "none",
        fontWeight: 500,
        "&.Mui-selected": {
          backgroundColor: alpha(grey[200], 0.8),
          "&:hover": {
            backgroundColor: alpha(grey[300], 0.8),
          },
        },
        "&.map-control": {
          backgroundColor: alpha(grey[50], 0.95),
          backdropFilter: "blur(8px)",
        },
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        "& .MuiInputLabel-root": {
          fontSize: "0.875rem",
        },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontSize: "0.875rem",
        "&.MuiOutlinedInput-root": {
          borderRadius: 8,
        },
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        margin: "16px 0",
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        padding: "8px 0",
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        borderRadius: 4,
        "&:hover": {
          backgroundColor: alpha(grey[200], 0.6),
        },
      },
    },
  },
};
