import { useState } from "react";
import styles from "./Login.module.css";
import Logo from "../../assets/images/codehex-logo.svg";
import googleLogo from "../../assets/images/google-logo.png";
import appleLogo from "../../assets/images/apple-logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useEffect } from "react";

const Login = () => {
  const [loginMode, setLoginMode] = useState(true);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const signinGoogle = () => {
    dispatch(authActions.loginWithGoogle());
  };

  const changeAuthMode = () => {
    setLoginMode((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(isLoggedIn);
  });

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
                <motion.label
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  Username
                </motion.label>
                <motion.input
                  type="text"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </>
            )}

            <label>Email </label>
            <input type="email" />

            <label>Password</label>
            <input type="password" />

            {loginMode ? <a href="/">forget password?</a> : null}

            <button>Login</button>
          </form>

          <p className={styles.noAccount}>
            Don't have and account?{" "}
            <span onClick={changeAuthMode}>
              {loginMode ? "Sign up" : "Log in"}
            </span>
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
