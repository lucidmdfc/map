import { BaseHandler, Result } from "./BaseHandler";
// import * as Sentry from "@sentry/node";

// Raw legend data from API/storage
export interface RawLegendItem {
  id: string;
  label: string;
  NumericRanges: string | number | [number, number]; // Accepts ranges
  style?: Record<string, unknown>;
  type: string;
}

export interface RawLegend {
  title: string;
  type: string;
  items: RawLegendItem[];
}

// Processed legend data ready for UI
export interface UILegendItem {
  id: string;
  label: string;
  NumericRanges: string | number | [number, number]; // Accepts ranges
  color: string;
  icon?: string;
  isVisible: boolean;
}

export interface UILegend {
  title: string;
  type: string;
  items: UILegendItem[];
  isCollapsed: boolean;
}

// Legend handler class for processing legend data
export class LegendHandler extends BaseHandler<RawLegend, UILegend> {
  // Override validate method to ensure data integrity
  protected validate(legend: RawLegend): boolean {
    return Boolean(
      legend.title &&
        Array.isArray(legend.items) &&
        legend.items.every((item) => item.id && item.label)
    );
  }

  // Process the legend data into UI format
  public process(): Result<UILegend> {
    const data = this.getData();
    if (!data) {
      const error = new Error("No Legend data to process");
      // Sentry.captureException(error); // Report error to Sentry
      return { tag: "error", error };
    }

    try {
      const processedLegend: UILegend = {
        title: data.title,
        type: data.type,
        isCollapsed: false,
        items: data.items.map((item) => ({
          id: item.id,
          label: item.label,
          NumericRanges: item.NumericRanges,
          color: (item.style?.color as string) || "#000000",
          icon: item.style?.icon as string,
          isVisible: true,
        })),
      };

      return { tag: "success", data: processedLegend };
    } catch (error) {
      // Sentry.captureException(error); // Report error to Sentry
      return {
        tag: "error",
        error:
          error instanceof Error
            ? error
            : new Error("Legend processing failed"),
      };
    }
  }
}

// Helper function to process legend data
export function processLegend(rawLegend: RawLegend): Result<UILegend> {
  try {
    const handler = new LegendHandler();
    handler.setData(rawLegend);
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
        error instanceof Error ? error : new Error("Failed to process legend"),
    };
  }
}
