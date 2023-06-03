import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const openAI_API_key = process.env.OPENAI_API_KEY;
const compiler_API_key = process.env.REACT_APP_COMPILER_API;
const compilerInitialState = {
  output: "",
  alternativeCode: "",
};

export const compilerOutput = createAsyncThunk(
  "compilerSlice/output",
  async ({ Selectedlanguage, extension, userCode }) => {
    const options = {
      method: "POST",
      url: "https://onecompiler-apis.p.rapidapi.com/api/v1/run",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": compiler_API_key,
        "X-RapidAPI-Host": "onecompiler-apis.p.rapidapi.com",
      },
      data: {
        language: "javascript",
        stdin: "Peter",
        files: [
          {
            name: "index.js",
            content: userCode,
          },
        ],
      },
    };

    console.log(Selectedlanguage, extension);

    try {
      const response = await axios.request(options);
      console.log(response.data);
      if (response.data.stderr === null) {
        return response.data.stdout;
      } else {
        return response.data.stderr;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const compilerSlice = createSlice({
  name: "openAIAPIrequest",
  initialState: compilerInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(compilerOutput.fulfilled, (state, action) => {
      console.log(action.payload);
      state.output = action.payload;
    });
    builder.addCase(compilerOutput.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});

export const compilerActions = compilerSlice.actions;

export default compilerSlice.reducer;
