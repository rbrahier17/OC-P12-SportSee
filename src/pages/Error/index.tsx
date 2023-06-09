import "./style.css";
import Header from "../../components/Header";
import { Link, useLocation } from "react-router-dom";

/**
 * ErrorPage component displays an error message and the option to go back to the home page.
 * 
 * @returns {JSX.Element} ErrorPage component.
 */
export default function ErrorPage(): JSX.Element {
  const location = useLocation();
  const error = location.state?.error;
  const status = error?.status;

  if (!error) {
    return <div>Une erreur s'est produite</div>;
  }

  return (
    <div className='Error-page'>
      <Header />
      <main className='Error-content'>
        <h1>Erreur</h1>
        {status && <p>Code d'erreur : {status}</p>}
        <p>{error.message}</p>
        <Link to='/'>Retour à l'accueil</Link>
      </main>
    </div>
  );
}
