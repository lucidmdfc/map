import { Marker, Popup } from "react-leaflet";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import L from "leaflet";
import "leaflet.awesome-markers";
import { useMarkerColor } from "../../utils/markerColor";
import { markerStyler } from ".";
import { useTheme } from "@mui/material/styles";

const MarkerRenderer: React.FC<MarkerRendererProps> = ({
  feature,
  latlng,
  onMarkerClick,
  sortingData,
}) => {
  // console.log(sortingData)
  const theme = useTheme();
  const getMarkerColor = useMarkerColor();
  const color = getMarkerColor(
    feature.metadata[sortingData.field],
    sortingData
  );
  const icon = markerStyler({ color, theme });
  // console.log("icon", icon)
  console.log("sortingData", sortingData);
  return (
    <Marker
      key={feature.metadata.name}
      position={latlng}
      icon={icon}
      eventHandlers={{
        click: () => {
          if (onMarkerClick) {
            onMarkerClick(feature);
          }
        },
      }}
    >
      <Popup>
        <strong>{feature.metadata.name}</strong>
        <br />
        {sortingData.field}: {feature.metadata[sortingData.field]}
      </Popup>
    </Marker>
  );
};
export default MarkerRenderer;
