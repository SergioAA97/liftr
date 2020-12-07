export default {
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
  getWorkout: (id) => {
    return fetch("/workout/getWorkout?id="+id, {
      method: "get",
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
  postSession: (session) => {
    return fetch("/workout/post/session", {
      method: "post",
      body: JSON.stringify({...session}),
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
  },
  deleteWorkout: (id) => {
    return fetch("/workout/delete?id=" + id, {
      method: "get",
    })
      .then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "Unauthorized" }, msgError: true };
      })
      .catch(function (error) {});
  },
};
