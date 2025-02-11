import { RegistryInteractor } from "./RegistryInteractor";
import type { RegistryState } from "./RegistryInteractor";
import {
  // Base types
  Result,
  isSuccess,
  isError,

  // Data types
  RawMarker,
  UIMarker,
  RawLegend,
  UILegend,
  RawGeoJson,
  UIGeoJson,

  // Handlers
  MarkerHandler,
  LegendHandler,
  GeoJsonHandler,

  // Processing functions
  processMarkers,
  processLegend,
  processGeoJson,
} from "./handlers";

export type {
  RegistryState,
  Result,
  RawMarker,
  UIMarker,
  RawLegend,
  UILegend,
  RawGeoJson,
  UIGeoJson,
};

export {
  RegistryInteractor,
  isSuccess,
  isError,
  MarkerHandler,
  LegendHandler,
  GeoJsonHandler,
  processMarkers,
  processLegend,
  processGeoJson,
};

// Default export for convenience
export default RegistryInteractor;
