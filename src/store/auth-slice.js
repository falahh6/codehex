import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";
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

export const userLogout = createAsyncThunk("authSlice/userLogout", async () => {
  try {
    await supabase.auth.signOut();
    return true;
  } catch (error) {
    return error.message;
  }
});

export const userLoginWithCredentials = createAsyncThunk(
  "authSlice/userLoginWithCredentials",
  async ({ userEmail, userPassword }) => {
    const { data, error } = await supabase.auth.signUp({
      email: userEmail,
      password: userPassword,
    });

    console.log(data, error);

    toast.success(
      "an Varification Email has been sent to you, Please Confirm to Proceed"
    );
  }
);

const authSlice = createSlice({
  name: "auth-slice",
  initialState: authInitialState,
  reducers: {
    login: (state) => {},

    logout: (state) => {},

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
      toast.success("User is Logged in");
    });
    builder.addCase(userAuthCheck.rejected, (state, action) => {
      console.log("no user found \n" + action.payload);
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      window.location.reload();
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(userLoginWithCredentials.fulfilled, (state, action) => {
      console.log("user is Logged In");
    });
    builder.addCase(userLoginWithCredentials.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
