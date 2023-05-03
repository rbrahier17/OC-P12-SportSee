import iconYoga from "../../assets/icon-yoga.svg";
import iconSwim from "../../assets/icon-swim.svg";
import iconBike from "../../assets/icon-bike.svg";
import iconWeight from "../../assets/icon-weight.svg";

import "./style.css";

/**
 * Displays a vertical navigation bar with icon links.
 * @returns {JSX.Element} The VerticalNav component.
 */
export default function VerticalNav(): JSX.Element {
  const navItems: { iconSrc: string; path: string }[] = [
    {
      iconSrc: iconYoga,
      path: "/",
    },
    {
      iconSrc: iconSwim,
      path: "/",
    },
    {
      iconSrc: iconBike,
      path: "/",
    },
    {
      iconSrc: iconWeight,
      path: "/",
    },
  ];

  return (
    <div className='VerticalNavContainer'>
      <nav>
        <ul>
          {navItems.map((item, idx) => (
            <li key={"nav-item-" + idx}>
              <a href={item.path}>
                <img src={item.iconSrc} alt='Icône' />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="copyright">Copyright, SportSee 2023</p>
    </div>
  );
}
