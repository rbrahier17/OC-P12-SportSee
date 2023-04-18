import { useState, useEffect } from "react";
import "./style.css";
import iconCloud from "../../assets/icon-cloud.svg";
import iconCloudOff from "../../assets/icon-cloud-off.svg";
import iconError from "../../assets/icon-error.svg";
import LoadingSpinner from "../LoadingSpinner";
const apiUrl = process.env.REACT_APP_API_URL;

type DataSourceProps = {
  useApi: boolean;
  onChangeSource: (value: boolean) => void;
  isApiTesting: boolean;
  onApiTesting: (value: boolean) => void;
};

export default function DataSource(props: DataSourceProps) {
  const { useApi, onChangeSource } = props;
  const { isApiTesting, onApiTesting } = props;
  const [hasApiError, setHasApiError] = useState(false);

  function handleClickApi() {
    setHasApiError(false);
    testApi();
  }

  function testApi() {
    onApiTesting(true);
    setHasApiError(false);
    fetch(`${apiUrl}/user/12`)
      .then((response) => {
        if (response.ok) {
          onApiTesting(false);
          onChangeSource(true);
        } else {
          onApiTesting(false);
          setHasApiError(true);
          onChangeSource(false);
        }
      })
      .catch(() => {
        onApiTesting(false);
        setHasApiError(true);
        onChangeSource(false);
      });
  }

  useEffect(() => {
    if (useApi) {
      onApiTesting(true);
      testApi();
    }
  }, []);

  return (
    <section className='DataSource'>
      <h1>Source des données</h1>
      <div className='data-source-buttons'>
        <button
          className={`data-source-button${!useApi ? " active" : ""}`}
          onClick={() => onChangeSource(false)}
          disabled={isApiTesting}
        >
          <img src={iconCloudOff} alt='Mock' />
          <span>MOCK</span>
        </button>
        <button
          className={`data-source-button${useApi ? " active" : ""}`}
          onClick={handleClickApi}
          disabled={isApiTesting}
        >
          {isApiTesting ? (
            <LoadingSpinner color='#E60000' />
          ) : hasApiError ? (
            <img src={iconError} alt='Error' />
          ) : (
            <img src={iconCloud} alt='API' />
          )}
          <span>API</span>
        </button>
      </div>
      {hasApiError && (
        <div className="error">
          Échec du test de communication avec l'API <div>URL testée: {apiUrl}/user/12</div>
        </div>
      )}
    </section>
  );
}
