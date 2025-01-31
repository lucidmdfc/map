import { Marker, Popup } from "react-leaflet";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import L from "leaflet";
import "leaflet.awesome-markers";
import { getMarkerColor } from "../../utils/markerColor";
import { createDivIcon } from "./markerStyler";

interface MarkerRendererProps {
  feature: any;
  sortingData: any;
  latlng: L.LatLng;
  onMarkerClick?: (feature: any) => void;
}

export const MarkerRenderer: React.FC<MarkerRendererProps> = ({
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
  const icon = createDivIcon(color);
  // console.log("icon", icon)
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
