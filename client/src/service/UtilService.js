export default {
  capitalize: (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  },
  initializeNutrients: (data) => {
    const filter = [
      "energy",
      "fat",
      "fiber",
      "carbohydrate",
      "sugars",
      "sodium",
      "vitaminA",
      "vitaminC",
      "vitaminE",
      "calcium",
    ];
    const kcalGrp = ["energy"];
    const mgGrp = ["vitaminC", "vitaminB", "sodium", "postassium", "calcium"];
    const picoGrp = ["vitaminA", "vitaminE"];

    let nutrients = Object.entries(data).filter((x) => {
      const [key] = x;
      return filter.indexOf(key) !== -1;
    });
    return nutrients.map((x) => {
      let [key, value] = x;
      let unit = "";
      if (kcalGrp.includes(key)) {
        unit = "kcal";
      } else if (picoGrp.includes(key)) {
        unit = "mg";
        value = (value / 1000).toFixed(2);
      } else if (mgGrp.includes(key)) {
        unit = "mg";
      } else {
        unit = "g";
      }

      return { name: key, value, unit };
    });
  },
  updateUserSettings: (values) => {
    return fetch("/diary/updateUserSettings", {
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
  getUserSettings: () => {
    return fetch("/diary/getUserSettings", {
      method: "get",
    }).then((res, err) => {
      if (!err) {
        if (res.status !== 401) return res.json().then((data) => data);
        else return { message: { msgBody: "Unauthorized" }, msgError: true };
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
  },
};
