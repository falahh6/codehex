import styles from "./Login.module.css";
import Logo from "../../assets/images/codehex-logo.svg";

const Login = () => {
  return (
    <div className={styles.main}>
      <div>
        <img src={Logo} alt="logo" />
        <h4>Sign In</h4>
        <p>Sign-in to start learning to code!!</p>
        <form className={styles.form}>
          <label>Email </label>
          <input type="" />

          <label>Password</label>
          <input type="password" />

          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
