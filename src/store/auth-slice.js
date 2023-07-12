import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_CLIENT_SECERATE
);

const authInitialState = {
  isLoggedIn: false,
  user: "",
};

export const userAuthCheck = createAsyncThunk(
  "authSlice/userAuthCheck",
  async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      return user.email;
    } else {
      throw new Error();
    }
  }
);

const authSlice = createSlice({
  name: "auth-slice",
  initialState: authInitialState,
  reducers: {
    login: (state) => {},

    logout: (state) => {
      supabase.auth.signOut();
      console.log("user is logged out");
      state.isLoggedIn = false;
    },

    loginWithGoogle: (state) => {
      supabase.auth.signInWithOAuth({
        provider: "google",
      });
      state.isLoggedIn = true;
    },

    loginWithGitHub: (state) => {
      supabase.auth.signInWithOAuth({
        provider: "github",
      });
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userAuthCheck.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(userAuthCheck.rejected, (state, action) => {
      console.log("no user found \n" + action.payload);
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
