// Import necessary types and handlers
import { Result } from "./handlers/BaseHandler";
import { UIMarker, RawMarker, MarkerHandler } from "./handlers/MarkerHandler";
import { UILegend, RawLegend, LegendHandler } from "./handlers/LegendHandler";
import { UIGeoJson, RawGeoJson, GeoJsonHandler } from "./handlers/GeoJsonHandler";

// Define the structure of the Registry's state
export interface RegistryState {
  markers: UIMarker[]; // Array of processed markers
  legend: UILegend | null; // Processed legend (or null if not set)
  geoJson: UIGeoJson | null; // Processed GeoJSON (or null if not set)
}

// Main class for managing the registry state and interactions
export class RegistryInteractor {
  // Singleton instance of the RegistryInteractor
  private static instance: RegistryInteractor | null = null;

  // Internal state of the registry
  private state: RegistryState = {
    markers: [], // Initialize markers as an empty array
    legend: null, // Initialize legend as null
    geoJson: null, // Initialize GeoJSON as null
  };

  // Private constructor to enforce Singleton pattern
  private constructor(
    private markerHandler: MarkerHandler, // Handler for processing markers
    private legendHandler: LegendHandler, // Handler for processing legends
    private geoJsonHandler: GeoJsonHandler // Handler for processing GeoJSON
  ) {}

  // Singleton method to get the instance of RegistryInteractor
  public static getInstance(): RegistryInteractor {
    if (!this.instance) {
      // Create a new instance if it doesn't exist
      this.instance = new RegistryInteractor(
        new MarkerHandler(),
        new LegendHandler(),
        new GeoJsonHandler()
      );
    }
    return this.instance;
  }

  // Factory method for creating a test instance with custom handlers
  public static createTestInstance(
    markerHandler: MarkerHandler,
    legendHandler: LegendHandler,
    geoJsonHandler: GeoJsonHandler
  ): RegistryInteractor {
    return new RegistryInteractor(markerHandler, legendHandler, geoJsonHandler);
  }

  // Get a deep copy of the current state
  public getState(): RegistryState {
    return { ...this.state };
  }

  // Process and set markers in the state
  public setMarkers(rawMarkers: RawMarker[]): Result<void> {
    try {
      const processedMarkers: UIMarker[] = [];

      // Process each raw marker
      for (const marker of rawMarkers) {
        this.markerHandler.setData(marker); // Set data in the handler
        const result = this.markerHandler.process(); // Process the data

        // Handle errors during processing
        if (result.tag === "error") {
          console.error("Failed to process marker:", result.error);
          continue; // Skip this marker and continue with the next
        }

        // Add the processed marker to the list
        processedMarkers.push(result.data);
      }

      // Update the state with processed markers
      this.state.markers = processedMarkers;
      return { tag: "success", data: undefined };
    } catch (error) {
      // Handle unexpected errors
      console.error("Error processing markers:", error);
      return {
        tag: "error",
        error:
          error instanceof Error
            ? error
            : new Error("Marker processing failed"),
      };
    }
  }

  // Process and set the legend in the state
  public setLegend(rawLegend: RawLegend): Result<void> {
    try {
      this.legendHandler.setData(rawLegend); // Set data in the handler
      const result = this.legendHandler.process(); // Process the data

      // Handle errors during processing
      if (result.tag === "error") {
        console.error("Failed to process legend:", result.error);
        return result; // Return the error result
      }

      // Update the state with the processed legend
      this.state.legend = result.data;
      return { tag: "success", data: undefined };
    } catch (error) {
      // Handle unexpected errors
      console.error("Error processing legend:", error);
      return {
        tag: "error",
        error:
          error instanceof Error
            ? error
            : new Error("Legend processing failed"),
      };
    }
  }

  // Process and set GeoJSON in the state
  public setGeoJson(rawGeoJson: RawGeoJson): Result<void> {
    try {
      this.geoJsonHandler.setData(rawGeoJson); // Set data in the handler
      const result = this.geoJsonHandler.process(); // Process the data

      // Handle errors during processing
      if (result.tag === "error") {
        console.error("Failed to process GeoJSON:", result.error);
        return result; // Return the error result
      }

      // Update the state with the processed GeoJSON
      this.state.geoJson = result.data;
      return { tag: "success", data: undefined };
    } catch (error) {
      // Handle unexpected errors
      console.error("Error processing GeoJSON:", error);
      return {
        tag: "error",
        error:
          error instanceof Error
            ? error
            : new Error("GeoJSON processing failed"),
      };
    }
  }

  // Helper method to avoid repetition in get methods
  private getStateItem<T>(item: T | null): T | null {
    return item ? { ...item } : null; // Return a deep copy of the item or null
  }

  // Get a deep copy of the markers
  public getMarkers(): UIMarker[] {
    return [...this.state.markers]; // Return a copy of the markers array
  }

  // Get a deep copy of the legend
  public getLegend(): UILegend | null {
    return this.getStateItem(this.state.legend); // Use helper method
  }

  // Get a deep copy of the GeoJSON
  public getGeoJson(): UIGeoJson | null {
    return this.getStateItem(this.state.geoJson); // Use helper method
  }
}