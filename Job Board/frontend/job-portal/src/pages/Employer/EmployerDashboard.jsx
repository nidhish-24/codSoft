import { useEffect, useState } from "react";
import { Plus, Briefcase, Building2, CheckCircle2, Users, TrendingUp } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import JobDashboardCard from "../../components/cards/JobDashboardCard";
import ApplicationDashboardCard from "../../components/cards/ApplicationDashboardCard";

// Reusable Card component
const Card = ({ title, subtitle, headerAction, className, children }) => (
  <div className={`bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md ${className}`}>
    {(title || headerAction) && (
      <div className="flex items-center justify-between p-6 pb-4">
        <div>
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {headerAction}
      </div>
    )}
    <div className={title ? "px-6 pb-6" : "p-6"}>{children}</div>
  </div>
);

// Reusable Stat Card component
const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue" }) => {
  const colorClasses = {
    blue: "from-purple-500 to-pink-500",
    green: "from-teal-400 to-teal-500",
    purple: "from-indigo-500 to-violet-500",
    orange: "from-orange-400 to-pink-500",
  };

  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color]} text-white border-0`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {trend && (
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        <div className="bg-white/10 p-3 rounded-xl">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );
};

const EmployerDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardOverView = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.OVERVIEW);
      if (response.status === 200) setDashboardData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardOverView();
  }, []);

  return (
    <DashboardLayout activeMenu="employer-dashboard">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-7xl mx-auto space-y-8 mb-24">

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Active Jobs"
              value={dashboardData?.counts?.totalActiveJobs || 0}
              icon={Briefcase}
              trend
              trendValue={`${dashboardData?.counts?.trends?.activeJobs || 0}%`}
              color="blue"
            />
            <StatCard
              title="Total Applicants"
              value={dashboardData?.counts?.totalApplications || 0}
              icon={Users}
              trend
              trendValue={`${dashboardData?.counts?.trends?.totalApplicants || 0}%`}
              color="green"
            />
            <StatCard
              title="Hired"
              value={dashboardData?.counts?.totalHired || 0}
              icon={CheckCircle2}
              trend
              trendValue={`${dashboardData?.counts?.trends?.totalHired || 0}%`}
              color="purple"
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card
              title="Recent Job Posts"
              subtitle="Your latest job postings"
              headerAction={
                <button
                  onClick={() => navigate("/manage-jobs")}
                  className="text-purple-500 hover:text-purple-600 font-medium text-sm"
                >
                  View all
                </button>
              }
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentJobs?.slice(0, 3).map((job, i) => (
                  <JobDashboardCard key={i} job={job} />
                ))}
              </div>
            </Card>

            <Card
              title="Recent Applications"
              subtitle="Latest candidate applications"
              headerAction={
                <button
                  onClick={() => navigate("/manage-jobs")}
                  className="text-purple-500 hover:text-purple-600 font-medium text-sm"
                >
                  View all
                </button>
              }
            >
              <div className="space-y-3">
                {dashboardData?.data?.recentApplications?.slice(0, 3).map((app, i) => (
                  <ApplicationDashboardCard
                    key={i}
                    applicant={app?.applicant || ""}
                    position={app?.job?.title || ""}
                    time={moment(app?.updatedAt).fromNow()}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card title="Quick Actions" subtitle="Common tasks to get you started">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Post New Job",
                  icon: Plus,
                  bg: "bg-gradient-to-r from-purple-500 to-pink-500",
                  path: "/post-job",
                },
                {
                  title: "Review Applications",
                  icon: Users,
                  bg: "bg-gradient-to-r from-teal-400 to-teal-500",
                  path: "/manage-jobs",
                },
                {
                  title: "Company Settings",
                  icon: Building2,
                  bg: "bg-gradient-to-r from-indigo-500 to-violet-500",
                  path: "/company-profile",
                },
              ].map((action, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => navigate(action.path)}
                  className={`flex items-center space-x-3 p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300 ${action.bg} text-white`}
                >
                  <div className="p-3 rounded-lg bg-white/20 flex items-center justify-center">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">{action.title}</span>
                </button>
              ))}
            </div>
          </Card>

        </div>
      )}
    </DashboardLayout>
  );
};

export default EmployerDashboard;
