import type { ApiResponse } from "./ApiResponse";
import type { ReactNode } from "react";

export class ResponseManager {
  static render<T>(params: {
    loading: boolean;
    response: ApiResponse<T> | null;
    // optional renderer for loading state
    onLoading?: () => ReactNode;
    onSuccess: (data: T) => ReactNode;
    onError: (message: string) => ReactNode;
    // onEmpty will be used when data is null/undefined or empty array
    onEmpty: () => ReactNode;
  }): ReactNode {
    const { loading, response, onSuccess, onError, onEmpty } = params;

    // Loading state - prefer the provided loading renderer if available
    if (loading) {
      return params.onLoading ? params.onLoading() : null;
    }

    // No response yet
    if (!response) return null;

    // Error state
    if (!response.success) {
      return onError(response.error || "An error occurred");
    }

    // Empty state - check for null/undefined
    if (response.data === null || response.data === undefined) {
      return onEmpty();
    }

    // Check if it's an empty array
    if (Array.isArray(response.data) && response.data.length === 0) {
      return onEmpty();
    }

    // Success state
    return onSuccess(response.data);
  }
}
