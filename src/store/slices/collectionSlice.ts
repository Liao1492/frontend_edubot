import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
  selectedCollectionId: number | null;
  seletectedCollectioName: string | null;
  modelSelection:
    | "gpt-4-0613"
    | "gpt-3.5-turbo-0125"
    | "gpt-3.5-turbo-instruct";
  storageSelection: "chromadb" | "duckdb" | "milvus";
}

const initialState: IState = {
  selectedCollectionId: null,
  seletectedCollectioName: null,
  modelSelection: "gpt-3.5-turbo-0125",
  storageSelection: "chromadb",
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setSelectedCollection: (state, action) => {
      state.selectedCollectionId = action.payload;
    },
    setSelectedCollectionName: (state, action) => {
      state.seletectedCollectioName = action.payload;
    },

    setModel: (state, action) => {
      state.modelSelection = action.payload;
    },
    setStorage: (
      state,
      action: PayloadAction<"chromadb" | "duckdb" | "milvus">
    ) => {
      state.storageSelection = action.payload;
    },

    resetApp: (state) => {
      state.selectedCollectionId = null;
      state.modelSelection = "gpt-3.5-turbo-0125";
      state.seletectedCollectioName = null;
      state.storageSelection = "chromadb";
    },
  },
});

export const {
  setSelectedCollection,
  setModel,
  setStorage,
  setSelectedCollectionName,
  resetApp,
} = collectionSlice.actions;
export default collectionSlice.reducer;
