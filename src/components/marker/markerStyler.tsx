import L from "leaflet";
import { FaMapMarker } from "react-icons/fa";
// import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
// import "leaflet.awesome-markers";
import ReactDOMServer from "react-dom/server";
import { Theme } from "@mui/material/styles";

interface MarkerStylerProps {
  color: string;
  theme: Theme;
  size?: number;
}

const markerStyler = ({ color, theme, size = 32 }: MarkerStylerProps) => {
  // const style = `
  //   width: ${size}px;
  //   height: ${size}px;
  //   background-color: ${color};
  //   border-radius: 50%;
  //   border: 2px solid white;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   font-size: 14px;
  //   color: white;
  // `;
  const iconHtml = `<div class="map-marker">
    <i class="icon">
      ${ReactDOMServer.renderToString(
        <FaMapMarker
          color={color}
          size={size}
          style={{
            filter: `drop-shadow(2px 2px 2px ${theme.palette.grey[500]})`,
            transition: theme.transitions.create(["transform"], {
              duration: theme.transitions.duration.shorter,
            }),
          }}
        />
      )}
    </i>
  </div>`;
  return L.divIcon({
    className: "map-marker",
    html: iconHtml,
    iconSize: [size, size],
  });
};
export default markerStyler;
// export const createMarkerIcon = (color: "red" | "darkred" | "orange" | "green" | "darkgreen" | "blue" | "purple" | "darkpurple" | "cadetblue") => {
//   return L.AwesomeMarkers.icon({
//     markerColor: color,
//   });
// };
