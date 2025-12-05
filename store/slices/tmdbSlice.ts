import { config } from "@/lib/config";
import { Genre } from "@/types/genre";
import { Movie } from "@/types/tmdb";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

interface TMDB {
  trending: {
    todays: Movie[];
    weeks: Movie[];
  };
  latest: {
    movies: Movie[];
    tvs: Movie[];
  };
  content: {
    movies: Movie[];
    tvs: Movie[];
  };
  genre: {
    movies: Genre[];
    tvs: Genre[];
  };
}

interface StatusState {
  trending: {
    todays: boolean;
    weeks: boolean;
  };
  latest: {
    movies: boolean;
    tvs: boolean;
  };
  content: {
    movies: boolean;
    tvs: boolean;
  };
  genre: {
    movies: boolean;
    tvs: boolean;
  };
}

interface ErrorState {
  trending: {
    todays: Error | null;
    weeks: Error | null;
  };
  latest: {
    movies: Error | null;
    tvs: Error | null;
  };
  content: {
    movies: Error | null;
    tvs: Error | null;
  };
  genre: {
    movies: Error | null;
    tvs: Error | null;
  };
}

interface TMDBState {
  value: TMDB;
  loading: StatusState;
  error: ErrorState;
}

// Helper for API calls
const fetchFromTMDB = async (endpoint: string, page?: number) => {
  const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${
    config.apiKey
  }${page ? `&page=${page}` : ""}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();
  return data.results || data.genres || [];
};

const createTMDBThunk = (name: string, endpoint: string, page?: number) =>
  createAsyncThunk(name, async (_, { rejectWithValue }) => {
    try {
      return await fetchFromTMDB(endpoint, page);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  });

// Async thunks
export const fetchTrendingDay = createTMDBThunk(
  "tmdb/fetchTrendingDay",
  "trending/all/day"
);
export const fetchTrendingWeek = createTMDBThunk(
  "tmdb/fetchTrendingWeek",
  "trending/all/week"
);
export const fetchLatestMovies = createTMDBThunk(
  "tmdb/fetchLatestMovies",
  "discover/movie"
);
export const fetchLatestTvs = createTMDBThunk(
  "tmdb/fetchLatestTvs",
  "discover/tv"
);

export const fetchGenreMovies = createTMDBThunk(
  "tmdb/fetchGenreMovies",
  "genre/movie/list"
);
export const fetchGenreTvs = createTMDBThunk(
  "tmdb/fetchGenreTvs",
  "genre/tv/list"
);

export const fetchMovies = createAsyncThunk(
  "tmdb/fetchMovies",
  async (page: number, { rejectWithValue }) => {
    try {
      return await fetchFromTMDB("discover/movie", page);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTvs = createAsyncThunk(
  "tmdb/fetchTvs",
  async (page: number, { rejectWithValue }) => {
    try {
      return await fetchFromTMDB("discover/tv", page);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState: TMDBState = {
  value: {
    trending: { todays: [], weeks: [] },
    latest: { movies: [], tvs: [] },
    content: { movies: [], tvs: [] },
    genre: { movies: [], tvs: [] },
  },
  loading: {
    trending: { todays: false, weeks: false },
    latest: { movies: false, tvs: false },
    content: { movies: false, tvs: false },
    genre: { movies: false, tvs: false },
  },
  error: {
    trending: { todays: null, weeks: null },
    latest: { movies: null, tvs: null },
    content: { movies: null, tvs: null },
    genre: { movies: null, tvs: null },
  },
};

// Helper to register thunk cases
const addThunkCases = <
  Section extends keyof TMDBState["value"],
  Field extends keyof TMDBState["value"][Section]
>(
  builder: ActionReducerMapBuilder<TMDBState>,
  thunk: any,
  path: [Section, Field]
) => {
  const [section, field] = path;

  builder
    .addCase(thunk.pending, (state) => {
      (state.loading[section] as any)[field] = true;
      (state.error[section] as any)[field] = null;
    })
    .addCase(thunk.fulfilled, (state, action: PayloadAction<any[]>) => {
      (state.loading[section] as any)[field] = false;
      (state.value[section] as any)[field] = action.payload;
    })
    .addCase(thunk.rejected, (state, action) => {
      (state.loading[section] as any)[field] = false;
      (state.error[section] as any)[field] = action.payload as Error;
    });
};

// Slice
const tmdbSlice = createSlice({
  name: "tmdb",
  initialState,
  reducers: {
    clearTmdb: (state) => {
      state.value = {
        trending: { todays: [], weeks: [] },
        latest: { movies: [], tvs: [] },
        content: { movies: [], tvs: [] },
        genre: { movies: [], tvs: [] },
      };
      state.loading = {
        trending: { todays: false, weeks: false },
        latest: { movies: false, tvs: false },
        content: { movies: false, tvs: false },
        genre: { movies: false, tvs: false },
      };
      state.error = {
        trending: { todays: null, weeks: null },
        latest: { movies: null, tvs: null },
        content: { movies: null, tvs: null },
        genre: { movies: null, tvs: null },
      };
    },
  },
  extraReducers: (builder) => {
    addThunkCases(builder, fetchTrendingDay, ["trending", "todays"]);
    addThunkCases(builder, fetchTrendingWeek, ["trending", "weeks"]);
    addThunkCases(builder, fetchLatestMovies, ["latest", "movies"]);
    addThunkCases(builder, fetchLatestTvs, ["latest", "tvs"]);
    addThunkCases(builder, fetchMovies, ["content", "movies"]);
    addThunkCases(builder, fetchTvs, ["content", "tvs"]);
    addThunkCases(builder, fetchGenreMovies, ["genre", "movies"]);
    addThunkCases(builder, fetchGenreTvs, ["genre", "tvs"]);
  },
});

export const { clearTmdb } = tmdbSlice.actions;
export const tmdbReducer = tmdbSlice.reducer;
