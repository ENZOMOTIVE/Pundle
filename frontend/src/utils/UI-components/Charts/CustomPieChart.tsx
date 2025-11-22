import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface PieData {
  name: string;
  value: number;
}

const data: PieData[] = [
  { name: "Healthy", value: 70 },   // example health factor
  { name: "Risk", value: 30 },
];

const COLORS = ["#16a34a", "#dc2626"]; // Green for healthy, red for risk

export default function HealthFactorDonut({ healthFactor = 70 }: { healthFactor?: number }) {
  const risk = 100 - healthFactor;
  const chartData = [
    { name: "Healthy", value: healthFactor },
    { name: "Risk", value: risk },
  ];

  return (
    <div className="w-40 h-40 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            startAngle={90}
            endAngle={-270} // ensures clockwise from top
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Percentage in the middle */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-black">
        <span className="text-xl font-bold">{healthFactor}%</span>
        <span className="text-xs">Health Factor</span>
      </div>
    </div>
  );
}
