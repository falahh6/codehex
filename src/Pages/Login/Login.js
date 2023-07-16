import { useRef, useState } from "react";
import styles from "./Login.module.css";
import Logo from "../../assets/images/codehex-logo.svg";
import googleLogo from "../../assets/images/google-logo.png";
import githubLogo from "../../assets/images/github-logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  authActions,
  userLoginWithCredentials,
  userSignupWithCredentials,
} from "../../store/auth-slice";
import { Divider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Login = () => {
  const [loginMode, setLoginMode] = useState(true);
  console.log(loginMode);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const isLoading = useSelector((state) => state.auth.isLoading);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const user = useSelector((state) => state.auth.user);

  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    if (!emailError && !passwordError) {
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

      if (isLoggedIn) {
        navigate("/");
      }
    }
  };

  //email handler
  const emailValidationHandler = (e) => {
    const email = e.target.value;

    if (email.includes("@")) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  //password handler
  const passwordValidationHandler = (e) => {
    const password = e.target.value;

    if (password.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
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
              onChange={emailValidationHandler}
              required
            />

            <span>
              {emailError && (
                <p>
                  <FontAwesomeIcon
                    color="rgb(255, 160, 160)"
                    icon={faExclamationCircle}
                    style={{ marginRight: "0.3rem" }}
                  />
                  Please enter the valid email
                </p>
              )}
            </span>

            <label>Password</label>
            <input
              onChange={passwordValidationHandler}
              ref={passwordRef}
              spellCheck={false}
              type="password"
              required
            />
            <span>
              {passwordError && (
                <p>
                  <FontAwesomeIcon
                    color="rgb(255, 160, 160)"
                    icon={faExclamationCircle}
                    style={{ marginRight: "0.3rem" }}
                  />
                  Password should be atleast 8 characters long
                </p>
              )}
            </span>

            {loginMode ? (
              <a title="use Auth0 method (Sign in With Google)" href="/">
                forget password?
              </a>
            ) : null}

            <button onClick={loginWithCredentialsHandler}>
              {isLoading ? (
                <span>
                  <LoadingOutlined style={{ marginRight: "0.5rem" }} />
                </span>
              ) : (
                ""
              )}
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
