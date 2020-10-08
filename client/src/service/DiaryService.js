export default {
  getToday: () => {
    return fetch("/diary/today", {
      method: "get",
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { err: true };
    });
  },
};
