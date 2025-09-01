import { useState, useEffect, useMemo } from "react";
import { Users, MapPin, Briefcase, ArrowLeft, Mail } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const ApplicationCard = ({ applicant, resumeUrl, email, appliedAt, onDownload }) => {
  return (
    <div className="bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:bg-gray-700 transition-colors duration-300">
      <div>
        <h3 className="text-lg font-semibold text-white">{applicant.name}</h3>
        <p className="text-sm text-gray-300 flex items-center gap-2 mt-1">
          <Mail className="h-4 w-4 text-gray-400" /> {email}
        </p>
        <p className="text-sm text-gray-400 mt-1">Applied {appliedAt}</p>
      </div>
      <button
        onClick={() => onDownload(resumeUrl)}
        className="mt-2 sm:mt-0 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300"
      >
        Download Resume
      </button>
    </div>
  );
};

const ApplicationViewer = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId));
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!jobId) {
      navigate("/manage-jobs");
    } else {
      fetchApplications();
    }
  }, [jobId]);

  const groupedApplications = useMemo(() => {
    return applications.reduce((acc, app) => {
      const jId = app.job._id;
      if (!acc[jId]) acc[jId] = { job: app.job, applications: [] };
      acc[jId].applications.push(app);
      return acc;
    }, {});
  }, [applications]);

  const handleDownloadResume = (url) => {
    window.open(url, "_blank");
  };

  return (
    <DashboardLayout activeMenu="manage-jobs">
      {/* Loading State */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-indigo-500 font-medium">Loading applications...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <div className="min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-0 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <button
              onClick={() => navigate("/manage-jobs")}
              className="group flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-400 hover:text-white bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 border border-gray-700 hover:border-transparent rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-white">Applications Overview</h1>
          </div>

          {/* Empty State */}
          {Object.keys(groupedApplications).length === 0 && (
            <div className="text-center py-16">
              <Users className="mx-auto h-24 w-24 text-indigo-500" />
              <h3 className="mt-4 text-lg font-semibold text-white">No applications found</h3>
              <p className="mt-2 text-gray-400">You currently have no applications for this job.</p>
            </div>
          )}

          {/* Applications List */}
          {Object.values(groupedApplications).map(({ job, applications }) => (
            <div key={job._id} className="mb-8">
              {/* Job Info */}
              <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 rounded-xl p-6 text-white shadow-lg">
                <h2 className="text-lg font-semibold">{job.title}</h2>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-white/90 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {job.type}
                  </div>
                  <div className="flex items-center gap-1">{job.category}</div>
                  <div className="ml-auto font-medium bg-white/20 px-3 py-1 rounded-lg">
                    {applications.length} Application{applications.length !== 1 && "s"}
                  </div>
                </div>
              </div>

              {/* Application Cards */}
              <div className="mt-4 space-y-4">
                {applications.map((app) => (
                  <ApplicationCard
                    key={app._id}
                    applicant={app.applicant}
                    email={app.applicant.email}
                    resumeUrl={app.resumeUrl}
                    appliedAt={moment(app.updatedAt).fromNow()}
                    onDownload={handleDownloadResume}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ApplicationViewer;
