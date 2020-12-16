class CustomGoal {
  constructor(jsonDao) {
    this.goalValue = jsonDao.goalValue;
    this.startDate = new Date(jsonDao.startDate);
    this.endDate = new Date(jsonDao.endDate);
    this.active = new Date(Date.now()) <= new Date(jsonDao.endDate);
  }

  get isActive() {
    return this.active;
  }

  getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    let ret = new Date(d.setDate(diff));
    ret.setHours(0);
    ret.setMinutes(0);
    ret.setSeconds(0);
    return ret;
  }
}

export class WeightGoal extends CustomGoal {
  constructor(jsonDao) {
    super(jsonDao);
  }

  get isActive() {
    return super.isActive;
  }

  get obj() {
    return {
      name: "Weight goal",
      goalValue: this.goalValue,
      startDate: this.startDate,
      endDate: this.endDate,
      active: this.active,
    };
  }
}

export class CardioWeekGoal extends CustomGoal {
  constructor(jsonDao) {
    super(jsonDao);
  }

  get isActive() {
    return super.isActive;
  }

  currentValue(sessions) {
    if (!sessions || !this.isActive) return;
    if (!Array.isArray(sessions)) return;
    let startDate = super.getMonday(new Date());
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    let weekValues = [];
    let weekSessions = sessions.filter((x) => {
      let startTime = new Date(x.timeStart);
      let endTime = new Date(x.timeEnd);

      if (x.workout) {
        if (x.workout.type === "Anaerobic") return false;
      } else {
        return false;
      }

      if (+startTime >= +startDate && +endTime <= +endDate) {
        weekValues.push((endTime.getTime() - startTime.getTime()) / 60000);
        return true;
      }
      return false;
    });
    console.log(weekSessions, weekValues);
    return weekValues.length > 0 ? weekValues.reduce((a, b) => a + b, 0) : 0;
  }

  get obj() {
    return {
      name: "Hours of cardio per week",
      goalValue: this.goalValue,
      startDate: this.startDate,
      endDate: this.endDate,
      active: this.active,
    };
  }
}

export class WeightWeekGoal extends CustomGoal {
  constructor(jsonDao) {
    super(jsonDao);
  }

  get isActive() {
    return super.isActive;
  }

  currentValue(sessions) {
    if (!sessions || !this.isActive) return;
    if (!Array.isArray(sessions)) return;
    let startDate = super.getMonday(new Date());
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    let weekValues = [];
    let weekSessions = sessions.filter((x) => {
      let startTime = new Date(x.timeStart);
      let endTime = new Date(x.timeEnd);

      if (x.workout) {
        if (x.workout.type === "Aerobic") return false;
      } else {
        return false;
      }
      if (+startTime >= +startDate && +endTime <= +endDate) {
        weekValues.push((endTime.getTime() - startTime.getTime()) / 60000);
        return true;
      }
      return false;
    });
    console.log(
      "HOURS OF CARDIO",
      weekSessions,
      weekValues,
      weekValues.length > 0
    );
    return weekValues.length > 0 ? weekValues.reduce((a, b) => a + b, 0) : 0;
  }

  get obj() {
    return {
      name: "Hours of cardio per week",
      goalValue: this.goalValue,
      startDate: this.startDate,
      endDate: this.endDate,
      active: this.active,
    };
  }
}
