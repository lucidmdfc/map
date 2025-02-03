import { useEffect } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { GeoJSON as GeoJSONType } from "geojson";

// Fit Bounds To GeoJSON (Country + city)
const FitBoundsToGeoJSON = ({ geojsonData }: { geojsonData: GeoJSONType | null }) => {
  const map = useMap();

  useEffect(() => {
    if (geojsonData) {
      const bounds = L.geoJSON(geojsonData).getBounds();
      map.fitBounds(bounds);
      // map.setZoom(5);
    }
  }, [geojsonData, map]);

  return null;
};

export default FitBoundsToGeoJSON;