import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MarkerRenderer } from './markerRenderer';

interface MarkerLayerProps {
  data: any;
  sortingData: any;
  onMarkerClick?: (feature: any) => void;
}

const MarkerLayer: React.FC<MarkerLayerProps> = ({ data, sortingData, onMarkerClick }) => {
  return (
    <>
      {data.features.map((feature: any) => {
        const latlng = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
        return <MarkerRenderer feature={feature} latlng={latlng} onMarkerClick={onMarkerClick} sortingData={sortingData}/>
      })}
    </>
  );
};

export default MarkerLayer;