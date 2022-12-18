import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import "../index.css";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { api } from "../utils/Api.js";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [RegistrationIn, setRegistrationIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();
  const token  = localStorage.getItem("token");
  
  React.useEffect(() => {
    checkToken()
  }, []);

  function checkToken() {
    if (token) {
      auth
        .getContent(token)
        .then((data) => {
          setEmail(data.email)
          setIsLoggedIn(true)
          history.push("/")
        })
        .catch((err) => {
          history.push("/signin")
          console.log(err)
        });
    }
  }

  React.useEffect(() => {
    
    if (isLoggedIn)
       Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          console.log(user);
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => console.log(err));
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (!isLiked) {
      api.addLike(card)
        .then(newCard => {
          setCards(state => state.map(c => c._id === card._id ? newCard : c))
        })
        .catch(err => console.log(err))
      } else {
        api.deleteLike(card)
        .then(newCard => {
          setCards(state => state.map(c => c._id === card._id ? newCard : c))
        })
        .catch(err => console.log(err))
      }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(info) {
    api
      .editProfile(info)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar(input) {
    api
      .editAvatar(input)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
      });
  }

  function onRegistration(email, password) {
    return auth
      .register(email, password)
      .then(() => {
        setRegistrationIn(true);
        setIsInfoTooltipOpen(true);
        history.push("/signin");
      })
      .catch((err) => {
        setRegistrationIn(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function onLogin(email, password) {
    return auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token)
          setIsLoggedIn(true)
          history.push("/")
          setEmail(data.email)
        }
      })
      .catch((err) => {
        setRegistrationIn(false)
        setIsInfoTooltipOpen(true)
        console.log(err)
      });
  }

  // React.useEffect(() => {
  //   if (isLoggedIn) {
  //     history.push("/")
  //   }
  // }, [isLoggedIn]);

  function onSignOut() {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    history.push("/signin")
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} email={email} onSingOut={onSignOut} />

        <Switch>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          <Route path="/signup">
            <Register onRegistration={onRegistration} />
          </Route>
          <ProtectedRoute
            path="/"
            component={Main}
            isLoggedIn={isLoggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
        </Switch>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="delete"
          formName="confirm-form"
          buttonTitle="Да"
          submitName="button-yes"
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          RegistrationIn={RegistrationIn}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
