import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleRegisterSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return
    }
    props.onRegistration(email, password);
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  return (
    <section className="login">
      <h1 className="login__title">Регистрация</h1>
      <form className="login__form" onSubmit={handleRegisterSubmit}>
        <input
          className="login__input"
          placeholder="Еmail"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
          required
        />
        <input
          className="login__input"
          placeholder="Пароль"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
          required
        />
        <button className="login__button login__button_register" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link className="login__span" to={"/signin"}>
        Уже зарегистрированы? Войти
      </Link>
    </section>
  );
}

export default Register;