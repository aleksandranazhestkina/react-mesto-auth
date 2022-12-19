const token = localStorage.getItem("token");

class Api {
  constructor({url}) {
    this._url = url;
  }

  _checkRequestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(
        `Произошла ошибка ${res.status} - ${res.statusText}`
      );
    }
  }
  // Загрузка информации о пользователе

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => this._checkRequestResult(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => this._checkRequestResult(res));
  }

  editProfile(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
    }).then((res) => this._checkRequestResult(res));
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => this._checkRequestResult(res));
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => this._checkRequestResult(res));
  }

  editAvatar(input) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: input.avatar,
      })
    }).then((res) => this._checkRequestResult(res));
  }

  changeLikeCardStatus(card, isLiked) {
    if (!isLiked) {
      return this.addLike(card);
    } else {
      return this.deleteLike(card);
    }
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId._id}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => this._checkRequestResult(res));
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId._id}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => this._checkRequestResult(res));
  }
}

export const api = new Api({
  url: 'https://api.nazhestkina.nomoredomains.club'
  });