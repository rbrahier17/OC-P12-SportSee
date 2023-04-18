import axios from "axios";
import Activity from "../models/Activity";
import AverageSession from "../models/AverageSession";
import { MainData } from "../models/MainData";
import Performance from "../models/Performance";
import mockedData from "./mock-data.json";
import { type } from "os";

const apiUrl = process.env.REACT_APP_API_URL;

async function getApiData(endpoint: string): Promise<any> {
  try {
    const response = await axios.get(apiUrl + endpoint);
    if (!response.data.data) {
      throw new Error("Données non reçues de l'API");
    }
    return response.data.data;
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      throw new Error("Impossible de se connecter à l'API.");
    }
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error("Les données du profil demandé sont introuvables par l'API.");
      } else {
        throw new Error(
          `Erreur HTTP ${error.response.status} lors de la récupération des données depuis l'API : ${error.response.data.message}`
        );
      }
    } else {
      console.error(error);
      throw new Error(`Une erreur est survenue lors de la récupération des données depuis l'API : ${error.message}`);
    }
  }
}

function getMockData(mockedDataArray: any[], userId: number): any {
  if (Number.isNaN(userId)) {
    throw new Error(`L'identifiant utilisateur saisi ne respecte pas le format correct`);
  }
  const mockData = mockedDataArray.find((el) => el.userId === userId);
  if (!mockData) {
    throw new Error(`Les données du profil "${userId}" sont introuvables par le MOCK API`);
  }
  return mockData;
}

export async function getUserMainData(useApi: boolean, userId: number) {
  const data = useApi ? await getApiData(`/user/${userId}`) : getMockData(mockedData.USER_MAIN_DATA, userId);
  return new MainData(data.userInfos, data.todayScore ?? data.score, data.keyData);
}

export async function getUserActivity(useApi: boolean, userId: number) {
  const data = useApi ? await getApiData(`/user/${userId}/activity`) : getMockData(mockedData.USER_ACTIVITY, userId);

  return data?.sessions.map((s: any) => new Activity(s.day, s.kilogram, s.calories)) ?? [];
}

export async function getUserAverageSessions(useApi: boolean, userId: number) {
  const data = useApi
    ? await getApiData(`/user/${userId}/average-sessions`)
    : getMockData(mockedData.USER_AVERAGE_SESSIONS, userId);

  return data?.sessions.map((s: any) => new AverageSession(s.day, s.sessionLength)) ?? [];
}

interface performanceKind {
  [key: number]: string;
}

export async function getUserPerformance(useApi: boolean, userId: number) {
  const data = useApi
    ? await getApiData(`/user/${userId}/performance`)
    : getMockData(mockedData.USER_PERFORMANCE, userId);

  const performanceKinds: performanceKind = data?.kind;

  return data.data.map((perf: any) => new Performance(perf.value, performanceKinds[perf.kind]));
}
