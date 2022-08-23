import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="profile"
            formName="profile-form"
            buttonTitle="Сохранить"
            submitName="profile-submit"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    value={name || ""}
                    onChange={handleChangeName}
                    id="profile-name"
                    className="popup__input popup__input_name"
                    type="text"
                    placeholder="Имя"
                    name="name"
                    required
                    minLength="2"
                    maxLength="40"
                />
                <span className="error" id="profile-name-error"></span>
            </label>
            <label className="popup__field">
                <input
                    value={description || ""}
                    onChange={handleChangeDescription}
                    id="profile-about"
                    className="popup__input popup__input_about"
                    type="text"
                    placeholder="О себе"
                    name="job"
                    required
                    minLength="2"
                    maxLength="200"
                />
                <span className="error" id="profile-about-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;