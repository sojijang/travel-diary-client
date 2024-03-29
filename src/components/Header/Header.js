import "./Header.scss";
import { Link } from "react-router-dom";
import LogoIcon from "../../assets/icons/writing_5560402.svg";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Header({ setCurrentUser, setIsLoggedin, isLoggedin }) {
  const location = useLocation();
  const hideHeaderForPaths = ["/", "/login", "/signup"];

  const handleLogout = (event) => {
    event.preventDefault();

    localStorage.removeItem("token");
    setIsLoggedin(false);
    setCurrentUser(null);

    alert("You have been successfully logged out");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    }
  }, [setIsLoggedin, setCurrentUser]);

  if (hideHeaderForPaths.includes(location.pathname)) {
    return <></>;
  }
  return (
    <header className="header">
      <div className="header__wrapper">
        <Link className="header__link" to="/dashboard">
          <img className="header__image" src={LogoIcon} alt="Logo icon" />
        </Link>
        {isLoggedin ? (
          <button className="header__button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="header__link" to="/login">
            <button className="header__button">Login</button>
          </Link>
        )}
      </div>
    </header>
  );
}
