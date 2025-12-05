import { config } from "@/lib/config";
import { User } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  value: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  value: null,
  isLoading: false,
  error: null,
};

export const fetchUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/user`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return await res.json();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/deleteUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/user`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      state.value = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Something went wrong";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
        state.error = null;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.error = "Something went wrong";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.value = null;
        state.error = null;
      });
  },
});

export const { clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
