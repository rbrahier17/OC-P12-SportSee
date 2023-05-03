import "./style.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import models
import { MainData } from "../../models/MainData";
import { Activity } from "../../models/Activity";
import { AverageSession } from "../../models/AverageSession";
import { Performance } from "../../models/Performance";

// Import API methods
import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance } from "../../api";

// Import components
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

/**
 * Renders an error message.
 * @param message - The error message to be displayed.
 * @returns The JSX.Element of the error message.
 */
function ErrorMessage({ message }: { message: string }): JSX.Element {
  return (
    <div className='ErrorMessage'>
      <p>{message}</p>
      <Link to='/'>Retour à l'accueil</Link>
    </div>
  );
}

/**
 * Render the profile page of a user. 
 * This component displays a dashboard of analytics for the user, including various charts and visualizations. 
 * The user's data is obtained using API calls (or mocked data) based on the user ID parameter in the URL.
 * If an error occurs while retrieving the data, the component navigates to an error page.
 * If no error occurs during fetching, but there is no data or some data is missing, an error message will be displayed directly on the page.
 * @returns {JSX.Element} The profile page component.
 */
export default function ProfilePage(): JSX.Element {
  const userId = Number(useParams().id);
  const [data, setData] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const [useApi] = useState(localStorage.getItem("apiStatus") === "true");
  const navigate = useNavigate();

  /**
   * Fetch the user data and update the state.
   */
  useEffect(() => {
    (async () => {
      try {
        const userMainData: MainData = await getUserMainData(useApi, userId);
        const userActivities: Activity[] = await getUserActivity(useApi, userId);
        const userAverageSessions: AverageSession[] = await getUserAverageSessions(useApi, userId);
        const userPerformance: Performance[] = await getUserPerformance(useApi, userId);
        setData({ userMainData, userActivities, userAverageSessions, userPerformance });
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        navigate("/error", { state: { error } });
      }
    })();
  }, []);

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
                keyDataCardValue={data.userMainData?.keyData[key as keyof typeof data.userMainData.keyData]!}
              />
            );
          })}
        </ul>
      </section>
    </div>
  );
}
