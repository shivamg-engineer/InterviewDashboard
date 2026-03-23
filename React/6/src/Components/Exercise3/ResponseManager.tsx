import type { ReactNode } from "react";
import type { ApiResponse } from "./ApiHandler";

type ResponseManagerProps<T> = {
  loading: boolean;
  response: ApiResponse<T> | null;
  initializing: boolean;
  successComponent: (data: T) => ReactNode;
  errorComponent: (error: string) => ReactNode;
  emptyComponent: () => ReactNode;
};

class ResponseManager {
  static render<T>({
    loading,
    response,
    initializing,
    successComponent,
    errorComponent,
    emptyComponent,
  }: ResponseManagerProps<T>): ReactNode {
    if (loading) return null;
    if (initializing && !response) return <p>Initializing...</p>;
    if (response?.success && Array.isArray(response.data) && response.data.length === 0) {
      return emptyComponent();
    }
    if (response?.success) return successComponent(response.data);
    if (response?.error) return errorComponent(response.error);
    return null;
  }
}

export default ResponseManager;

