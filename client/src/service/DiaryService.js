export default {
  getToday: () => {
    return fetch("/diary/today", {
      method: "get",
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  postEntry: (entry) => {
    return fetch("/diary/post", {
      method: "post",
      body: JSON.stringify(entry),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
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
        return res.json().then((data) => data);
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
};
