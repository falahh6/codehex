import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "80c2437ae0msh8b10a7096d8c152p1e04f2jsn9e113e29af91";
const compilerInitialState = {
  output: "",
  alternativeCodeIni: {
    status: "",
    response: "",
  },
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
  async ({ mode, userCode }) => {
    const options = {
      method: "POST",
      url: "https://chatgpt53.p.rapidapi.com/",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "80c2437ae0msh8b10a7096d8c152p1e04f2jsn9e113e29af91",
        "X-RapidAPI-Host": "chatgpt53.p.rapidapi.com",
      },
      data: {
        messages: [
          {
            role: "user",
            content: `${userCode} \n explain the above code`,
          },
        ],
        temperature: 1,
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error(error);
    }
  }
);

const compilerSlice = createSlice({
  name: "openAIAPIrequest",
  initialState: compilerInitialState,
  reducers: {
    resetState: (state, action) => {
      state.alternativeCodeIni = "";
      state.finalOutput = "";
      state.output = "";
    },
  },
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
    builder.addCase(alternativeCode.pending, (state, action) => {
      console.log("response is loading");
    });
    builder.addCase(alternativeCode.fulfilled, (state, action) => {
      console.log(action.payload);
      state.alternativeCodeIni.response = action.payload;
    });
    builder.addCase(alternativeCode.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const compilerActions = compilerSlice.actions;

export default compilerSlice.reducer;
