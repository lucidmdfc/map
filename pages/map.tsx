import { useState } from "react";
import { MapContainer } from "react-leaflet";
import SortingByControl from "./map/components/controls/SortingByControl";
import LegendControl from "./map/components/legend/legend";
import { Container } from "@mui/material";
import sortingMethods from "./map/data/sortingMethods.json";

export default function Map() {
  const [currentSortingMethod, setCurrentSortingMethod] = useState(
    sortingMethods[0]
  );
  const [legendType, setLegendType] = useState<"category" | "gradient">(
    "gradient"
  );

  const handleSortingChange = (field: string) => {
    const newMethod = sortingMethods.find((method) => method.field === field);
    if (newMethod) {
      setCurrentSortingMethod(newMethod);
    }
  };

  const handleLegendTypeChange = (type: "category" | "gradient") => {
    setLegendType(type);
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <MapContainer>
        <SortingByControl
          sortingMethods={sortingMethods}
          onSortingByChange={handleSortingChange}
          onLegendTypeChange={setLegendType}
        />
        <LegendControl
          sortingData={currentSortingMethod}
          legendType={legendType}
        />
        <iframe
          src="http://192.168.1.14:3000"
          width="800px"
          height="650px"
          style={{ border: "none" }}
          title="Map"
        ></iframe>
      </MapContainer>
    </Container>
  );
}
