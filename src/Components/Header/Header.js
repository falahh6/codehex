import Logo from "../../utils/Logo";
import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Space, Drawer, Divider } from "antd";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userLogout } from "../../store/auth-slice";
import { Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirectHandler = () => {
    navigate("/");
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  let user = useSelector((state) => state.auth.user);

  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const hamburgerClickHandler = () => {
    setDrawerOpen(true);
    console.log("testing drawer");
  };

  const drawerCloseHandler = () => {
    setDrawerOpen(false);
  };

  return (
    <header className={styles.header}>
      <Drawer
        className={styles.drawer}
        title="Login / Sign up"
        placement={"top"}
        closable={true}
        onClose={drawerCloseHandler}
        open={drawerOpen}
        key={"placement"}
        height={"20vh"}
      >
        <p>test</p>
        {/* <Divider /> */}
        <p>Get Started</p>
      </Drawer>
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
      <div className={styles.hamburger} onClick={hamburgerClickHandler}>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
