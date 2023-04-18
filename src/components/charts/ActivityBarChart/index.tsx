import { BarChart, Rectangle, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./style.css";
import { useParams } from "react-router-dom";

function getTickCount(data: any): number {
  const maxTickValue = Math.max(...data.map((session: any) => session.kilogram)) + 1;
  const minTickValue = Math.min(...data.map((session: any) => session.kilogram)) - 1;
  return maxTickValue - minTickValue + 1;
}

const CustomTooltip:any = ({ active, payload, label }:any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className='custom-tooltip'>
        <p>{data.kilogram}kg</p>
        <p>{data.calories}Kcal</p>
      </div>
    );
  }
}


const CustomCursor = (data: any) => {
  return <Rectangle fill='rgba(0, 0, 0, 0.1)' x={data.x - 27} y={data.y} width={50} height={data.height} />;
};

export default function ActivityBarChart({ userActivities }: { userActivities: Array<object> }) {
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
          dataKey={({day}) => new Date(day).getUTCDate()}
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
