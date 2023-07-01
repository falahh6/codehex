import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  alternativeCodeIni: {
    status: "",
    response: "",
  },
  codeExplanation: {
    status: "",
    response: "",
  },
};

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
            content: `${userCode} \n Given the following code snippet, provide an alternative implementation that achieves the same functionality. with little explanation`,
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

const OpenAISlice = createSlice({
  name: "openai-slice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(alternativeCode.fulfilled, (state, action) => {
      state.alternativeCodeIni.response = action.payload;
    });
    builder.addCase(alternativeCode.pending, (state, action) => {
      state.alternativeCodeIni.status = "loading...";
    });
    builder.addCase(alternativeCode.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const OpenAIActions = OpenAISlice.actions;
export default OpenAISlice.reducer;
