import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-background">
            <img
              className="profile__avatar"
              alt="Аватар"
              src={currentUser.avatar}
            />
            <button
              className="profile__button-avatar"
              type="button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__edit-title">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__button-edit"
                type="button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__cards">
          {props.cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;