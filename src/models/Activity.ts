export interface IActivity {
  day: string;
  kilogram: number;
  calories: number;
}

export class Activity {
  _day: string;
  _kilogram: number;
  _calories: number;

  constructor(data: IActivity) {
    this._day = data.day;
    this._kilogram = data.kilogram;
    this._calories = data.calories;
  }

  get day(): string {
    return this._day;
  }

  get kilogram(): number {
    return this._kilogram;
  }

  get calories(): number {
    return this._calories;
  }
}
