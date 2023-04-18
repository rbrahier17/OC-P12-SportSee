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

function getFormattedData(keyDataCardType: string) {
  switch (keyDataCardType) {
    case "calorieCount":
      return new FormattedData(iconCalories, "kCal", "Calories");
    case "proteinCount":
      return new FormattedData(iconProteins, "g", "Proteines");
    case "carbohydrateCount":
      return new FormattedData(iconCarbs, "g", "Glucides");
    case "lipidCount":
      return new FormattedData(iconFat, "g", "Lipides");
  }
}

export default function KeyDataCard({ keyDataCardType, keyDataCardValue }: { keyDataCardType: string; keyDataCardValue: any }) {
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
