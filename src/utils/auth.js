export const BASE_URL = "https://api.nazhestkina.nomoredomains.club";

function checkStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Произошла ошибка ${res.status} - ${res.statusText}`)
  }
}

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => checkStatus(res))
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => checkStatus(res))
    .then((data) => {
      return data;
    })
}

export function getContent(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  })
    .then((res) => checkStatus(res))
    .then((data) => {
      return data;
    })
}