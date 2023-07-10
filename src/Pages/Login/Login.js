import { useState } from "react";
import styles from "./Login.module.css";
import Logo from "../../assets/images/codehex-logo.svg";
import googleLogo from "../../assets/images/google-logo.png";
import appleLogo from "../../assets/images/apple-logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://ufddgfehydaxupoezqri.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmZGRnZmVoeWRheHVwb2V6cXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg1Njc4NDcsImV4cCI6MjAwNDE0Mzg0N30.8F-wgfNdtG6SZZBS_ObdqGKKauF5XiwUmwERO0eJG1A"
);

const Login = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loginMode, setLoginMode] = useState(true);

  const signinGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const changeAuthMode = () => {
    setLoginMode((prevState) => !prevState);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className={styles.main}
      >
        <Helmet>
          <title>codehex - login</title>
        </Helmet>
        <div>
          <NavLink className={styles.goBack} to="/">
            {"< go back"}
          </NavLink>
          <img src={Logo} alt="logo" />
          <h4>{loginMode ? "Log in" : "Sign up"}</h4>
          <p>
            {loginMode
              ? "Welcome back, Coder!!"
              : "Start learning code with AI"}
          </p>

          <div className={styles.Dlogin}>
            <button onClick={signinGoogle}>
              {" "}
              <img src={googleLogo} alt="google-logo" />{" "}
              {loginMode ? "Log in" : "Sign up"} with google
            </button>
            <button>
              {" "}
              <img src={appleLogo} alt="apple-logo" />
              {loginMode ? "Log in" : "Sign up"} with Apple
            </button>
          </div>

          <div className={styles.partition}>or</div>

          <form className={styles.form}>
            {loginMode === false && (
              <>
                <label>Username</label>
                <input type="text" />
              </>
            )}

            <label>Email </label>
            <input type="email" />

            <label>Password</label>
            <input type="password" />

            <a href="/">forget password?</a>

            <button>Login</button>
          </form>

          <p className={styles.noAccount}>
            Don't have and account?{" "}
            <span onClick={changeAuthMode}>Sign Up</span>
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
