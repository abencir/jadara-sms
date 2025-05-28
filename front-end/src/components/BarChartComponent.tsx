import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  month: string;
  students: number;
};

export function BarChartComponent() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/dashboard/monthly-students", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setData(json); 
      })
      .catch((err) => {
        console.error("Error fetching chart data:", err);
      });
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center mt-4 md:mt-12 px-4">
      <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-gray-700">
        Registered Students by Month
      </h3>
      <div className="w-full max-w-[500px]">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="students" fill="#4285F4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
