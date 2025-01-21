import L from "leaflet";
import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "leaflet.awesome-markers";

export const createMarkerIcon = (color: "red" | "darkred" | "orange" | "green" | "darkgreen" | "blue" | "purple" | "darkpurple" | "cadetblue") => {
  return L.AwesomeMarkers.icon({
    markerColor: color,
  });
};