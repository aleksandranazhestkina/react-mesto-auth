export const BASE_URL = "https://auth.nomoreparties.co";

function checkStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Произошла ошибка ${res.status} - ${res.statusText}`);
  }
}

export function login(data) {
  return fetch(`${BASE_URL}/singin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
        email: data.email, 
        password: data.password }),
  }).then((res) => checkStatus(res));
}

export function register(data) {
  return fetch(`${BASE_URL}/singup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
        password: data.password,
        email: data.email
        }),
  }).then((res) => checkStatus(res))
  .then((data) => {
    return data;
  })
}

export function getContent(token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => checkStatus(res))
      .then(data => { 
        return data; 
      }) 
}