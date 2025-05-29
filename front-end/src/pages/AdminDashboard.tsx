import { BarChartComponent } from "../components/BarChartComponent";
import PieChartComponent from "../components/PieChartComponent";
import { IconCard } from "../components/IconCard";
import { Users, Calendar, SwatchBook } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarChartComponent />
        <PieChartComponent />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Link to="/course" className="group transition-all duration-300 hover:scale-[1.02]">
          <IconCard icon={<SwatchBook size={48} />} />
        </Link>
        <Link to='/eventpage' className="group transition-all duration-300 hover:scale-[1.02]">
          <IconCard icon={<Calendar size={48} />} />
        </Link>
      </div>
    </div>
  );
}
