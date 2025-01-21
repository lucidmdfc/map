import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import { GeoJSON as GeoJSONType } from "geojson";
import { useState } from "react";

type GeoJSONLayerProps = {
  data: GeoJSONType;
  onCityClick?: (feature: any) => void;
};

const GeoJSONLayer: React.FC<GeoJSONLayerProps> = ({ data, onCityClick }) => {
  const map = useMap();
  const [cityClicked, setCityClicked] = useState(false);

  const getColor = (density: number) => {
    return density > 10000
      ? "#800026"
      : density > 8000
      ? "#BD0026"
      : density > 5000
      ? "#E31A1C"
      : "#FFEDA0";
  };

  const style = (feature: any) => ({
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: "white",
    fillOpacity: 0.7,
  });

  const onEachFeature = (feature: any, layer: L.Layer) => {
    layer.on({
      click: () => {
        if (!cityClicked) {
          const bounds = L.geoJSON(feature).getBounds();
          map.fitBounds(bounds, { padding: [50, 50] }); // Zoom to the feature with padding
          setCityClicked(true);
          if (onCityClick) {
            onCityClick(feature); // Notify parent component if callback is provided
          }
        }
      },
    });

    layer.bindTooltip(
      `<strong>${feature.properties.name}</strong>`,
      { permanent: true, direction: "center", className: "custom-tooltip" }
    );
  };



  return (
    <GeoJSON
      data={data}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
};

export default GeoJSONLayer;