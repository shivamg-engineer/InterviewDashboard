import { createEntityAdapter } from "@reduxjs/toolkit";
import type { User } from "../../types/User";

export const usersAdapter = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: (a: User, b: User) => a.name.localeCompare(b.name),
});

// Export selectors
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors();
