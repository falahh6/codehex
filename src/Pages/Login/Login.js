import { useRef, useState } from "react";
import styles from "./Login.module.css";
import Logo from "../../assets/images/codehex-logo.svg";
import googleLogo from "../../assets/images/google-logo.png";
import githubLogo from "../../assets/images/github-logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authActions,
  userLoginWithCredentials,
  userSignupWithCredentials,
} from "../../store/auth-slice";
import { useEffect } from "react";
import { Divider } from "antd";
const Login = () => {
  const [loginMode, setLoginMode] = useState(true);
  console.log(loginMode);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const signinGoogle = () => {
    dispatch(authActions.loginWithGoogle());
  };

  const signinGithub = () => {
    dispatch(authActions.loginWithGitHub());
  };

  const changeAuthMode = () => {
    setLoginMode((prevState) => !prevState);
  };

  const loginWithCredentialsHandler = (event) => {
    event.preventDefault();
    const userEmail = emailRef.current.value;
    const userPassword = passwordRef.current.value;

    if (loginMode) {
      dispatch(userLoginWithCredentials({ userEmail, userPassword }));
    } else {
      const userName = nameRef.current.value;
      dispatch(
        userSignupWithCredentials({ userName, userEmail, userPassword })
      );
      nameRef.current.value = "";
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
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
              {loginMode ? "Log in" : "Sign up"} with Google
            </button>
            <button onClick={signinGithub}>
              {" "}
              <img src={githubLogo} alt="github-logo" />
              {loginMode ? "Log in" : "Sign up"} with GitHub
            </button>
          </div>

          <Divider style={{ fontSize: "12px" }}>or</Divider>

          <form className={styles.form}>
            {!loginMode && (
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
                  ref={nameRef}
                  type="text"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  spellCheck={false}
                />
              </>
            )}

            <label>Email </label>
            <input
              ref={emailRef}
              spellCheck={false}
              autoComplete="false"
              type="email"
            />
            <span>{emailError}</span>

            <label>Password</label>
            <input ref={passwordRef} spellCheck={false} type="password" />

            {loginMode ? (
              <a title="use Auth0 method (Sign in With Google)" href="/">
                forget password?
              </a>
            ) : null}

            <button onClick={loginWithCredentialsHandler}>
              {loginMode ? "Login" : "Sign up"}
            </button>
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
