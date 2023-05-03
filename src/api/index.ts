// Import API response interfaces
import { IMainDataApiRes, IAverageSessionApiRes, IActivityApiRes, IPerformanceApiRes } from "./interfaces";

// Import models and their interfaces
import { Activity, IActivity } from "../models/Activity";
import { AverageSession, IAverageSession } from "../models/AverageSession";
import { MainData } from "../models/MainData";
import { Performance } from "../models/Performance";

// Import Utils functions to get data
import getApiData from "./utils/getApiData";
import getMockData from "./utils/getMockData";

// Import mocked data
import mockedData from "./mock-data.json";

// Define API endpoints
const API_ENDPOINTS = {
  userMainData: (userId: number) => `/user/${userId}`,
  userActivity: (userId: number) => `/user/${userId}/activity`,
  userAverageSessions: (userId: number) => `/user/${userId}/average-sessions`,
  userPerformance: (userId: number) => `/user/${userId}/performance`,
};

/**
 * Retrieves data from the API or mocked data using a given endpoint and data type.
 *
 * @param { boolean } useApi - A boolean indicating whether to use the API or the mocked data.
 * @param { string } endpoint - The API endpoint to call.
 * @param { number } userId - The ID of the user.
 * @param { any } mockData - The mocked data to use.
 * @returns {Promise<any>} A promise that resolves to the data.
 */
async function getData(useApi: boolean, endpoint: string, userId: number, mockData: any): Promise<any> {
  const data = useApi ? await getApiData(endpoint) : getMockData(mockData, userId);
  return data;
}

/**
 * Retrieves the USER_MAIN_DATA for a user, either from the API or the mocked data.
 *
 * @param { boolean } useApi - A boolean indicating whether to use the API or the mocked data.
 * @param { number } userId - The ID of the user.
 * @returns {Promise<MainData>} A promise that resolves to a user MainData instance.
 */
export async function getUserMainData(useApi: boolean, userId: number): Promise<MainData> {
  const endpoint = API_ENDPOINTS.userMainData(userId);
  const data: IMainDataApiRes = await getData(useApi, endpoint, userId, mockedData.USER_MAIN_DATA);
  const score = data.score ?? data.todayScore;
  return new MainData(data.userInfos, score ?? 0, data.keyData);
}

/**
 * Retrieves the USER_ACTIVITY data, either from the API or the mocked data.
 *
 * @param { boolean } useApi - A boolean indicating whether to use the API or the mocked data.
 * @param { number } userId - The ID of the user.
 * @returns {Promise<Activity[]>}  A promise that resolves to an array of Activity instances.
 */
export async function getUserActivity(useApi: boolean, userId: number): Promise<Activity[]> {
  const endpoint = API_ENDPOINTS.userActivity(userId);
  const data: IActivityApiRes = await getData(useApi, endpoint, userId, mockedData.USER_ACTIVITY);
  return data.sessions.map((s: IActivity) => new Activity(s)) ?? [];
}

/**
 * Retrieves the USER_AVERAGE_SESSIONS data, either from the API or the mocked data.
 *
 * @param { boolean } useApi - A boolean indicating whether to use the API or the mocked data.
 * @param { number } userId - The ID of the user.
 * @returns {Promise<AverageSession[]>}  A promise that resolves to an array of AverageSession instances.
 */
export async function getUserAverageSessions(useApi: boolean, userId: number): Promise<AverageSession[]> {
  const endpoint = API_ENDPOINTS.userAverageSessions(userId);
  const data: IAverageSessionApiRes = await getData(useApi, endpoint, userId, mockedData.USER_AVERAGE_SESSIONS);
  return data.sessions.map((s: IAverageSession) => new AverageSession(s)) ?? [];
}

/**
 * Retrieves the USER_PERFORMANCE data, either from the API or the mocked data.
 *
 * @param { boolean } useApi - A boolean indicating whether to use the API or the mocked data.
 * @param { number } userId - The ID of the user.
 * @returns {Promise<Performance[]>}  A promise that resolves to an array of Performance instances.
 */
export async function getUserPerformance(useApi: boolean, userId: number): Promise<Performance[]> {
  const endpoint = API_ENDPOINTS.userPerformance(userId);
  const data: IPerformanceApiRes = await getData(useApi, endpoint, userId, mockedData.USER_PERFORMANCE);

  return data.data.map((perf) => {
    return new Performance(perf.value, data.kind[perf.kind]);
  });
}