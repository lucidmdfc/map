import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MarkerRenderer } from "../marker";

const MarkerLayer: React.FC<MarkerLayerProps> = ({
  data,
  sortingData,
  onMarkerClick,
  markers,
}) => {
  // console.log(markers);
  // console.log(markers);
  return (
    <>
      {/* {data.features.map((feature: any) => {
        const latlng = L.latLng(
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0]
        );
        return (
          <MarkerRenderer
            feature={feature}
            latlng={latlng}
            onMarkerClick={onMarkerClick}
            sortingData={sortingData}
          />
        );
      })} */}
      {markers.map((marker: any) => {
        console.log(marker);
        const latlng = L.latLng(marker.coordinates[1], marker.coordinates[0]);
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
