import React from "react";
import { Link } from 'react-router-dom';

function Register(props) {

    return (
        <section className="login">
            <h1 className="login__title">Регистрация</h1>
            <form className="login__form">
                <input className="login__input" placeholder="Еmail" type="email"/>
                <input className="login__input" placeholder="Пароль" type="password"/>
                <button className="login__button login__button_register">Зарегистрироваться</button> 
            </form>
            <Link className="login__span">Уже зарегистрированы? Войти</Link>
        </section>
    )
}

export default Register;