import { combineReducers, configureStore } from "@reduxjs/toolkit";

import collectionReduer, { resetApp } from "./slices/collectionSlice";

const reducers = combineReducers({
  collection: collectionReduer,
});

// const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: reducers,
});

export const resetStore = () => {
  store.dispatch(resetApp());
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
