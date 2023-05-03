/**
 * This file contains interfaces that define the shape of the data returned by the API
 * (or by the mock), for the different endpoints: Main Data, Average Sessions, Activity, and Performance.
 */

import { IAverageSession } from "../models/AverageSession";
import { IUserInfos, IKeyData } from "../models/MainData";
import { IActivity } from "../models/Activity";

// MAIN DATA
export interface IMainDataApiRes {
  id?: number;
  userId?: number;
  userInfos: IUserInfos;
  todayScore?: number;
  score?: number;
  keyData: IKeyData;
}

// AVERAGE SESSIONS
export interface IAverageSessionApiRes {
  userId: number;
  sessions: IAverageSession[];
}

// ACTIVITY
export interface IActivityApiRes {
  userId: number;
  sessions: IActivity[];
}

// PERFORMANCE
export interface IPerformanceApiRes {
  userId: number;
  kind: {
    [key: number]: string;
  };
  data: {
    value: number;
    kind: number;
  }[];
}
