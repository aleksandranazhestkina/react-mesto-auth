class Auth {
    constructor(options) {
        this._url = options.url;
    }

    _checkStatus(res) {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(
            `Произошла ошибка ${res.status} - ${res.statusText}`
          );
        }
    };

    login(email, password) {
        return fetch(`${this._url}/singin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
            },
          ).then((res) => this._checkStatus(res));
    };

    register(email, password) {
        return fetch(`${this._url}/singin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
            },
          ).then((res) => this._checkStatus(res));
    };

    getContent = (token) => {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify({email, password})
            },
          ).then((res) => this._checkStatus(res))
          .then(data => { 
            return data;
        })
    }
};

export const auth = new Auth("https://auth.nomoreparties.co");