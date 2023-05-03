/**
 * PERFORMANCE RADAR CHART
 */

import { ResponsiveContainer, Text, RadarChart, Radar, PolarRadiusAxis, PolarGrid, PolarAngleAxis } from "recharts";
import "./style.css";
import { Performance } from "../../../models/Performance";

/**
 * Translates a string value representing a performance category into its corresponding French translation.
 * @param {string} kind - The string value representing the performance category.
 * @returns {string} The French translation of the performance category.
 */
function translateKind(kind: string): string {
  switch (kind) {
    case "cardio":
      return "Cardio";
    case "energy":
      return "Energie";
    case "endurance":
      return "Endurance";
    case "strength":
      return "Force";
    case "speed":
      return "Vitesse";
    case "intensity":
      return "Intensité";
    default:
      return "unknown kind";
  }
}

interface Payload {
  coordinate: number;
  index: number;
  offset: number;
  value: string;
}

interface RenderPolarAngleAxisProps {
  payload: Payload;
  x: number;
  y: number;
  cx: number;
  cy: number;
  className: string;
  orientation: string;
  textAnchor: "end" | "middle" | "start" | "inherit" | undefined;
}

/**
 * Renders a polar angle axis component to display the title of the data.
 * Polar angle axis represents the angular coordinates of the data points on the chart.
 * @see https://recharts.org/en-US/api/PolarAngleAxis
 * 
 * @param {RenderPolarAngleAxisProps} props - The props object for the component.
 * @param {Payload} props.payload - An object containing text value that will be rendered.
 * @param {number} props.x - X-coordinate of the component.
 * @param {number} props.y - Y-coordinate of the component.
 * @param {number} props.cx - X-coordinate of the center of the polar chart.
 * @param {number} props.cy - Y-coordinate of the center of the polar chart.
 * @param {string} props.className - CSS class
 * @param {string} props.orientation - Orientation of the component.
 * @param {"end" | "middle" | "start" | "inherit" | undefined} props.textAnchor - The position of the text anchor.
 *
 * @returns {JSX.Element} The rendered polar angle axis component.
 */
function renderPolarAngleAxis({
  payload,
  x,
  y,
  cx,
  cy,
  className,
  orientation,
  textAnchor,
}: RenderPolarAngleAxisProps) {
  return (
    <Text
      className={className}
      orientation={orientation}
      textAnchor={textAnchor}
      fill='white'
      fontSize={13}
      verticalAnchor='middle'
      y={y + (y - cy) / 25}
      x={x + (x - cx) / 25}
    >
      {payload.value}
    </Text>
  );
}

/**
 * Displays a radar chart of user performance.
 * @see https://recharts.org/en-US/api/RadarChart
 * 
 * @param {Array<object>} userPerformance - The user performance data to be displayed.
 * @returns {JSX.Element} The radar chart component.
 */
export default function PerformanceRadarChart({
  userPerformance,
}: {
  userPerformance: Array<Performance>;
}): JSX.Element {
  return (
    <div className='PerformanceRadarChart'>
      <ResponsiveContainer aspect={1}>
        <RadarChart
          margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
          style={{ backgroundColor: "#282D30" }}
          data={userPerformance.reverse()}
        >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis
            dataKey={({ kind }) => translateKind(kind)}
            tickLine={false}
            axisLine={false}
            stroke='white'
            tick={(props) => renderPolarAngleAxis(props)}
          />
          <PolarRadiusAxis tick={false} tickCount={6} axisLine={false} />
          <Radar dataKey='value' fill='#FF0101' fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
