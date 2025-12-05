import { config } from "@/lib/config";
import { RatingPayload } from "@/types/rating";
import { Rating } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RatingState {
  value: Rating[];
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;
}

const initialState: RatingState = {
  value: [],
  isLoading: false,
  isInitializing: false,
  error: null,
};

export const fetchRatings = createAsyncThunk<
  Rating[],
  void,
  { rejectValue: string }
>("rating/fetchRatings", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${config.apiBaseUrl}/rating`, {
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

export const createRating = createAsyncThunk<
  Rating[],
  RatingPayload,
  { rejectValue: string }
>(
  "rating/createRating",
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const ratings = await res.json();
      onSuccess?.();
      return ratings;
    } catch {
      onError?.();
      return rejectWithValue("Failed to create rating");
    }
  }
);

export const updateRating = createAsyncThunk<
  Rating[],
  RatingPayload,
  { rejectValue: string }
>(
  "rating/updateRating",
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/rating`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const ratings = await res.json();
      onSuccess?.();
      return ratings;
    } catch {
      onError?.();
      return rejectWithValue("Failed to update rating");
    }
  }
);

export const deleteRating = createAsyncThunk<
  Rating[],
  RatingPayload,
  { rejectValue: string }
>(
  "rating/deleteRating",
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/rating`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const ratings = await res.json();
      onSuccess?.();
      return ratings;
    } catch {
      onError?.();
      return rejectWithValue("Failed to delete rating");
    }
  }
);

const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    clearRating(state) {
      state.value = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state: RatingState) => {
      state.isLoading = true;
      state.error = null;
    };
    const handleRejected = (state: RatingState, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.isInitializing = true;
      state.error = "Something went wrong";
    };
    const handleFulfilled = (
      state: RatingState,
      action: PayloadAction<Rating[]>
    ) => {
      state.value = action.payload;
      state.isLoading = false;
      state.isInitializing = true;
      state.error = null;
    };

    builder
      .addCase(fetchRatings.pending, handlePending)
      .addCase(fetchRatings.fulfilled, handleFulfilled)
      .addCase(fetchRatings.rejected, handleRejected)
      .addCase(createRating.pending, handlePending)
      .addCase(createRating.fulfilled, handleFulfilled)
      .addCase(createRating.rejected, handleRejected)
      .addCase(updateRating.pending, handlePending)
      .addCase(updateRating.fulfilled, handleFulfilled)
      .addCase(updateRating.rejected, handleRejected)
      .addCase(deleteRating.pending, handlePending)
      .addCase(deleteRating.fulfilled, handleFulfilled)
      .addCase(deleteRating.rejected, handleRejected);
  },
});

export const { clearRating } = ratingSlice.actions;
export const ratingReducer = ratingSlice.reducer;
