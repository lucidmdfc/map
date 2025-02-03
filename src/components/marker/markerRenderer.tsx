import { Marker, Popup } from "react-leaflet";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import L from "leaflet";
import "leaflet.awesome-markers";
import { getMarkerColor } from "../../utils/markerColor";
import { markerStyler } from ".";

const MarkerRenderer: React.FC<MarkerRendererProps> = ({
  feature,
  latlng,
  onMarkerClick,
  sortingData,
}) => {
  // console.log(sortingData)
  const color = getMarkerColor(
    feature.properties[sortingData.field],
    sortingData
  );
  const icon = markerStyler(color);
  // console.log("icon", icon)
  console.log("sortingData", sortingData);
  return (
    <Marker
      key={feature.properties.name}
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
        <strong>{feature.properties.name}</strong>
        <br />
        {sortingData.field}: {feature.properties[sortingData.field]}
      </Popup>
    </Marker>
  );
};
export default MarkerRenderer;
