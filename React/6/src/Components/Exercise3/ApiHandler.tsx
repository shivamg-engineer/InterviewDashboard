type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiFailure = {
  success: false;
  error: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

class ApiHandler {
  loading: boolean = false;

  async handleRequest<T>(
    requestFn: () => Promise<T>
  ): Promise<ApiResponse<T>> {
    this.loading = true;

    try {
      const data = await requestFn();

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        error:
          error?.message ||
          "Something went wrong while making the request",
      };
    } finally {
      this.loading = false;
    }
  }
}

export default ApiHandler;
