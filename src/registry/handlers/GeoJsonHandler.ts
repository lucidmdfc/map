import { BaseHandler, Result } from "./BaseHandler";
// import * as Sentry from "@sentry/node";

// Basic GeoJSON types
export interface GeoJsonFeature {
  type: "Feature";
  geometry: {
    type: string;
    coordinates: number[] | number[][] | number[][][];
  };
  properties?: Record<string, unknown>;
}

export interface RawGeoJson {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

// UI-ready GeoJSON with added UI-specific properties
export interface UIGeoJsonFeature extends GeoJsonFeature {
  id: string;
  isVisible: boolean;
  style?: {
    color?: string;
    weight?: number;
    opacity?: number;
  };
}

export interface UIGeoJson {
  type: "FeatureCollection";
  features: UIGeoJsonFeature[];
  lastUpdated: Date;
}

// GeoJSON handler class for processing GeoJSON data
export class GeoJsonHandler extends BaseHandler<RawGeoJson, UIGeoJson> {
  // Override validate method to ensure data integrity
  protected validate(geoJson: RawGeoJson): boolean {
    return (
      geoJson.type === "FeatureCollection" &&
      Array.isArray(geoJson.features) &&
      geoJson.features.every(
        (feature) =>
          feature.type === "Feature" &&
          feature.geometry &&
          Array.isArray(feature.geometry.coordinates)
      )
    );
  }

  // Process the GeoJSON data into UI format
  public process(): Result<UIGeoJson> {
    const data = this.getData();
    if (!data) {
      const error = new Error("No GeoJSON data to process");
      // Sentry.captureException(error); // Report error to Sentry
      return { tag: "error", error };
    }


    try {
      const processedGeoJson: UIGeoJson = {
        type: "FeatureCollection",
        features: data.features.map((feature, index) => ({
          ...feature,
          id: (feature.properties?.id as string) || `feature-${index}`,
          isVisible: true,
          style: {
            color: (feature.properties?.color as string) || "#3388ff",
            weight: (feature.properties?.weight as number) || 2,
            opacity: (feature.properties?.opacity as number) || 1,
          },
        })),
        lastUpdated: new Date(),
      };

      return { tag: "success", data: processedGeoJson };
    } catch (error) {
      // Sentry.captureException(error); // Report error to Sentry
      return {
        tag: "error",
        error:
          error instanceof Error

            ? error
            : new Error("GeoJSON processing failed"),
      };
    }
  }
}

// Helper function to process GeoJSON data
export function processGeoJson(rawGeoJson: RawGeoJson): Result<UIGeoJson> {
  try {
    const handler = new GeoJsonHandler();
    handler.setData(rawGeoJson);
    const result = handler.process();

    if (result.tag === "error") {
      // Sentry.captureException(result.error); // Report error to Sentry
      return result;
    }


    return { tag: "success", data: result.data };
  } catch (error) {
    // Sentry.captureException(error); // Report error to Sentry
    return {
      tag: "error",
      error:
        error instanceof Error ? error : new Error("Failed to process GeoJSON"),
    };
  }
}
