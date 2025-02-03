interface MarkerRendererProps {
  feature: any;
  sortingData: any;
  latlng: L.LatLng;
  onMarkerClick?: (feature: any) => void;
}
interface MarkerLayerProps {
  data: any;
  sortingData: any;
  onMarkerClick?: (feature: any) => void;
}