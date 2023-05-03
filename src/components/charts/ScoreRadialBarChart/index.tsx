/**
 * SCORE RADIAL BAR CHART
 */

import { ResponsiveContainer, PolarAngleAxis, RadialBarChart, RadialBar } from "recharts";
import "./style.css";

/**
 * Displays the user score (percentage) in a radial bar chart.
 * @see https://recharts.org/en-US/api/RadialBarChart
 * 
 * @param {object} props - The component props.
 * @param {number} props.userScore - The user's score to display.
 * @returns {JSX.Element} - The JSX element to render.
 */
export default function ScoreRadialBarChart({ userScore }: { userScore: number }): JSX.Element {
  const formattedData = [
    {
      value: userScore * 100,
    },
  ];

  return (
    <div className='ScoreRadialBarChart'>
      <ResponsiveContainer aspect={1}>
        <RadialBarChart
          style={{ backgroundColor: "#FBFBFB", borderRadius: "5px" }}
          innerRadius={80}
          barSize={10}
          data={formattedData}
          startAngle={90}
          endAngle={450}
        >
          <text x='8%' y='11%' dominantBaseline='middle' fill='#20253A' style={{ fontWeight: 500 }}>
            Score
          </text>

          <circle cx='50%' cy='50%' fill='white' r='80'></circle>

          <PolarAngleAxis type='number' domain={[0, 100]} angleAxisId={1} tick={false} />

          <RadialBar dataKey='value' angleAxisId={1} fill='#FF0101' cornerRadius='8' data={[formattedData[0]]} />

          <text fontWeight='700' fontSize={26} fill='#282D30' x='50%' y='48%' textAnchor='middle'>
            {`${formattedData[0].value}`}%
          </text>

          <text className='graphTitle' fontWeight='500' fill='#74798C' x='50%' y='55%' textAnchor='middle'>
            de votre
          </text>

          <text className='graphTitle' fontWeight='500' fill='#74798C' x='50%' y='61%' textAnchor='middle'>
            objectif
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
