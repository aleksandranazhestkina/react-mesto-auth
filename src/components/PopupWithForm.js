import React from "react";

function PopupWithForm(props) {

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) { props.onClose() };
  }

  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`} onClick={handleOverlayClick}>
      <div className="popup__container">
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
        <div className="popup__body">
          <h3 className="popup__title">{props.title}</h3>
          <form
            onSubmit={props.onSubmit}
            id={props.formName}
            className="popup__form"
            name={props.name}>
            {props.children}
            <button id={props.submitName} className="popup__button-save" type="submit">
              {props.buttonTitle}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;