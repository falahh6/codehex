import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Configuration, OpenAIApi } from "openai";
// import { config } from "dotenv";

const configuration = new Configuration({
  organization: "org-vBr2OjQTvBZS9SFiOOkOiDSj",
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const initialState = {
  alternativeCodeIni: {
    status: "",
    response: "",
  },
  codeExplanationIni: {
    status: "",
    response: "",
  },
};

export const alternativeCode = createAsyncThunk(
  "openAISlice/alternativeCode",
  async ({ mode, userCode }) => {
    // const options = {
    //   method: "POST",
    //   url: "https://chatgpt53.p.rapidapi.com/",
    //   headers: {
    //     "content-type": "application/json",
    //     "X-RapidAPI-Key": "80c2437ae0msh8b10a7096d8c152p1e04f2jsn9e113e29af91",
    //     "X-RapidAPI-Host": "chatgpt53.p.rapidapi.com",
    //   },
    //   data: {
    //     messages: [
    //       {
    //         role: "user",
    //         content: `${userCode} \n Given the following code snippet, provide an alternative implementation that achieves the same functionality. with little explanation`,
    //       },
    //     ],
    //     temperature: 1,
    //   },
    // };

    // try {
    //   const response = await axios.request(options);
    //   return response.data.choices[0].message.content;
    // } catch (error) {
    //   console.error(error);
    // }

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
    // const options = {
    //   method: "POST",
    //   url: "https://chatgpt53.p.rapidapi.com/",
    //   headers: {
    //     "content-type": "application/json",
    //     "X-RapidAPI-Key": "80c2437ae0msh8b10a7096d8c152p1e04f2jsn9e113e29af91",
    //     "X-RapidAPI-Host": "chatgpt53.p.rapidapi.com",
    //   },
    //   data: {
    //     messages: [
    //       {
    //         role: "user",
    //         content: `${userCode} \n Given the following code snippet, provide me the generic explanation of the code.`,
    //       },
    //     ],
    //     temperature: 1,
    //   },
    // };

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

const OpenAISlice = createSlice({
  name: "openai-slice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(alternativeCode.fulfilled, (state, action) => {
      state.alternativeCodeIni.response = action.payload;
      console.log(action.payload);
    });
    builder.addCase(alternativeCode.pending, (state, action) => {
      console.log("alternative code on the way");
    });
    builder.addCase(alternativeCode.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(codeExplanation.fulfilled, (state, action) => {
      console.log(action.payload);
      state.codeExplanationIni.response = action.payload;
    });
    builder.addCase(codeExplanation.pending, (state, action) => {
      console.log("code explanation on the way");
    });
    builder.addCase(codeExplanation.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const OpenAIActions = OpenAISlice.actions;
export default OpenAISlice.reducer;
