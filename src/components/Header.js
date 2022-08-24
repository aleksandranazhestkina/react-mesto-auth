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
              to="/sign-in"
              className="header__exit"
              onClick={props.onSingOut}
            >
              Выйти
            </button>
          </div>
        </Route>
        <Route path="/sign-in">
          <Link to="./sign-up" className="header__auth">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="./sign-in" className="header__auth">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
export default Header;
