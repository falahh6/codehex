import { configureStore } from "@reduxjs/toolkit";
import compilerSlice from "./compiler-slice";

const store = configureStore({
  reducer: { compiler: compilerSlice },
});

export default store;
