import axios from "axios";
import type { User } from "../types/user";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiHandler } from "../utils/ApiHandler";

// export const getUsers = async (): Promise<ApiResponse<User[]>> => {
//   try {
//     const response = await axios.get<User[]>(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     return ApiResponse.success<User[]>(response.data);
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       return ApiResponse.error<User[]>(
//         error.response?.data?.message || "Failed to load data"
//       );
//     }

//     return ApiResponse.error<User[]>("Failed to load data");
//   }
// };

export const getUsers = (): Promise<ApiResponse<User[]>> => {
  const apiHandler = new ApiHandler<User[]>();
  return apiHandler.handle(async () => {
    const response = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    return response.data;
  });
};
