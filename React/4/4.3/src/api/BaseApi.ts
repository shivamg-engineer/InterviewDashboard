// export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";



// export interface RequestOptions<T = unknown> {
//   data?: T;
//   headers?: Record<string, string>;
// }

// export default class BaseApi {
//   protected baseURL: string;

//   constructor(baseURL: string) {
//     this.baseURL = baseURL;
//   }

//   protected async request<TResponse, TRequest = unknown>(
//     endpoint: string,
//     method: HttpMethod = "GET",
//     options: RequestOptions<TRequest> = {}
//   ): Promise<TResponse> {
//     const { data, headers } = options;

//     try {
//       const response = await fetch(`${this.baseURL}${endpoint}`, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//           ...(headers ?? {}),
//         },
//         body: data ? JSON.stringify(data) : undefined,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP ${response.status}: ${errorText}`);
//       }

//       return (await response.json()) as TResponse;
//     } catch (error) {
//       console.error("API Request Error:", error);
//       throw error;
//     }
//   }
// }


// src/api/ApiFactory.ts
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

interface RetryConfig extends InternalAxiosRequestConfig {
  __retryCount?: number;
}

const MAX_RETRIES = 2;

export default class BaseApi {
  protected api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
    });

    // REQUEST INTERCEPTOR
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("authToken");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 🔍 Verification log
        console.log("Request Headers:", config.headers);

        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR WITH RETRY LOGIC
    this.api.interceptors.response.use(
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

          return this.api.request(config);
        }

        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
      }
    );
  }

  get<T>(endpoint: string): Promise<T> {
    return this.api.get<T>(endpoint).then((res) => res.data);
  }

  post<T, D = unknown>(endpoint: string, data: D): Promise<T> {
    return this.api.post<T>(endpoint, data).then((res) => res.data);
  }
}
