import dynamic from "next/dynamic";
import { Box } from "@mui/material";

// Dynamically import the MapContainer component
const MapContainer = dynamic(() => import("../components/map/MapContainer"), {
  ssr: false,
});

export default function Home() {
  return (
    // <Box sx={{ display: "flex", height: "100%" }}>
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        paddingTop: "80%",
        maxWidth: "1979px",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <MapContainer />
      </Box>
      {/* </Box> */}
      {/* <MapControls /> */}
    </Box>
  );
}
