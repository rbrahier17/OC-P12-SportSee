import { LineChart, Line, XAxis, YAxis, Rectangle, Tooltip, ResponsiveContainer } from "recharts";
import "./style.css";

/**
 * Create a custom tooltip
 * @param {bool} active - a boolean denoting if a tooltip should be displayed when a user mouses over the chart on desktop
 * @param {array} payload - the data the tooltip will be displaying from the chart
 * @returns CustomTooltip returns a custom tooltip
 */
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='custom-tooltip'>
        <p>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

/**
 * Create a custom cursor
 * @param {array} points - the current position of the cursor coordinate x and y
 * @param {number} width - the width of the graph
 * @returns CustomCursor returns a cursor in the shape of a rectangle in the background
 */
const CustomCursor = ({ points, width }: any) => {
  const { x } = points[0];
  return <Rectangle fill='rgba(0, 0, 0, 0.1)' x={x} width={width} height={400} />;
};

export default function SessionsLineChart({ userAverageSessions }: { userAverageSessions: Array<object> }) {
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
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} wrapperStyle={{ outline: "none" }} />

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
