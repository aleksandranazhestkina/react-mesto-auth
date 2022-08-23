import React from "react";

function ImagePopup(props) {

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) { props.onClose() };
  }
  return (
    <div className={`popup popup_type_image ${props.isOpen && "popup_opened"}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <button
          className="popup__button-close popup__button-close_image"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__body popup__body_image">
          <img className="popup__card-image" src={props.card.link} alt={props.card.name} />
          <h3 className="popup__subtitle">{props.card.name}</h3>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup;