import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  codeRefactorIni: {
    status: "idle",
    response: "",
  },
  codeTranslationIni: {
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
            content: `Provide me the alternative code for the following code and the functionality remains same
           ${userCode}
            the output should be : a little explanation with code wrapped with three backticks`,
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
            content: `Provide me the code explanation for the following code
            ${userCode}
            the output should be : a minimal high quality explanation`,
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
            content: `Given the following code, detect if the code has any errors and provide me the fix of the every error , if the code does not have any errors then respond with only 'code is correct ;) '
            ${userCode}    
            the output should be : the code snippets where the code has error and potential fixes with little high quality information
            note that the code should be wrappen within three backticks`,
          },
        ],
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      return error.message;
    }
  }
);

export const codeRefactor = createAsyncThunk(
  "OpenAISlice/codeRefactor",
  async ({ userCode }) => {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Given the following code, refactor the code with the best practices used to write the given code.
            ${userCode}
            the output should be : a refactored code and the statements what all have been refactored`,
          },
        ],
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      return error.message;
    }
  }
);

export const codeTranslation = createAsyncThunk(
  "OpenAISlice/codeTranslation",
  async ({ userCode, toLangauge }) => {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Given the following code, translate the code into ${toLangauge}
            ${userCode}
            the output should be : only the translated code with no explanation or statements `,
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
      state.alternativeCodeIni.response = "";
      state.alternativeCodeIni.status = "pending";
    });
    builder.addCase(alternativeCode.fulfilled, (state, action) => {
      state.alternativeCodeIni.response = action.payload;
      console.log(action.payload);
      state.alternativeCodeIni.status = "done";
    });
    builder.addCase(alternativeCode.rejected, (state, action) => {
      console.log(action.payload);
      state.alternativeCodeIni.status = "rejected";
    });
    builder.addCase(codeExplanation.pending, (state, action) => {
      state.codeExplanationIni.response = "";
      state.codeExplanationIni.status = "pending";
    });
    builder.addCase(codeExplanation.fulfilled, (state, action) => {
      console.log(action.payload);
      state.codeExplanationIni.response = action.payload;
      state.codeExplanationIni.status = "done";
    });
    builder.addCase(codeExplanation.rejected, (state, action) => {
      console.log(action.payload);
      state.codeExplanationIni.status = "rejected";
    });
    builder.addCase(errorDnF.pending, (state, action) => {
      state.errorDnFIni.response = "";
      state.errorDnFIni.status = "pending";
    });
    builder.addCase(errorDnF.fulfilled, (state, action) => {
      state.errorDnFIni.status = "fullfilled";
      state.errorDnFIni.response = action.payload;
      console.log(action.payload);
    });
    builder.addCase(errorDnF.rejected, (state, action) => {
      state.errorDnFIni.status = "rejected";
    });
    builder.addCase(codeRefactor.pending, (state, action) => {
      state.codeRefactorIni.response = "";
      state.codeRefactorIni.status = "pending";
    });
    builder.addCase(codeRefactor.fulfilled, (state, action) => {
      state.codeRefactorIni.status = "fullfilled";
      state.codeRefactorIni.response = action.payload;
      console.log(action.payload);
    });
    builder.addCase(codeRefactor.rejected, (state, action) => {
      state.codeRefactorIni.status = "rejected";
    });

    builder.addCase(codeTranslation.pending, (state, action) => {
      state.codeTranslationIni.response = "";
      state.codeTranslationIni.status = "pending";
    });
    builder.addCase(codeTranslation.fulfilled, (state, action) => {
      state.codeTranslationIni.status = "fullfilled";
      state.codeTranslationIni.response = action.payload;
      console.log(action.payload);
    });
    builder.addCase(codeTranslation.rejected, (state, action) => {
      state.codeTranslationIni.status = "rejected";
    });
  },
});

export const OpenAIActions = OpenAISlice.actions;
export default OpenAISlice.reducer;
