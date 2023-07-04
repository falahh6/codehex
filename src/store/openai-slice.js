import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-vBr2OjQTvBZS9SFiOOkOiDSj",
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const initialState = {
  alternativeCodeIni: {
    status: "idle",
    response: "",
  },
  codeExplanationIni: {
    status: "idle",
    response: "",
  },
  errorDnFIni: {
    status: "idle",
    response: "",
  },
};

export const alternativeCode = createAsyncThunk(
  "openAISlice/alternativeCode",
  async ({ mode, userCode }) => {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${userCode} \n Given the following code snippet, provide an alternative implementation that achieves the same functionality. with little explanation`,
          },
        ],
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      return error.message;
    }
  }
);

export const codeExplanation = createAsyncThunk(
  "OpenAISlice/codeExplanation",
  async ({ userCode }) => {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${userCode} \n Given the following code snippet, provide me the generic explanation of the code.`,
          },
        ],
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      return error.message;
    }
  }
);

export const errorDnF = createAsyncThunk(
  "OpenAISlice/errorDnF",
  async ({ userCode }) => {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `${userCode} \n Given the following code snippet, Check if the code has any errors and list the errors with response fixed code snippet .`,
          },
        ],
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      return error.message;
    }
  }
);

const OpenAISlice = createSlice({
  name: "openai-slice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(alternativeCode.pending, (state, action) => {
      console.log("alt code on the way");
      state.alternativeCodeIni.status = "pending";
    });
    builder.addCase(alternativeCode.fulfilled, (state, action) => {
      state.alternativeCodeIni.response = action.payload;
      state.alternativeCodeIni.status = "fulfilled";
    });
    builder.addCase(alternativeCode.rejected, (state, action) => {
      console.log(action.payload);
      state.alternativeCodeIni.status = "rejected";
    });
    builder.addCase(codeExplanation.pending, (state, action) => {
      console.log("code explanation on the way");
      state.codeExplanationIni.status = "pending";
      console.log(action.payload);
    });
    builder.addCase(codeExplanation.fulfilled, (state, action) => {
      console.log(action.payload);
      state.codeExplanationIni.response = action.payload;
      state.codeExplanationIni.status = "fullfilled";
    });
    builder.addCase(codeExplanation.rejected, (state, action) => {
      console.log(action.payload);
      state.codeExplanationIni.status = "rejected";
    });
    builder.addCase(errorDnF.pending, (state, action) => {
      state.errorDnFIni.status = "pending";
    });
    builder.addCase(errorDnF.fulfilled, (state, action) => {
      state.errorDnFIni.status = "fullfilled";
      state.errorDnFIni.response = action.payload;
    });
    builder.addCase(errorDnF.rejected, (state, action) => {
      state.errorDnFIni.status = "rejected";
    });
  },
});

export const OpenAIActions = OpenAISlice.actions;
export default OpenAISlice.reducer;
