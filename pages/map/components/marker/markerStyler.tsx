import L from "leaflet";
import { FaMapMarker } from "react-icons/fa";
// import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
// import "leaflet.awesome-markers";
import ReactDOMServer from 'react-dom/server';

export const createDivIcon = (color : any, size = 32) => {
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
  const iconHtml = `<div">
    <i class="icon">
      ${ReactDOMServer.renderToString(<FaMapMarker color={color} size={size} />)}
    </i>
  </div>`;
  return L.divIcon({
    className: "map-marker",
    html: iconHtml,
    iconSize: [size, size],
  });
};

// export const createMarkerIcon = (color: "red" | "darkred" | "orange" | "green" | "darkgreen" | "blue" | "purple" | "darkpurple" | "cadetblue") => {
//   return L.AwesomeMarkers.icon({
//     markerColor: color,
//   });
// };