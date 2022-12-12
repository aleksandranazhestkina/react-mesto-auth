class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }
  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
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
      headers: this._getHeaders()
    }).then((res) => this._checkRequestResult(res));
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._getHeaders()
    }).then((res) => this._checkRequestResult(res));
  }

  editProfile(name, job) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        about: job
      })
    }).then((res) => this._checkRequestResult(res));
  }

  addNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => this._checkRequestResult(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    }).then((res) => this._checkRequestResult(res));
  }

  editAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
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
      headers: this._getHeaders()
    }).then((res) => this._checkRequestResult(res));
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders()
    }).then((res) => this._checkRequestResult(res));
  }
}

export const api = new Api({
  url: 'https://api.nazhestkina.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json'
  }
});