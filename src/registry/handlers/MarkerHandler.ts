import { BaseHandler, Result } from "./BaseHandler";
// import * as Sentry from "@sentry/node";

// Raw marker data from API/storage
export interface RawMarker {
  id: string;
  coordinates: [number, number];
  metadata?: {
    title?: string;
    [key: string]: unknown;
  };
  type: string;
}

// Processed marker data ready for UI
export interface UIMarker {
  id: string;
  coordinates: [number, number];
  type: string;
  isVisible: boolean;
  metadata: {
    title: string;
    [key: string]: unknown;
  };
}

// Marker handler class for processing marker data
export class MarkerHandler extends BaseHandler<RawMarker, UIMarker> {
  // Override validate method to ensure data integrity
  // protected validate(marker: RawMarker): boolean {
  //   return Boolean(
  //     marker.id &&
  //       Array.isArray(marker.coordinates) &&
  //       marker.coordinates.length === 2 &&
  //       typeof marker.coordinates[0] === "number" &&
  //       typeof marker.coordinates[1] === "number"
  //   );
  // }

  // Process the marker data into UI format
  public process(): Result<UIMarker> {
    const data = this.getData();
    if (!data) {
      const error = new Error("No marker data to process");
      // Sentry.captureException(error); // Report error to Sentry
      return { tag: "error", error };
    }

    try {
      const processedMarker: UIMarker = {
        id: data.id,
        coordinates: data.coordinates,
        type: data.type,
        isVisible: true,
        metadata: {
          title: data.metadata?.title || "Unnamed Marker",
          description: data.metadata?.description || "",
          ...data.metadata,
        },
      };

      return { tag: "success", data: processedMarker };
    } catch (error) {
      // Sentry.captureException(error); // Report error to Sentry
      return {
        tag: "error",
        error:
          error instanceof Error
            ? error
            : new Error("Marker processing failed"),
      };
    }
  }
}

// Helper function to process a single marker
function processSingleMarker(marker: RawMarker): Result<UIMarker> {
  const handler = new MarkerHandler();
  handler.setData(marker);
  return handler.process();
}

// Helper function to process an array of marker data
export function processMarkers(rawMarkers: RawMarker[]): Result<UIMarker[]> {
  try {
    const processedMarkers: UIMarker[] = [];

    for (const marker of rawMarkers) {
      const result = processSingleMarker(marker);

      if (result.tag === "error") {
        // Sentry.captureException(result.error); // Report error to Sentry
        continue; // Skip this marker and continue with the next
      }

      processedMarkers.push(result.data);
    }

    return { tag: "success", data: processedMarkers };
  } catch (error) {
    // Sentry.captureException(error); // Report error to Sentry
    return {
      tag: "error",
      error:
        error instanceof Error ? error : new Error("Failed to process markers"),
    };
  }
}
