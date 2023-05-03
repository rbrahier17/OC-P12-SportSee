import "./style.css";
import logoSVG from "../../assets/logo.svg";
import iconMan from "../../assets/icon-man.svg";
import iconWoman from "../../assets/icon-woman.svg";

import { useState, useEffect } from "react";
import DataSource from "../../components/DataSource";

export default function HomePage() {
  const [useApi, setUseApi] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

    const [isApiTesting, setIsApiTesting] = useState(false);

    const handleApiTesting = (value: boolean) => {
      setIsApiTesting(value);
    }

  useEffect(() => {
    const apiStatus = localStorage.getItem("apiStatus");
    if (apiStatus !== null) {
      setUseApi(JSON.parse(apiStatus));
    } else {
      setUseApi(false);
    }
    setLoading(false);
  }, []);

  const handleDataSourceChange = (value: boolean) => {
    setUseApi(value);
    localStorage.setItem("apiStatus", JSON.stringify(value));
  };

return (
  <div className='HomePage'>
    {loading ? null : (
      <>
        <img src={logoSVG} alt='Logo SportSee' />
        <DataSource
          useApi={useApi!}
          onChangeSource={handleDataSourceChange}
          isApiTesting={isApiTesting!}
          onApiTesting={handleApiTesting}
        />
        <div className='profiles'>
          <h1>Liens vers les profils disponibles</h1>
          <div>
            <a
              href={`${window.location.protocol}//${window.location.host}/profile/12`}
              className={isApiTesting ? "disabled" : ""}
            >
              <img src={iconMan} alt='Icon Man' />
              <span>Karl</span>
            </a>
            <a
              href={`${window.location.protocol}//${window.location.host}/profile/18`}
              className={isApiTesting ? "disabled" : ""}
            >
              <img src={iconWoman} alt='Icon Woman' />
              <span>Cecilia</span>
            </a>
          </div>
        </div>
      </>
    )}
  </div>
);
}
