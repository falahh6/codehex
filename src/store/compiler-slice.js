import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "80c2437ae0msh8b10a7096d8c152p1e04f2jsn9e113e29af91";
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
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "onecompiler-apis.p.rapidapi.com",
      },
      data: {
        language: Selectedlanguage,
        stdin: "Peter",
        files: [
          {
            name: "index" + extension,
            content: userCode,
          },
        ],
      },
    };

    console.log(Selectedlanguage, extension, userCode);

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
        write the same code for with intendation in ReactJS :

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
    builder.addCase(compilerOutput.fulfilled, (state, action) => {
      console.log(action.payload);
      state.output = action.payload;
    });
    builder.addCase(compilerOutput.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(alternativeCode.fulfilled, (state, action) => {
      state.alternativeCode = action.payload;
    });
    builder.addCase(alternativeCode.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const compilerActions = compilerSlice.actions;

export default compilerSlice.reducer;
