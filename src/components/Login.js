import React from "react";

function Login(props) {

    return (
        <section className="login">
            <h1 className="login__title">Вход</h1>
            <form className="login__form">
                <input className="login__input" placeholder="Еmail" type="email"/>
                <input className="login__input" placeholder="Пароль" type="password"/>
                <button className="login__button">Войти</button>
            </form>
        </section>
    )
}

export default Login;