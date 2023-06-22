import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "80c2437ae0msh8b10a7096d8c152p1e04f2jsn9e113e29af91";
const compilerInitialState = {
  output: "",
  alternativeCodeIni: "",
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
        "X-RapidAPI-Key": API_KEY,
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
      return error;
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
        "X-RapidAPI-Key": API_KEY,
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

    console.log(Selectedlanguage, extension, userCode, newInput);

    try {
      const response = await axios.request(options);
      console.log(response.data.stdout);
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

export const alternativeCode = createAsyncThunk(
  "compilerSlice/alternativeCode",
  async () => {
    const options = {
      method: "POST",
      url: "https://chatgpt-gpt4-ai-chatbot.p.rapidapi.com/ask",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "chatgpt-gpt4-ai-chatbot.p.rapidapi.com",
      },
      data: {
        query: `
        explain the below code in bulletpoints :

        #include <stdio.h>
        int main(){
          printf("testing...");
          return 0;
        }
        `,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.response;
    } catch (error) {
      console.error(error);
    }
  }
);

const compilerSlice = createSlice({
  name: "openAIAPIrequest",
  initialState: compilerInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initialExecutionForInput.fulfilled, (state, action) => {
      state.output = action.payload;
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
    });
    builder.addCase(compilerOutput.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(alternativeCode.fulfilled, (state, action) => {
      state.alternativeCodeIni = action.payload;
    });
    builder.addCase(alternativeCode.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const compilerActions = compilerSlice.actions;

export default compilerSlice.reducer;
