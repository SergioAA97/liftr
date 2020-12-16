export default {
  saveCoreGoals: (values) => {
    return fetch("/goal/saveCore", {
      method: "post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res, err) => {
      if (!err) {
        if (res.status !== 401) return res.json().then((data) => data);
        else return { message: { msgBody: "Unauthorized" }, msgError: true };
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },
  getAll: () => {
    return fetch("/goal/getAll").then((res, err) => {
      if (!err) {
        if (res.status !== 401) return res.json().then((data) => data);
        else return { message: { msgBody: "Unauthorized" }, msgError: true };
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },
  postCustomGoal: (values) => {
    return fetch("/goal/saveCustom", {
      method: "post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res, err) => {
      if (!err) {
        if (res.status !== 401) return res.json().then((data) => data);
        else return { message: { msgBody: "Unauthorized" }, msgError: true };
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },
  deleteCustomGoal: (name) => {
    return fetch("/goal/delete?name=" + name).then((res, err) => {
      if (!err) {
        if (res.status !== 401) return res.json().then((data) => data);
        else return { message: { msgBody: "Unauthorized" }, msgError: true };
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },
};
