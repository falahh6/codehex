import Logo from "../../utils/Logo";
import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space } from "antd";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userLogout } from "../../store/auth-slice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectHandler = () => {
    navigate("/");
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let user = useSelector((state) => state.auth.user);

  const emailDomains = [/@gmail\.com$/, /@github\.com$/, /@anjuman\.edu\.in$/];
  for (const domain of emailDomains) {
    if (domain.test(user)) {
      user = user?.replace(domain, "");
      break;
    }
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

      <ul className={styles.authItems}>
        <span>
          {/* <img onClick={themeChangeHandler} src={sunIcon} alt="" /> */}
        </span>
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
            <NavLink to="login"> Login</NavLink>
            <NavLink to={isLoggedIn ? "compiler" : "login"}>
              Get Started
            </NavLink>
          </>
        )}
      </ul>
      <div className={styles.hamburger}>test</div>
    </header>
  );
};

export default Header;
