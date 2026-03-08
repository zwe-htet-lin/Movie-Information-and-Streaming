import { createSlice } from "@reduxjs/toolkit";

interface MovieFilterState {
  value: {
    page: number;
    category: string;
    language: string;
    genre: string;
  };
}

const initialState: MovieFilterState = {
  value: {
    page: 1,
    category: "popular",
    language: "none",
    genre: "0",
  },
};

const movieFilterSlice = createSlice({
  name: "movieFilter",
  initialState,
  reducers: {
    setMoviePageFilter(state, action) {
      state.value.page = action.payload;
    },
    setMovieCategoryFilter(state, action) {
      state.value.category = action.payload;
    },
    setMovieLanguageFilter(state, action) {
      state.value.language = action.payload;
    },
    setMovieGenreFilter(state, action) {
      state.value.genre = action.payload;
    },
    clearMovieFilters: (state) => {
      state.value = {
        page: 1,
        category: "popular",
        language: "none",
        genre: "0",
      };
    },
  },
});

export const {
  setMoviePageFilter,
  setMovieCategoryFilter,
  setMovieLanguageFilter,
  setMovieGenreFilter,
  clearMovieFilters,
} = movieFilterSlice.actions;
export const movieFilterReducer = movieFilterSlice.reducer;
