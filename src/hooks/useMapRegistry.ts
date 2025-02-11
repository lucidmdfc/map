import { useState, useEffect, useCallback, useMemo } from "react";
import { RegistryInteractor, RegistryState } from "../registry";
import { Result, isError } from "../registry/handlers/BaseHandler";
import { RawMarker } from "../registry/handlers/MarkerHandler";
import { RawLegend } from "../registry/handlers/LegendHandler";
import { RawGeoJson } from "../registry/handlers/GeoJsonHandler";

// Define the return type of the custom hook
interface UseMapRegistryReturn {
  state: RegistryState;
  error: Error | null;
  loading: boolean;
  updateMarkers: (markers: RawMarker[]) => Promise<void>;
  updateLegend: (legend: RawLegend) => Promise<void>;
  updateGeoJson: (geoJson: RawGeoJson) => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

// Custom hook to manage the map registry
export function useMapRegistry(
  registry = RegistryInteractor.getInstance() // Get singleton instance of registry
): UseMapRegistryReturn {
  // State management for registry state, errors, and loading status
  const [state, setState] = useState<RegistryState>(registry.getState());
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  // Helper function to handle operations with loading and error management
  const handleOperation = async <T>(
    operation: () => Result<T> // Operation that returns a Result type
  ): Promise<Result<T>> => {
    setLoading(true); // Set loading state to true
    setError(null); // Clear previous errors

    try {
      const result = operation(); // Execute the operation
      if (isError(result)) {
        setError(result.error); // Capture error if the result is an error
      }
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unexpected error");
      setError(error); // Capture unexpected errors
      return { tag: "error", error };
    } finally {
      setLoading(false); // Reset loading state after operation completes
    }
  };

  // Fetch the latest state from the registry
  const refresh = useCallback(async () => {
    await handleOperation(() => {
      const currentState = registry.getState();
      setState(currentState);
      return { tag: "success", data: currentState };
    });
  }, [registry]);

  // Initialize registry state on mount and clean up on unmount
  useEffect(() => {
    refresh(); // Fetch initial state
    return () => {
      setState(registry.getState()); // Reset state on unmount
      setError(null);
      setLoading(false);
    };
  }, [registry, refresh]);

  // Function to update markers and refresh the state
  const updateMarkers = useCallback(
    async (markers: RawMarker[]) => {
      const result = await handleOperation(() => registry.setMarkers(markers));
      if (!isError(result)) {
        await refresh();
      }
    },
    [registry, refresh]
  );

  // Function to update the legend and refresh the state
  const updateLegend = useCallback(
    async (legend: RawLegend) => {
      const result = await handleOperation(() => registry.setLegend(legend));
      if (!isError(result)) {
        await refresh();
      }
    },
    [registry, refresh]
  );

  // Function to update GeoJSON data and refresh the state
  const updateGeoJson = useCallback(
    async (geoJson: RawGeoJson) => {
      const result = await handleOperation(() => registry.setGeoJson(geoJson));
      if (!isError(result)) {
        await refresh();
      }
    },
    [registry, refresh]
  );

  // Function to clear any existing errors
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoize the return value to optimize performance and prevent unnecessary re-renders
  return useMemo(
    () => ({
      state,
      error,
      loading,
      updateMarkers,
      updateLegend,
      updateGeoJson,
      refresh,
      clearError,
    }),
    [
      state,
      error,
      loading,
      updateMarkers,
      updateLegend,
      updateGeoJson,
      refresh,
      clearError,
    ]
  );
}
