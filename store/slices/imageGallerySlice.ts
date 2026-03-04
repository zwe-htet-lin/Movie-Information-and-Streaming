import { createSlice } from "@reduxjs/toolkit";

interface ImageState {
  value: {
    path: string;
    type: string;
    button: string;
  };
}

const initialState: ImageState = {
  value: {
    path: "",
    type: "backdrop",
    button: "",
  },
};

const imageGallerySlice = createSlice({
  name: "imageGallery",
  initialState,
  reducers: {
    setImageGalleryPath(state, action) {
      state.value.path = action.payload;
    },
    setImageGalleryType(state, action) {
      state.value.type = action.payload;
    },
    setImageGalleryButton(state, action) {
      state.value.button = action.payload;
    },
  },
});

export const {
  setImageGalleryPath,
  setImageGalleryType,
  setImageGalleryButton,
} = imageGallerySlice.actions;
export const imageGalleryReducer = imageGallerySlice.reducer;
