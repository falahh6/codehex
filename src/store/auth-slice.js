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
  async ({ userEmail, userPassword }, { rejectWithValue }) => {
    console.log(userEmail, userPassword, "Login reducer");
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userSignupWithCredentials = createAsyncThunk(
  "authSlice/userSignupWithCredentials",
  async ({ userEmail, userPassword, userName }, { rejectWithValue }) => {
    console.log(userName, userEmail, userPassword);
    try {
      const { data } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
        options: {
          data: {
            name: userName,
          },
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
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
    //check user
    builder.addCase(userAuthCheck.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      console.log(action.payload);
      state.user = action.payload;
      toast.success("User is Logged in");
    });
    builder.addCase(userAuthCheck.rejected, (state, action) => {
      console.log("no user found \n" + action.payload);
    });

    //logout
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      window.location.reload();
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      console.log(action.payload);
    });

    //signup
    builder.addCase(userSignupWithCredentials.fulfilled, (state, action) => {
      // console.log(action.payload.user?.user_metadata.name);
      // state.user = action.payload.user?.user_metadata.name;
      console.log(action.payload);
      toast.success(
        "Thank you for signing up! Please check your email to verify your account and start exploring our platform."
      );
    });
    builder.addCase(userSignupWithCredentials.rejected, (state, action) => {
      console.log(action.payload);
    });

    //login
    builder.addCase(userLoginWithCredentials.fulfilled, (state, action) => {
      console.log(action.payload);

      if (action.payload.user === null) {
        toast.error("User not found, Please Sign in!");
      }
    });
    builder.addCase(userLoginWithCredentials.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
