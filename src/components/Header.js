import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import HeaderLogo from "../images/HeaderLogo.svg";


function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" src={HeaderLogo} alt="Место" />
      <Switch>
        <Route exact path="/">
          <div className="header__links">
            <p className="header__email">{props.email}</p>
            <button
              to="/signin"
              className="header__exit"
              onClick={props.onSingOut}
            >
              Выйти
            </button>
          </div>
        </Route>
        <Route path="/signin">
          <Link to="./signup" className="header__auth">
            Регистрация
          </Link>
        </Route>
        <Route path="/signup">
          <Link to="./signin" className="header__auth">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
export default Header;
