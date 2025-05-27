import { BarChartComponent } from "../components/BarChartComponent";
import PieChartComponent from "../components/PieChartComponent";
import { IconCard } from "../components/IconCard";
import { Users, Calendar } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChartComponent />
        <PieChartComponent />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <IconCard icon={<Users size={48} />} />
        <IconCard icon={<Calendar size={48} />} />
      </div>
    </div>
  );
}