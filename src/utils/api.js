
const onResponce = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};


class Api {
  constructor() {
    this._baseUrl = "https://api.react-learning.ru";
    this._headers = {
      "content-type": "application/json",
    };
    this.group = ''
  }

  setGroup(group){
    this.group = group
  }
  getGroup() {
    return this.group
  }

  setToken(token) {
    // добовление токена в headers
    this._headers = {
      "content-type": "application/json",
      Authorization: token,
    };
  }

  getToken() {
    // получение токена из headers
    return this._headers.Authorization;
  }

  getPostsList() {
    // получение всех постов
    return fetch(`${this._baseUrl}/v2/${this.group}/posts`, {
      headers: this._headers,
    }).then(onResponce);
  }

  search(searchQuery, page, limit) {
    //  поиск и настраиваемая пагинация
    const url = `${this._baseUrl}/v2/${this.group}/posts/paginate?page=${page}&limit=${limit}&query=${searchQuery}`;
    return fetch(url, {
      method: "GET",
      headers: this._headers,
    }).then(onResponce);
  }

  addPost(title, text, image, tags) {
    // добавление поста
    const url = `${this._baseUrl}/v2/${this.group}/posts`;
    const body = JSON.stringify({ title, text, image, tags });
    return fetch(url, {
      method: "POST",
      headers: this._headers,
      body: body,
    }).then(onResponce);
  }

  editPost(postId, title, text, image, tags) {
    // редактирование поста
    const url = `${this._baseUrl}/v2/${this.group}/posts/${postId}`;
    const body = JSON.stringify({ title, text, image, tags });
    return fetch(url, {
      method: "PATCH",
      headers: this._headers,
      body: body,
    }).then(onResponce);
  }

  deletePost(Id) {
    // удаление поста
    const url = `${this._baseUrl}/v2/${this.group}/posts/${Id}`;
    return fetch(url, {
      method: "DELETE",
      headers: this._headers,
    }).then(onResponce);
  }

  signIn(email, password) {
    // авторизация
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(onResponce);
  }

  signUp(email, group, password) {
    // регистрация
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, group, password }),
    }).then(onResponce);
  }

  resetPassword(email) {
    // сброс пароля и отправка на указанную почту токена
    return fetch(`${this._baseUrl}/forgot-password`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email }),
    }).then(onResponce);
  }

  changePassword(password, token) {
    // с помощью пришедшего токена , меняем пароль
    return fetch(`${this._baseUrl}/password-reset/${token}`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ password }),
    }).then(onResponce);
  }

  getUserInfo() {
    // получение полной информации о пользователе
    return fetch(`${this._baseUrl}/v2/${this.group}/users/me`, {
      headers: this._headers,
    }).then(onResponce);
  }

  setUserInfo(dataUser) {
    // редактирование информации о пользователе(name, about)
    return fetch(`${this._baseUrl}/v2/${this.group}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(dataUser),
    }).then(onResponce);
  }

  setUserAvatar(avatar) {
    // редактирование аватара
    return fetch(`${this._baseUrl}/v2/${this.group}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(onResponce);
  }

  getPostById(postId) {
    // получение товара по id
    return fetch(`${this._baseUrl}/v2/${this.group}/posts/${postId}`, {
      headers: this._headers,
    }).then(onResponce);
  }

  getPostComments(idProduct) {
    // получение всех коментариев к конкретному посту
    return fetch(`${this._baseUrl}/v2/${this.group}/posts/comments/${idProduct}`, {
      headers: this._headers,
    }).then(onResponce);
  }

  setPostComment(idProduct, data) {
    // написание коментария к конкретному посту
    return fetch(`${this._baseUrl}/v2/${this.group}/posts/comments/${idProduct}`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(onResponce);
  }

  deletePostComment(idProduct, idComment) {
    // удаление коментария к конкретному посту
    return fetch(
      `${this._baseUrl}/v2/${this.group}/posts/comments/${idProduct}/${idComment}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then(onResponce);
  }

  changeLikePost(postId, isLike) {
    // постановка или удаление лайка у конкретного поста в зависимости от isLike
    return fetch(`${this._baseUrl}/v2/${this.group}/posts/likes/${postId}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(onResponce);
  }
}

const api = new Api();

export default api;
