import Logo from "../../utils/Logo";
import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from "antd";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { userLogout } from "../../store/auth-slice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectHandler = () => {
    navigate("/");
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let user = useSelector((state) => state.auth.user);

  if (user.includes("@gmail.com")) {
    user = user?.replace("@gmail.com", "");
  } else if (user.includes("@github.com")) {
    user = user?.replace("@github.com", "");
  }

  const logoutUser = () => {
    dispatch(userLogout());
  };

  const items = [
    {
      key: "1",
      label: (
        <div onClick={logoutUser}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <span style={{ paddingLeft: "8px" }}>Log out</span>
        </div>
      ),
    },
  ];
  return (
    <header className={styles.header}>
      <Logo redirect={redirectHandler} />
      <ul className={styles.mainItems}>
        {/* <Link to="/features">
          <li>Features</li>
        </Link> */}
        {/* <li>About</li> */}
        <li>
          {" "}
          {/* <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="developer"
          >
            Developed by
          </NavLink> */}
        </li>
      </ul>
      <ul className={styles.authItems}>
        {isLoggedIn ? (
          <>
            <Dropdown
              overlayClassName={styles.dropdownOverlay}
              menu={{ items }}
            >
              <Space className={styles.dropdownSpace}>
                <FontAwesomeIcon icon={faUser} />
                {user}
              </Space>
            </Dropdown>
          </>
        ) : (
          <>
            <NavLink to="login">Login</NavLink>
            <NavLink to="sign-up">Get Started</NavLink>
          </>
        )}
      </ul>
      <div className={styles.hamburger}>test</div>
    </header>
  );
};

export default Header;
