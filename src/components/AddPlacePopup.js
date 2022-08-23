import PopupWithForm from "./PopupWithForm";
import React from "react";


function AddPlacePopup(props) {
    const [name, setName] = React.useState("");
    const [link, setLink] = React.useState("");

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link
        });
    }

    React.useEffect(
        () => {
            setName('');
            setLink('');
        }, [props.isOpen]
    );

    return (
        <PopupWithForm
            title="Новое место"
            name="card"
            formName="card-form"
            buttonTitle="Создать"
            submitName="card-submit"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    value={name}
                    onChange={handleChangeName}
                    id="card-name"
                    className="popup__input popup__input_card_name"
                    type="text"
                    placeholder="Название"
                    name="title"
                    required
                    minLength="2"
                    maxLength="30"
                />
                <span className="error" id="card-name-error"></span>
            </label>
            <label className="popup__field">
                <input
                    value={link}
                    onChange={handleChangeLink}
                    id="card-link"
                    className="popup__input popup__input_card_link"
                    type="url"
                    placeholder="Ссылка на картинку"
                    name="image"
                    required
                />
                <span className="error" id="card-link-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;