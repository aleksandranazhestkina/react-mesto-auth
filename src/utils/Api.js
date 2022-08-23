class Api {
  constructor(options) {
    this._url = options.url;
    this._token = options.token;
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
    return fetch(`${this._url}users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._checkRequestResult(res));
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._checkRequestResult(res));
  }

  editProfile(name, job) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    }).then((res) => this._checkRequestResult(res));
  }

  addNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => this._checkRequestResult(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    }).then((res) => this._checkRequestResult(res));
  }

  editAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    }).then((res) => this._checkRequestResult(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }

  addLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    }).then((res) => this._checkRequestResult(res));
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    }).then((res) => this._checkRequestResult(res));
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-44/',
  token: 'd2530845-e697-44f9-b4fb-404b485e2dca',
  'Content-Type': 'application/json'
});