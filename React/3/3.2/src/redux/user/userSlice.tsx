import type { User } from "../../types/User";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAdapter } from "./usersAdapter";

// interface UserState {
//   data: User | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: UserState = {
//   data: null,
//   loading: false,
//   error: null,
// };

/**
 * Fake API:
 * https://jsonplaceholder.typicode.com/users/1
 */
export const fetchUserProfile = createAsyncThunk<
  User, // returned data type
  void, // argument type
  { rejectValue: string }
>("user/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (!response.ok) {
      return rejectWithValue("Failed to fetch user");
    }

    const data: User = await response.json();
    return data;
  } catch {
    return rejectWithValue("Something went wrong while fetching user");
  }
});

// fetch all
export const fetchUsers = createAsyncThunk<
  User[], // returned data type
  void, // argument type
  { rejectValue: string }
>("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!res.ok) {
      return rejectWithValue("Failed to fetch users");
    }

    return (await res.json()) as User[];
  } catch {
    return rejectWithValue("Something went wrong while fetching users");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: usersAdapter.getInitialState({
    loading: false,
    error: null as string | null,
  }),
  reducers: {
    userAdded: usersAdapter.addOne,
    userUpdated: usersAdapter.updateOne,
    userRemoved: usersAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        usersAdapter.setOne(state, action.payload);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })
      // fetchUsers handlers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;
