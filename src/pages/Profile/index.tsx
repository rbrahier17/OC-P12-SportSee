import "./style.css";

import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MainData } from "../../models/MainData";
import Activity from "../../models/Activity";
import AverageSession from "../../models/AverageSession";
import Performance from "../../models/Performance";
import { Link, useNavigate } from "react-router-dom";

import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance } from "../../api";

import WelcomeMessage from "../../components/WelcomeMessage";
import ActivityBarChart from "../../components/charts/ActivityBarChart";
import SessionsLineChart from "../../components/charts/SessionsLineChart";
import PerformanceRadarChart from "../../components/charts/PerformanceRadarChart";
import ScoreRadialBarChart from "../../components/charts/ScoreRadialBarChart";
import KeyDataCard from "../../components/KeyDataCard";

type UserData = {
  userMainData?: MainData;
  userActivities?: Array<Activity>;
  userAverageSessions?: Array<AverageSession>;
  userPerformance?: Array<Performance>;
};

function App() {
  const userId = Number(useParams().id);
  const [data, setData] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const [useApi] = useState(localStorage.getItem("apiStatus") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const userMainData = await getUserMainData(useApi, userId);
        const userActivities = await getUserActivity(useApi, userId);
        const userAverageSessions = await getUserAverageSessions(useApi, userId);
        const userPerformance = await getUserPerformance(useApi, userId);
        setData({ userMainData, userActivities, userAverageSessions, userPerformance });
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        navigate("/error", { state: { error } });
      }
    })();
  }, []);


function ErrorMessage({ message }: { message: string }) {
  return (
    <div className='ErrorMessage'>
      <p>{message}</p>
      <Link to='/'>Retour à l'accueil</Link>
    </div>
  );
}

// Dans le composant Profil
if (loading) return <p>Loading ....</p>;

  if (!data) {
    return <ErrorMessage message='No data' />;
  }

  if (!data.userMainData) {
    return <ErrorMessage message='No user data' />;
  }

  if (!data.userActivities) {
    return <ErrorMessage message='No user activities' />;
  }

  if (!data.userAverageSessions) {
    return <ErrorMessage message='No user average sessions' />;
  }

  if (!data.userPerformance) {
    return <ErrorMessage message='No user performance' />;
  }

  return (
    <div className='ProfilePage'>
      <WelcomeMessage userFirstName={data.userMainData.firstName} />
      <section className='dashboard'>
        <div className='charts'>
          <div className='top-container'>
            <ActivityBarChart userActivities={data.userActivities} />
          </div>
          <div className='bottom-container'>
            <SessionsLineChart userAverageSessions={data.userAverageSessions} />
            <PerformanceRadarChart userPerformance={data.userPerformance} />
            <ScoreRadialBarChart userScore={data.userMainData.score} />
          </div>
        </div>
        <ul className='key-data-card-list'>
          {Object.keys(data.userMainData.keyData).map((key, i) => {
            return (
              <KeyDataCard
                key={i}
                keyDataCardType={key}
                keyDataCardValue={data.userMainData?.keyData[key as keyof typeof data.userMainData.keyData]}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}
export default App;
