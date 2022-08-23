import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    React.useEffect(
        () => {
            avatarRef.current.value = '';
        }, [props.isOpen]
    );

    return (
        <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            formName="avatar-form"
            buttonTitle="Сохранить"
            submitName="avatar-submit"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    ref={avatarRef}
                    id="avatar"
                    className="popup__input popup__input_avatar"
                    type="url"
                    placeholder="Ссылка на фотографию"
                    name="avatar"
                    required
                />
                <span className="error" id="avatar-error"></span>
            </label>
        </PopupWithForm>)
}

export default EditAvatarPopup;