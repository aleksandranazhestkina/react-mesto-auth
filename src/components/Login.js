import React from "react";

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleLoginSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        } props.onLogin(email, password);
        setEmail('');
        setPassword('');
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }
    return (
        <section className="login">
            <h1 className="login__title">Вход</h1>
            <form className="login__form" onSubmit={handleLoginSubmit}>
                <input className="login__input" placeholder="Еmail" type="email" onChange={handleEmail}/>
                <input className="login__input" placeholder="Пароль" type="password" onChange={handlePassword}/>
                <button className="login__button" type="submit">Войти</button>
            </form>
        </section>
    )
}

export default Login;