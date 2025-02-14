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
    feature.metadata[sortingData.property],
    sortingData
  );
  const icon = markerStyler({ color, theme });
  // console.log("icon", icon)
  // console.log("latlng", latlng);
  // console.log("feature", feature);
  // console.log("sortingData", sortingData.property);
  // console.log("sortingData", sortingData);
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
        <strong>{feature.metadata.title}</strong>
        <br />
        {sortingData.property}: {feature.metadata[sortingData.property]}
      </Popup>
    </Marker>
  );
};
export default MarkerRenderer;
