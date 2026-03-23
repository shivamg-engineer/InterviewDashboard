import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

interface RetryConfig extends InternalAxiosRequestConfig {
  __retryCount?: number;
}

const MAX_RETRIES = 2;

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
});

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const config = error.config as RetryConfig;

    // Safety check
    if (!config || !error.response) {
      return Promise.reject(error);
    }

    // Initialize retry count
    config.__retryCount = config.__retryCount ?? 0;

    // Retry only on 500 errors
    if (error.response.status === 500 && config.__retryCount < MAX_RETRIES) {
      config.__retryCount += 1;

      console.warn(
        `Retrying request... Attempt ${config.__retryCount}/${MAX_RETRIES}`
      );

      return apiClient.request(config);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
