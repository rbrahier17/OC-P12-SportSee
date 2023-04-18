export class UserInfos  {
  firstName: string = '';
  lastName?: string;
  age?: number;
};

export class KeyData {
  calorieCount?: number;
  proteinCount?: number;
  carbohydrateCount?: number;
  lipidCount?: number;
};

export class MainData {
  userInfos: UserInfos;
  score: number;
  keyData: KeyData;

  constructor(userInfos: UserInfos, score: number, keyData: KeyData) {
    this.userInfos = userInfos;
    this.score = score;
    this.keyData = keyData;
  }

  get firstName() {
    return this.userInfos.firstName
  }
}
