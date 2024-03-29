export default {
  login: (user) => {
    return fetch("/user/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else
        return {
          isAuthenticated: false,
          user: { username: "", role: "" },
          message: { msgError: true, msgBody: "Wrong username or password" },
        };
    });
  },
  register: (user) => {
    return fetch("/user/signup", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  logout: () => {
    return fetch("/user/logout")
      .then((res) => res.json())
      .then((data) => data);
  },
  isAuthenticated: () => {
    return fetch("/user/authenticated").then((res) => {
      if (res.status !== 401 && res.status !== 500)
        return res.json().then((data) => data);
      else if (res.status === 500) {
        return {
          isAuthenticated: false,
          user: { username: "", role: "", error: true },
        };
      }
      return {
        isAuthenticated: false,
        user: { username: "", role: "" },
      };
    });
  },
};
