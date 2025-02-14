import { GeoJSON } from "react-leaflet";
import L from "leaflet";
import { useTheme } from "@mui/material/styles";
import { GeoJSONLayerProps } from "../../types/layer";

const GeoJSONLayer: React.FC<GeoJSONLayerProps> = ({ data, onCityClick }) => {
  const theme = useTheme();
  const thresholds = [5000, 8000, 10000];

  const getColor = (density: number) => {
    for (let i = thresholds.length - 1; i >= 0; i--) {
      if (density > thresholds[i]) {
        return i === thresholds.length - 1
          ? "#E07A5F"
          : i === thresholds.length - 2
            ? "#3D405B"
            : "#81B29A";
      }
    }
    return "#F4F1DE";
  };

  const style = (feature: any) => ({
    fillColor: getColor(feature.properties.density),
    weight: 2,
    opacity: 1,
    color: "#777",
    fillOpacity: 1,
  });

  const onEachFeature = (feature: any, layer: L.Layer) => {
    layer.on({
      click: () => {
        if (onCityClick) {
          onCityClick(feature);
        }
      },
      mouseover: () => {
        layer.openTooltip(); // Show tooltip on hover
      },
      mouseout: () => {
        layer.closeTooltip(); // Hide tooltip when mouse leaves
      },
    });

    // Bind the tooltip without the 'permanent' option
    layer.bindTooltip(`<strong>${feature.properties.name}</strong>`, {
      direction: "center",
      className: "custom-tooltip",
    });
  };

  return <GeoJSON data={data} style={style} onEachFeature={onEachFeature} />;
};

export default GeoJSONLayer;
