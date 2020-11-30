export default {
  getToday: () => {
    return fetch("/diary/today", {
      method: "get",
    }).then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  getAll: () => {
    return fetch("/workout/all", {
      method: "get",
    })
      .then((res) => {
        if (res.status !== 401)
          return res.json().then((data) => data);
        else return { message: { msgBody: "Unauthorized" }, msgError: true };
      })
      .catch(function (error) {});
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
  postWorkout: (workout) => {
    return fetch("/workout/post/workout", {
      method: "post",
      body: JSON.stringify({...workout, def: false}),
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
  exerciseSearch: (searchText) => {
    return fetch("/workout/searchExercise", {
      method: "post",
      body: JSON.stringify(searchText),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => {
          return data;
        });
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  getMuscleGroups: () =>{
    return fetch("/workout/exerciseMuscles", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => {
          return data;
        });
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  },
  getExercises: () =>{
    return fetch("/workout/exercises", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => {
          return data;
        });
      } else return { message: { msgBody: "Unauthorized" }, msgError: true };
    });
  }
};
