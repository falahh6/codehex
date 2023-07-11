import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import compilerSlice from "./compiler-slice";
import openaiSlice from "./openai-slice";
const store = configureStore({
  reducer: { compiler: compilerSlice, openai: openaiSlice, auth: authSlice },
});

export default store;
