export class UserServiceClient {

  findUserById(userId) {
    return fetch('http://localhost:4000/api/user/' + userId)
      .then(response => response.json());
  }

  login(username, password) {
    const credentials = {
      username: username,
      password: password
    };
    return fetch('http://localhost:4000/api/login', {
      method: 'post',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  update(id, user) {
    console.log("updating user...");
    console.log(user);
    return fetch('http://localhost:4000/api/user/update/' + id, {
      method: 'post',
      body: JSON.stringify(user),
      headers: { 'content-type': 'application/json' },
      credentials: 'include'
    });
  }

  logout() {
    return fetch('http://localhost:4000/api/logout', {
      method: 'post',
      credentials: 'include'
    });
  }

  profile() {
    return fetch('http://localhost:4000/api/profile',
      {
        credentials: 'include', // include, same-origin, *omit
      })
      .then(response => response.json());
  }

  getLoggedInUser() {
    return fetch('http://localhost:4000/api/current', {
      credentials: 'include'
    })
    .then(response => response.json())
    .catch(err => {
      return null;
    })
  }

  createUser(username, password) {
    const user = {
      username: username,
      password: password
    };
    return fetch('http://localhost:4000/api/user', {
      body: JSON.stringify(user),
      credentials: 'include', // include, same-origin, *omit
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .catch(err => null);
  }
}
