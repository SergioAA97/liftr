import DBService from "./DBService";

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
    DBService.db({ dbName: "foodDb", osName: "food" }, (db) => {
      let tr = db.transaction("food", "readwrite");
      let osFood = tr.objectStore("food");

      let req = osFood.get(id);

      req.onsuccess = function () {
        callback(req.result);
      };

      req.onerror = function () {
        console.log("Error", req.error);
      };
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
