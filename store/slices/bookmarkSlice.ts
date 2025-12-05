import { config } from "@/lib/config";
import { Bookmark, BookmarkPayload } from "@/types/bookmark";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookmarkState {
  value: Bookmark[];
  isLoading: boolean;
  isInitializing: boolean;
  error: string | null;
}

const initialState: BookmarkState = {
  value: [],
  isLoading: false,
  isInitializing: false,
  error: null,
};

export const fetchBookmarks = createAsyncThunk<
  Bookmark[],
  void,
  { rejectValue: string }
>("bookmark/fetchBookmarks", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${config.apiBaseUrl}/bookmark`, {
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

export const createBookmark = createAsyncThunk<
  Bookmark[],
  BookmarkPayload,
  { rejectValue: string }
>(
  "bookmark/createBookmark",
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/bookmark`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const bookmarks = await res.json();
      onSuccess?.();
      return bookmarks;
    } catch {
      onError?.();
      return rejectWithValue("Failed to create bookmark");
    }
  }
);

export const updateBookmark = createAsyncThunk<
  Bookmark[],
  BookmarkPayload,
  { rejectValue: string }
>(
  "bookmark/updateBookmark",
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/bookmark`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const bookmarks = await res.json();
      onSuccess?.();
      return bookmarks;
    } catch {
      onError?.();
      return rejectWithValue("Failed to update bookmark");
    }
  }
);

export const deleteBookmark = createAsyncThunk<
  Bookmark[],
  BookmarkPayload,
  { rejectValue: string }
>(
  "bookmark/deleteBookmark",
  async ({ payload, onSuccess, onError }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${config.apiBaseUrl}/bookmark`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

      const bookmarks = await res.json();
      onSuccess?.();
      return bookmarks;
    } catch {
      onError?.();
      return rejectWithValue("Failed to delete bookmark");
    }
  }
);

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    clearBookmark(state) {
      state.value = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state: BookmarkState) => {
      state.isLoading = true;
      state.error = null;
    };
    const handleRejected = (
      state: BookmarkState,
      action: PayloadAction<any>
    ) => {
      state.isLoading = false;
      state.isInitializing = true;
      state.error = "Something went wrong";
    };
    const handleFulfilled = (
      state: BookmarkState,
      action: PayloadAction<Bookmark[]>
    ) => {
      state.value = action.payload;
      state.isLoading = false;
      state.isInitializing = true;
      state.error = null;
    };

    builder
      .addCase(fetchBookmarks.pending, handlePending)
      .addCase(fetchBookmarks.fulfilled, handleFulfilled)
      .addCase(fetchBookmarks.rejected, handleRejected)
      .addCase(createBookmark.pending, handlePending)
      .addCase(createBookmark.fulfilled, handleFulfilled)
      .addCase(createBookmark.rejected, handleRejected)
      .addCase(updateBookmark.pending, handlePending)
      .addCase(updateBookmark.fulfilled, handleFulfilled)
      .addCase(updateBookmark.rejected, handleRejected)
      .addCase(deleteBookmark.pending, handlePending)
      .addCase(deleteBookmark.fulfilled, handleFulfilled)
      .addCase(deleteBookmark.rejected, handleRejected);
  },
});

export const { clearBookmark } = bookmarkSlice.actions;
export const bookmarkReducer = bookmarkSlice.reducer;
