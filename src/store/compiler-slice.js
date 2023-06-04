import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { OpenAIApi, Configuration } from "openai";

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

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const alternativeCode = createAsyncThunk(
  "compilerSlice/alternativeCode",
  async () => {
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      max_tokens: 7,
      temperature: 0,
    });

    console.log(response.data);
    // try {
    //   const response = await axios.post(
    //     "https://api.openai.com/v1/engines/davinci-codex/completions",
    //     {
    //       prompt: "write a formal letter asking two days leave",
    //       max_tokens: 100,
    //       temperature: 0.7,
    //       n: 1,
    //       stop: "\n",
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization:
    //           "Bearer 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",
    //       },
    //     }
    //   );

    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
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
      console.log(action.payload);
    });
    builder.addCase(alternativeCode.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const compilerActions = compilerSlice.actions;

export default compilerSlice.reducer;
