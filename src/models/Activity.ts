export default class Activity {
  day: string;
  kilogram: number;
  calories: number;

  constructor(day: string, kilogram: number, calories: number) {
    this.day = day;
    this.kilogram = kilogram;
    this.calories = calories;
  }

  get formattedDay() {
    return new Date(this.day)
  }
}


