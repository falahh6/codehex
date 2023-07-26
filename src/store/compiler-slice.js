import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const compilerInitialState = {
  output: "",
  isLoading: false,
};

export const compilerAndRun = createAsyncThunk(
  "compilerSlice/input",
  async ({ Selectedlanguage, extension, userCode, userInput }) => {
    const options = {
      method: "POST",
      url: "https://onecompiler-apis.p.rapidapi.com/api/v1/run",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY_2,
        "X-RapidAPI-Host": "onecompiler-apis.p.rapidapi.com",
      },
      data: {
        language: Selectedlanguage,
        stdin: userInput,
        files: [
          {
            name: "index" + extension,
            content: userCode,
          },
        ],
      },
    };

    try {
      const response = await axios.request(options);
      if (response.data.stderr) {
        return response.data.stderr;
      }
      return response.data.stdout;
    } catch (error) {
      return error.message;
    }
  }
);

const compilerSlice = createSlice({
  name: "openAIAPIrequest",
  initialState: compilerInitialState,
  reducers: {
    resetState: (state, action) => {
      state.output = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(compilerAndRun.fulfilled, (state, action) => {
      state.output = action.payload;
      state.isLoading = false;
      console.log(action.payload);
    });
    builder.addCase(compilerAndRun.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(compilerAndRun.rejected, (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
    });
  },
});

export const compilerActions = compilerSlice.actions;

export default compilerSlice.reducer;
