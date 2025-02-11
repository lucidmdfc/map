import { BaseHandler, Result, isSuccess, isError } from "./BaseHandler";

import {
  MarkerHandler,
  processMarkers,
  RawMarker,
  UIMarker,
} from "./MarkerHandler";

import {
  LegendHandler,
  processLegend,
  RawLegend,
  UILegend,
} from "./LegendHandler";

import {
  GeoJsonHandler,
  processGeoJson,
  RawGeoJson,
  UIGeoJson,
} from "./GeoJsonHandler";

export type {
  // Base types
  BaseHandler,
  Result,

  // Marker types
  RawMarker,
  UIMarker,

  // Legend types
  RawLegend,
  UILegend,

  // GeoJSON types
  RawGeoJson,
  UIGeoJson,
};

export {
  // Type guards
  isSuccess,
  isError,

  // Handlers
  MarkerHandler,
  LegendHandler,
  GeoJsonHandler,

  // Processing functions
  processMarkers,
  processLegend,
  processGeoJson,
};
