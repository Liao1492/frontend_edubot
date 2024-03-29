import { createSlice } from "@reduxjs/toolkit";

interface IState {
  selectedCollectionId: number | null;
}

const initialState: IState = {
  selectedCollectionId: null,
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setSelectedCollection: (state, action) => {
      state.selectedCollectionId = action.payload;
    },

    resetApp: (state) => {
      state.selectedCollectionId = null;
    },
  },
});

export const { setSelectedCollection, resetApp } = collectionSlice.actions;
export default collectionSlice.reducer;
