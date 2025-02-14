import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MarkerRenderer } from "../marker";

const MarkerLayer: React.FC<MarkerLayerProps> = ({
  // data,
  sortingData,
  onMarkerClick,
  markers,
}) => {
  // console.log(markers)
  return (
    <>
      {markers.map((marker: any) => {
        const { lat, lng } = marker.coordinates;

        const latlng = L.latLng(lat, lng);
        // console.log(latlng);
        return (
          <MarkerRenderer
            feature={marker}
            latlng={latlng}
            onMarkerClick={onMarkerClick}
            sortingData={sortingData}
          />
        );
      })}
    </>
  );
};

export default MarkerLayer;
