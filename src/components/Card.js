import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner === currentUser._id;

    const cardDeleteButtonClassName = (
        `element__basket ${isOwn ? 'element__basket_visible' : 'element__basket_hidden'}`
    );

    const isLiked = props.card.likes.some(like => like === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like ${isLiked && 'element__like_active'}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    return (
        <li className="element">
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <button className="element__image_button" type="button">
                <img
                    className="element__image"
                    src={props.card.link}
                    alt={props.card.name}
                    onClick={handleClick}
                />
            </button>
            <div className="element__text">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <span className="element__like-number">
                        {props.card.likes.length}
                    </span>
                </div>
            </div>
        </li>
    )
}

export default Card;