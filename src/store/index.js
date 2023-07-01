import { configureStore } from "@reduxjs/toolkit";
import compilerSlice from "./compiler-slice";
import openaiSlice from "./openai-slice";
const store = configureStore({
  reducer: { compiler: compilerSlice, openai: openaiSlice },
});

export default store;
