export interface IUserInfos {
  firstName: string;
  lastName: string;
  age?: number;
}

export interface IKeyData {
  calorieCount: number;
  proteinCount: number;
  carbohydrateCount: number;
  lipidCount: number;
}

export class MainData {
  _userInfos: IUserInfos;
  _score: number;
  _keyData: IKeyData;

  constructor(userInfos: IUserInfos, score: number, keyData: IKeyData) {
    this._userInfos = userInfos;
    this._score = score;
    this._keyData = keyData;
  }

  get firstName(): string {
    return this._userInfos.firstName;
  }

  get score(): number {
    return this._score;
  }

  get keyData(): IKeyData {
    return this._keyData;
  }
}
