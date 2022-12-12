class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }
  // _getHeaders() {
  //   const jwt = localStorage.getItem('jwt');
  //   return {
  //     'Authorization': `Bearer ${jwt}`,
  //     ...this._headers,
  //   };
  // }
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
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => this._checkRequestResult(res));
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => this._checkRequestResult(res));
  }

  editProfile(name, job) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => this._checkRequestResult(res));
  }

  editAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
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
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => this._checkRequestResult(res));
  }

  deleteLike(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => this._checkRequestResult(res));
  }
}

export const api = new Api({
  url: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});