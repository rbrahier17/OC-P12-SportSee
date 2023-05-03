/**
 * ACTIVITY BAR CHART
 */

import { Activity } from "../../../models/Activity";

import {
  BarChart,
  Rectangle,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import "./style.css";


/**
 * Returns the number of ticks on the Y axis of the chart
 * @param {Array<Activity>} data - The activity data to be displayed on the chart
 * @returns {number} The number of ticks to be displayed on the Y axis
 */
function getTickCount(data: any): number {
  const maxTickValue = Math.max(...data.map((session: any) => session.kilogram)) + 1;
  const minTickValue = Math.min(...data.map((session: any) => session.kilogram)) - 1;
  return maxTickValue - minTickValue + 1;
}


/**
 * Custom tooltip to be displayed when hovering over a chart item, which shows the values for both kCal and Kg.
 * @param {Object} props - Props passed to the component
 * @param {boolean} props.active - Whether or not the tooltip is active
 * @param {Array<Object>} props.payload - The data payload of the tooltip
 * @returns {JSX.Element} The tooltip component
 */
const CustomTooltip = ({ active, payload }: TooltipProps<any, any>): React.ReactElement | null => {
  // Check if the tooltip is active and if there is payload data available
  if (active && payload && payload.length) {
    // Extract the data from the payload
    const data = payload[0].payload;
    // Render the custom tooltip with the data
    return (
      <div className='custom-tooltip'>
        <p>{data.kilogram}kg</p>
        <p>{data.calories}Kcal</p>
      </div>
    );
  }
  // If there is no active tooltip or no payload data available, return null
  return null;
};


interface CustomCursorProps {
  x?: number;
  y?: number;
  height?: number;
}

/**
 * Custom cursor component render a rectangle with a slightly darkened background for the content being hovered on the chart
 * @param {CustomCursorProps} props - Props passed to the component
 * @returns {React.ReactElement} The CustomCursor component
 */
const CustomCursor = ({ x = 0, y = 0, height = 0 }: CustomCursorProps): React.ReactElement => {
  return <Rectangle fill='rgba(0, 0, 0, 0.1)' x={x - 27} y={y} width={50} height={height} />;
};


/**
 * Renders a bar chart of user's daily activity and tracks their weight and calories burned after each session.
 * @param {Object} props - The props object.
 * @param {Array<Activity>} props.userActivities - An array of user activity objects.
 * @returns {React.ReactElement} The ActivityBarChart component.
 */
export default function ActivityBarChart({ userActivities }: { userActivities: Array<Activity> }): React.ReactElement {
  return (
    <ResponsiveContainer className='ActivityBarChart' aspect={2.62}>
      <BarChart
        data={userActivities}
        margin={{
          top: 50,
          right: 30,
          left: 30,
          bottom: 23,
        }}
        barSize={7}
        barGap={8}
      >
        <text x={20} y={26} textAnchor='start' dominantBaseline='hanging'>
          Activité quotidienne
        </text>
        <Legend
          align='right'
          verticalAlign='top'
          height={50}
          wrapperStyle={{
            top: 24,
            right: 14,
            fontSize: 14,
          }}
          iconSize={12}
          iconType='circle'
          formatter={(value) => (value === "kilogram" ? "Poids (kg)" : "Calories brûlées (kCal)")}
        />
        <XAxis
          dataKey={({ day }) => new Date(day).getUTCDate()}
          scale='point'
          padding={{ left: 12, right: 10 }}
          tickLine={false}
          tickMargin={20}
        />
        <YAxis
          orientation='right'
          yAxisId='right'
          domain={["dataMin - 1", "dataMax + 1"]}
          allowDataOverflow={true}
          axisLine={false}
          tickLine={false}
          tickMargin={45}
          tickCount={getTickCount(userActivities)}
        />
        <YAxis yAxisId='left' hide={true} />
        <Tooltip content={CustomTooltip} cursor={<CustomCursor />} wrapperStyle={{ outline: "none" }} />
        <CartesianGrid strokeDasharray='3 3' vertical={false} />
        <Bar dataKey='kilogram' yAxisId='right' fill='#282D30' radius={[3, 3, 0, 0]} />
        <Bar dataKey='calories' yAxisId='left' fill='#E60000' radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
