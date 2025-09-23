import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import clusterReducer from "./clusterSlice";
import navReducer from "./navSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    cluster: clusterReducer,
    navigation: navReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
