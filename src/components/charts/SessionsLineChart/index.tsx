/**
 * SESSIONS LINE CHART
 */

import { AverageSession } from "../../../models/AverageSession";
import { LineChart, Line, XAxis, YAxis, Rectangle, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import "./style.css";

/**
 * Creates a custom tooltip to be displayed when hovering over a chart item that shows the session duration.
 * @param {Object} props - Props passed to the component
 * @param {boolean} props.active - Whether or not the tooltip is active
 * @param {Array<Object>} props.payload - The data payload of the tooltip
 * @returns {JSX.Element} The tooltip component
 */
const CustomTooltip = ({ active, payload }: TooltipProps<any, any>): React.ReactElement | null => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

interface CustomCursorProps {
  points?: { x?: number; y?: number }[];
  width?: number;
}

/**
 * Creates a custom cursor component that renders a rectangle with a slightly darkened background for the content being hovered on the chart.
 * @param {CustomCursorProps} props - The props passed to the component.
 * @returns {React.ReactElement} The CustomCursor component.
 */
const CustomCursor = ({ points = [{ x: 0, y: 0 }], width = 0 }: CustomCursorProps): React.ReactElement => {
  const { x } = points[0];
  return <Rectangle fill='rgba(0, 0, 0, 0.1)' x={x} width={width} height={400} />;
};


/**
 * Renders a line chart that displays the user's average session duration for each day of the week.
 * @see https://recharts.org/en-US/api/LineChart
 * 
 * @param {Object} props - The component props.
 * @param {Array<AverageSession>} props.userAverageSessions - An array of objects containing the average session duration for each day of the week.
 * @returns {JSX.Element} The SessionsLineChart component.
 */
export default function SessionsLineChart({ userAverageSessions }: { userAverageSessions: Array<AverageSession> }): JSX.Element {
  return (
    <div className='SessionsLineChart'>
      <h2> Durée moyenne des sessions</h2>
      <ResponsiveContainer aspect={1}>
        <LineChart
          style={{ backgroundColor: "#FF0000" }}
          data={userAverageSessions}
          margin={{
            top: 80,
            right: 0,
            left: 0,
            bottom: 35,
          }}
        >
          <XAxis
            style={{ transform: "translateY(-5px) scale(0.9)", transformOrigin: "bottom" }}
            dataKey='day'
            axisLine={false}
            tickLine={false}
            tickMargin={35}
            tick={{ fill: "#FFFFFF", opacity: "0.5" }}
            tickFormatter={(value) => ["L", "M", "M", "J", "V", "S", "D"][value - 1]}
            interval={"preserveStartEnd"}
          />
          <YAxis type='number' hide={true} />
          <Tooltip content={CustomTooltip} cursor={<CustomCursor />} wrapperStyle={{ outline: "none" }} />

          <Line
            type='natural'
            dataKey='sessionLength'
            stroke='white'
            strokeWidth={3}
            dot={false}
            activeDot={{
              fill: "#FFFFFF",
              r: 4,
              strokeWidth: 8,
              strokeOpacity: 0.4,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
