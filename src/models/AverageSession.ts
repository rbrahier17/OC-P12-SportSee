export interface IAverageSession {
  day: number;
  sessionLength: number;
}

export class AverageSession {
  _day;
  _sessionLength;

  constructor(data: IAverageSession) {
    this._day = data.day;
    this._sessionLength = data.sessionLength;
  }

  get day(): number {
    return this._day;
  }

  get sessionLength(): number {
    return this._sessionLength;
  }
}
