export class ApiResponse<T> {
  success: boolean;
  data: T | null;
  error: string | null;

  private constructor(success: boolean, data: T | null, error: string | null) {
    this.success = success;
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>(true, data, null);
  }

  static error<T>(errorMessage: string): ApiResponse<T> {
    return new ApiResponse<T>(false, null, errorMessage);
  }
}
