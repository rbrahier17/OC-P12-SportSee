import './style.css'

export default function WelcomeMessage({ userFirstName }: { userFirstName: string }) {
  return (
    <div className='WelcomeMessage'>
      <h1>
        Bonjour <span>{userFirstName}</span>
      </h1>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
}
