export default {
  getToday: () => {
    return fetch("/diary/today", {
      method: "get",
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  getAll: (callback) => {
    fetch("/diary/today", {
      method: "get",
    })
      .then((res) => {
        if (res.status !== 401)
          return res.json().then((data) => callback(data));
        else return { message: { msgBody: "Unauthorized" }, msgError: true };
      })
      .catch(function (error) {});
  },
  getEntry: (id, callback) => {
    fetch("/diary/entry?id=" + id, {
      method: "get",
    })
      .then((res) => {
        if (res.status !== 401)
          return res.json().then((data) => callback(data));
        else return { message: { msgBody: "Unauthorized" }, msgError: true };
      })
      .catch((err) => {
        return err;
      });
  },
  postEntry: (entry) => {
    return fetch("/diary/post", {
      method: "post",
      body: JSON.stringify(entry),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "Unauthorized" }, msgError: true };
      })
      .catch(function (error) {console.log(error)});
  },
  deleteEntry: (id) => {
    return fetch("/diary/delete?id=" + id, {
      method: "get",
    })
      .then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "Unauthorized" }, msgError: true };
      })
      .catch(function (error) {});
  },
  foodSearch: (searchText) => {
    return fetch("/diary/searchFood", {
      method: "post",
      body: JSON.stringify(searchText),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => {
          console.log(data);
          return data;
        });
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
};
