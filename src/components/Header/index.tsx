/**
 * APP HEADER
 */

import "./style.css";
import LogoSVG  from "../../assets/logo.svg";

export default function Header() {

  const navItems = [
    {
      title: "Accueil",
      path: "/",
    },
    {
      title: "Profil",
      path: "/",
    },
    {
      title: "Réglage",
      path: "/",
    },
    {
      title: "Communauté",
      path: "/",
    },
  ];

  return (
    <header className='Header'>
      <a href='/'>
          <img src={LogoSVG} alt="Logo SportSee" />
      </a>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.title}>
              <a href={item.path}>{item.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}