import { ResponsiveContainer, Text, RadarChart, Radar, PolarRadiusAxis, PolarGrid, PolarAngleAxis } from "recharts";
import "./style.css";

function translateKind(kind: string) {
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

function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }: any) {
  return (
    <Text {...rest} fill='white' fontSize={13} verticalAnchor='middle' y={y + (y - cy) / 25} x={x + (x - cx) / 25}>
      {payload.value}
    </Text>
  );
}

export default function PerformanceRadarChart({ userPerformance }: { userPerformance: Array<object> }) {
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
