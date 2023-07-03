import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const compilerInitialState = {
  output: "",
  finalOutput: "",
};

export const initialExecutionForInput = createAsyncThunk(
  "compilerSlice/input",
  async ({ Selectedlanguage, extension, userCode, doesProgramNeedsInput }) => {
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
        stdin: "",
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
      if (doesProgramNeedsInput) {
        console.log("input is required");
      }
      return response.data.stdout;
    } catch (error) {
      return error.message;
    }
  }
);

export const compilerOutput = createAsyncThunk(
  "compilerSlice/output",
  async ({
    Selectedlanguage,
    extension,
    userCode,
    newInput,
    doesProgramNeedsInput,
  }) => {
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
        stdin: newInput,
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
      console.log(response.data.stdout);
      if (response.data.stderr === null) {
        return response.data.stdout;
      } else {
        return response.data.stderr;
      }
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
      state.finalOutput = "";
      state.output = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialExecutionForInput.fulfilled, (state, action) => {
      state.output = action.payload;
      console.log(action.payload);
    });
    builder.addCase(initialExecutionForInput.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(compilerOutput.fulfilled, (state, action) => {
      const existingOutput = state.output;
      state.finalOutput = action.payload.replace(
        new RegExp(existingOutput, "g"),
        ""
      );
      console.log(action.payload);
    });
    builder.addCase(compilerOutput.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const compilerActions = compilerSlice.actions;

export default compilerSlice.reducer;
