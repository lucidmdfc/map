import { GeoJSON as GeoJSONType } from "geojson";
export interface GeoJSONLayerProps {
  data: GeoJSONType;
  onCityClick?: (feature: any) => void;
}
