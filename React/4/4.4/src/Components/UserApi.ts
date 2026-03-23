import axios from "axios";
import type { User } from "../types/user";

const UserApi = {
  getUsers: async (): Promise<User[]> => {
    const response = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  },
};

export default UserApi;
