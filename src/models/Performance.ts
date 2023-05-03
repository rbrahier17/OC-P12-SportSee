export class Performance {
  _value: number;
  _kind: string;

  constructor(value: number, kind:string) {
    this._value = value;
    this._kind = kind;
  }

  get value(): number {
    return this._value;
  }

  get kind(): string {
    return this._kind;
  }
}
