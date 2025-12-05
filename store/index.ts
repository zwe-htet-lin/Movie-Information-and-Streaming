import { configureStore } from "@reduxjs/toolkit";
import { bookmarkReducer } from "./slices/bookmarkSlice";
import { favoriteReducer } from "./slices/favoriteSlice";
import { ratingReducer } from "./slices/ratingSlice";
import { userReducer } from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    rating: ratingReducer,
    favorite: favoriteReducer,
    bookmark: bookmarkReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
