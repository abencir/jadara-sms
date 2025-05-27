import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", students: 10 },
  { month: "Feb", students: 20 },
  { month: "Mar", students: 35 },
  { month: "Apr", students: 50 },
  { month: "May", students: 60 },
  { month: "Jun", students: 70 },
];

export function BarChartComponent() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Registered Students by Month</h3>
      <BarChart width={300} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="students" fill="#4285F4" />
      </BarChart>
    </div>
  );
}