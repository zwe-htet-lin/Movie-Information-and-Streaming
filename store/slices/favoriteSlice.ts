import { config } from "@/lib/config";
import { FavoritePayload } from "@/types/favorite";
import { Favorite } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  value: Favorite[];
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;
}

const initialState: FavoriteState = {
  value: [],
  isLoading: false,
  isInitializing: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk<
  Favorite[],
  void,
  { rejectValue: string }
>("favorite/fetchFavorites", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${config.apiBaseUrl}/favorite`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const createFavorite = createAsyncThunk<
  Favorite[],
  FavoritePayload,
  { rejectValue: string }
>(
  "favorite/createFavorite",
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/favorite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const favorites = await res.json();
      onSuccess?.();
      return favorites;
    } catch {
      onError?.();
      return rejectWithValue("Failed to create favorite");
    }
  }
);

export const deleteFavorite = createAsyncThunk<
  Favorite[],
  FavoritePayload,
  { rejectValue: string }
>(
  "favorite/deleteFavorite",
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/favorite`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const favorites = await res.json();
      onSuccess?.();
      return favorites;
    } catch {
      onError?.();
      return rejectWithValue("Failed to delete favorite");
    }
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    clearFavorite(state) {
      state.value = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state: FavoriteState) => {
      state.isLoading = true;
      state.error = null;
    };
    const handleRejected = (
      state: FavoriteState,
      action: PayloadAction<any>
    ) => {
      state.isLoading = false;
      state.isInitializing = true;
      state.error = "Something went wrong";
    };
    const handleFulfilled = (
      state: FavoriteState,
      action: PayloadAction<Favorite[]>
    ) => {
      state.value = action.payload;
      state.isLoading = false;
      state.isInitializing = true;
      state.error = null;
    };

    builder
      .addCase(fetchFavorites.pending, handlePending)
      .addCase(fetchFavorites.fulfilled, handleFulfilled)
      .addCase(fetchFavorites.rejected, handleRejected)
      .addCase(createFavorite.pending, handlePending)
      .addCase(createFavorite.fulfilled, handleFulfilled)
      .addCase(createFavorite.rejected, handleRejected)
      .addCase(deleteFavorite.pending, handlePending)
      .addCase(deleteFavorite.fulfilled, handleFulfilled)
      .addCase(deleteFavorite.rejected, handleRejected);
  },
});

export const { clearFavorite } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;
