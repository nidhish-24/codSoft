import { Briefcase } from "lucide-react";
import moment from "moment";

const JobDashboardCard = ({ job }) => {
  return (
    <div className="relative bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl p-5 flex justify-between items-start shadow-lg hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02]">
      
      {/* Left Section: Icon + Job Info */}
      <div className="flex items-start space-x-4">
        {/* Icon */}
        <div className="p-3 bg-cyan-600/30 rounded-xl flex items-center justify-center">
          <Briefcase className="h-6 w-6 text-cyan-400" />
        </div>

        {/* Job Info */}
        <div>
          <h4 className="text-lg font-bold text-cyan-400 mb-1 hover:text-cyan-300 transition-colors">
            {job.title}
          </h4>
          <p className="text-sm text-gray-400">
            {job.location} · {moment(job.createdAt)?.format("Do MMM YYYY")}
          </p>
        </div>
      </div>

      {/* Right Section: Status */}
      <div>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            job.isClosed
              ? "bg-red-700/30 text-red-400 border border-red-600"
              : "bg-green-700/30 text-green-400 border border-green-600"
          }`}
        >
          {job.isClosed ? "Closed" : "Active"}
        </span>
      </div>
    </div>
  );
};

export default JobDashboardCard;
