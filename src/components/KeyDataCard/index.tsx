import "./style.css";
import iconCalories from "../../assets/icon-calories.svg";
import iconProteins from "../../assets/icon-proteins.svg";
import iconCarbs from "../../assets/icon-carbs.svg";
import iconFat from "../../assets/icon-fat.svg";

class FormattedData {
  icon: string;
  unit: string;
  title: string;

  constructor(icon: string, unit: string, title: string) {
    this.icon = icon;
    this.unit = unit;
    this.title = title;
  }
}

/**
 * Get the formatted data for a KeyDataCard based on the key data card type
 *
 * @param {string} keyDataCardType - The type of the key data card
 * @returns {FormattedData} The formatted data for the key data card
 */
function getFormattedData(keyDataCardType: string):FormattedData | null {
  switch (keyDataCardType) {
    case "calorieCount":
      return new FormattedData(iconCalories, "kCal", "Calories");
    case "proteinCount":
      return new FormattedData(iconProteins, "g", "Proteines");
    case "carbohydrateCount":
      return new FormattedData(iconCarbs, "g", "Glucides");
    case "lipidCount":
      return new FormattedData(iconFat, "g", "Lipides");
    default: 
      return null
  }
}


/**
 * Displays a KeyDataCard component that presents data related to calories, proteins, carbohydrates, or lipids.
 *
 * @param {Object} props - The props object for the component
 * @param {string} props.keyDataCardType - The type of the key data card
 * @param {number} props.keyDataCardValue - The value of the key data card
 * @returns {JSX.Element} The rendered KeyDataCard component
 */
export default function KeyDataCard({ keyDataCardType, keyDataCardValue }: { keyDataCardType: string; keyDataCardValue: number }) {
  const formattedData = getFormattedData(keyDataCardType);

  if (!formattedData) throw new Error();

  return (
    <li className='KeyDataCard'>
      <article>
        <img src={formattedData.icon} alt={`Icône ${formattedData.title}`} />
        <div>
          <p className='count'>{keyDataCardValue + formattedData.unit}</p>
          <p className='title'>{formattedData.title}</p>
        </div>
      </article>
    </li>
  );
}
