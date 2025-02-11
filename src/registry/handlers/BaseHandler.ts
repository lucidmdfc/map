// Represents the result of a data operation, which can either be a success or an error.
// - On success: Contains the `data` of type `T`.
// - On error: Contains the `error` of type `E` (defaults to `Error`).
export type Result<T, E = Error> =
  | { tag: "success"; data: T } // Success case
  | { tag: "error"; error: E }; // Error case

// Type guard to check if a Result is successful.
// This is useful for narrowing down the type of a Result in conditional blocks.
export function isSuccess<T>(result: Result<T>): result is { tag: "success"; data: T } {
  return result.tag === "success";
}

// Type guard to check if a Result is an error.
// This is useful for narrowing down the type of a Result in conditional blocks.
export function isError<T, E>(result: Result<T, E>): result is { tag: "error"; error: E } {
  return result.tag === "error";
}

// Abstract base handler class for processing data.
// This class provides a foundation for handlers that process input data (`TInput`) and produce output data (`TOutput`).
export abstract class BaseHandler<TInput, TOutput = TInput> {
  // Stores the data to be processed. Initialized as `null`.
  private data: TInput | null = null;

  // Sets the data to be processed.
  // Throws an error if the data fails validation.
  public setData(data: TInput): void {
    if (!this.validate(data)) {
      throw new Error(`Invalid data provided to handler: ${JSON.stringify(data)}`);
    }
    this.data = data;
  }

  // Retrieves the currently stored data.
  // Returns `null` if no data has been set.
  public getData(): TInput | null {
    return this.data;
  }

  // Validates the input data.
  // This method can be overridden by subclasses to implement custom validation logic.
  // By default, it checks that the data is neither `null` nor `undefined`.
  protected validate(data: TInput): boolean {
    return data !== null && data !== undefined;
  }

  // Processes the stored data and returns a `Result` object.
  // This method must be implemented by subclasses to define specific processing logic.
  // It can support both synchronous and asynchronous operations.
  public abstract process(): Result<TOutput> | Promise<Result<TOutput>>;

  // Resets the handler's state by clearing the stored data.
  // This is useful for reusing the handler instance.
  public reset(): void {
    this.data = null;
  }
}