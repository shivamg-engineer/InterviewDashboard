import axios from "axios";
import { ApiResponse } from "./ApiResponse";

export class ApiHandler<T> {
  loading = false;
  response: ApiResponse<T> | null = null;

  //   static async handle<T>(apiCall: () => Promise<T>): Promise<ApiResponse<T>> {
  //     try {
  //       const data = await apiCall();
  //       return ApiResponse.success(data);
  //     } catch (error: unknown) {
  //       if (axios.isAxiosError(error)) {
  //         return ApiResponse.error<T>(
  //           error.response?.data?.message ?? "Failed to load data"
  //         );
  //       }

  //       return ApiResponse.error<T>("Failed to load data");
  //     }
  //   }

  async handle(apiCall: () => Promise<T>): Promise<ApiResponse<T>> {
    this.loading = true;

    try {
      const data = await apiCall();
      this.response = ApiResponse.success<T>(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        this.response = ApiResponse.error<T>(
          error.response?.data?.message ?? "Failed to load data"
        );
      } else {
        this.response = ApiResponse.error<T>("Failed to load data");
      }
    } finally {
      this.loading = false;
    }

    return this.response;
  }
}
