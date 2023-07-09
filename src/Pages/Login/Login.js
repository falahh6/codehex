import styles from "./Login.module.css";
import Logo from "../../assets/images/codehex-logo.svg";
import googleLogo from "../../assets/images/google-logo.png";
import appleLogo from "../../assets/images/apple-logo.png";

const Login = () => {
  return (
    <div className={styles.main}>
      <div>
        <img src={Logo} alt="logo" />
        <h4>Sign In</h4>
        <p>Sign-in to start learning to code!!</p>

        <div className={styles.Dlogin}>
          <button>
            {" "}
            <img src={googleLogo} alt="google-logo" /> login with google
          </button>
          <button>
            {" "}
            <img src={appleLogo} alt="apple-logo" />
            login with Apple
          </button>
        </div>

        <div className={styles.partition}>or</div>

        <form className={styles.form}>
          <label>Email </label>
          <input type="" />

          <label>Password</label>
          <input type="password" />

          <a href="/">forget password?</a>

          <button>Login</button>
        </form>

        <p className={styles.noAccount}>
          Don't have and account? <a href="/">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
