// src/api/users/UserApi.ts

import BaseApi from "../BaseApi";
import type { User, CreateUserDto } from "./user.types";

export default class UserApi extends BaseApi {
  constructor() {
    super("https://jsonplaceholder.typicode.com/users"); // base URL for users (using JSONPlaceholder for testing)
  }

  // getAllUsers(): Promise<User[]> {
  //   return this.request<User[]>("/", "GET");
  // }

  getUserById(userId: number): Promise<User> {
    // return this.request<User>(`/${userId}`, "GET");
    return this.get<User>(`/${userId}`);
  }

  // getUser(userId: number): Promise<User> {
  //   return this.request<User>(`/${userId}`, "GET");
  // }

  createUser(data: CreateUserDto): Promise<User> {
    return this.post<User, CreateUserDto>("/", data);
  }

  // updateUser(userId: number, data: UpdateUserDto): Promise<User> {
  //   return this.request<User, UpdateUserDto>(`/${userId}`, "PUT", {
  //     data,
  //   });
  // }

  // deleteUser(userId: number): Promise<void> {
  //   return this.request<void>(`/${userId}`, "DELETE");
  // }
}
