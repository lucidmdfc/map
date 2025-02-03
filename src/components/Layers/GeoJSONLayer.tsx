import { GeoJSON } from "react-leaflet";
import L from "leaflet";
import { choroplethColors } from "../../utils/Colors";

import { GeoJSONLayerProps } from "../../types/layer";

const GeoJSONLayer: React.FC<GeoJSONLayerProps> = ({ data, onCityClick }) => {
  const thresholds = [5000, 8000, 10000];

  const getColor = (density: number) => {
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (density > thresholds[i]) {
        return choroplethColors[i + 1];
      }
    }
    return choroplethColors[0];
  };

  const style = (feature: any) => ({
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: "#BAE2E8",
    fillOpacity: 0.7,
  });

  const onEachFeature = (feature: any, layer: L.Layer) => {
    layer.on({
      click: () => {
        if (onCityClick) {
          onCityClick(feature); // Notify parent component
        }
      },
    });

    layer.bindTooltip(`<strong>${feature.properties.name}</strong>`, {
      permanent: true,
      direction: "center",
      className: "custom-tooltip",
    });
  };

  return <GeoJSON data={data} style={style} onEachFeature={onEachFeature} />;
};

export default GeoJSONLayer;
