import React from "react";
import Yes from "../images/Yes.svg";
import No from "../images/No.svg";

function InfoTooltip(props) {
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
            <div className="popup__container popup__container_check">
                <button className="popup__button-close" type="button" onClick={props.onClose}/>
                <div className="popup__body popup__body_check">
                    <img className="popup__image" src={props.RegistrationIn ? Yes : No}/>
                    <p className="popup__text">{props.RegistrationIn 
                    ? 'Вы успешно зарегистрировались!'
                    : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                </div>
            </div>
        </section>
    )
}

export default InfoTooltip;