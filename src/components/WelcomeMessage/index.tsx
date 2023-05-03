import './style.css'

/**
 * Displays a welcome message component with user's first name and a message.
 * @param {Object} props - The props object.
 * @param {string} props.userFirstName - The user's first name to be displayed.
 * @returns {JSX.Element} The welcome message component.
 */
export default function WelcomeMessage({ userFirstName }: { userFirstName: string }): JSX.Element {
  return (
    <div className='WelcomeMessage'>
      <h1>
        Bonjour <span>{userFirstName}</span>
      </h1>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
}
