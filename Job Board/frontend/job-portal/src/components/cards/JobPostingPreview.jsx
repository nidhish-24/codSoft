import {
  MapPin,
  DollarSign,
  ArrowLeft,
  Building2,
  Clock,
  Users,
} from "lucide-react";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import { useAuth } from "../../context/AuthContext";

const JobPostingPreview = ({ formData, setIsPreview }) => {
  const { user } = useAuth();
  const currencies = [{ value: "usd", label: "$" }];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 py-8 px-4 sm:px-6 lg:px-8 text-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 backdrop-blur-md bg-gray-800/70 border border-gray-700 rounded-3xl px-6 pt-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl font-bold text-cyan-400">
              Job Preview
            </h2>

            <button
              onClick={() => setIsPreview(false)}
              className="group flex items-center space-x-2 px-6 py-3 text-xs md:text-sm font-medium text-gray-200 hover:text-gray-900 bg-gray-700 hover:bg-cyan-500 hover:from-cyan-500 hover:to-indigo-600 border border-gray-600 hover:border-transparent rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Edit</span>
            </button>
          </div>

          {/* Main Card */}
          <div className="mt-8 bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-xl">
            {/* Job Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold text-cyan-400 mb-2">
                  {formData.jobTitle}
                </h1>
                <div className="flex items-center space-x-4 text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {formData.isRemote ? "Remote" : formData.location}
                  </span>
                  {formData.isRemote && formData.location && (
                    <span className="text-sm text-gray-500">• {formData.location}</span>
                  )}
                </div>
              </div>

              {user?.companyLogo ? (
                <img
                  src={user.companyLogo}
                  alt="Company Logo"
                  className="h-16 md:h-20 w-16 md:w-20 object-cover rounded-2xl border-2 border-cyan-600 shadow-lg"
                />
              ) : (
                <div className="h-20 w-20 bg-gray-700 border-2 border-gray-600 rounded-2xl flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 bg-cyan-900/20 text-cyan-400 text-sm font-semibold rounded-full border border-cyan-700">
                {CATEGORIES.find((c) => c.value === formData.category)?.label}
              </span>
              <span className="px-4 py-2 bg-indigo-900 text-indigo-300 text-sm font-semibold rounded-full border border-indigo-700">
                {JOB_TYPES.find((j) => j.value === formData.jobType)?.label}
              </span>
              <div className="flex items-center space-x-1 px-3 py-1 bg-gray-700 text-gray-300 rounded-full border border-gray-600 text-sm">
                <Clock className="h-4 w-4" />
                <span>Posted today</span>
              </div>
            </div>

            {/* Compensation */}
            <div className="relative overflow-hidden bg-gray-900/50 border border-gray-700 p-6 rounded-2xl mb-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-indigo-400/10 rounded-full -translate-y-16 -translate-x-16" />
              <div className="relative z-10">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-cyan-600 rounded-xl">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-200">Compensation</h3>
                </div>
                <div className="text-lg font-bold text-gray-100 mt-2">
                  {currencies.find((c) => c.value === formData.currency)?.label}
                  {formData.salaryMin.toLocaleString()} -{" "}
                  {currencies.find((c) => c.value === formData.currency)?.label}
                  {formData.salaryMax.toLocaleString()}
                  <span className="text-sm text-gray-400 font-normal ml-1">per year</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-cyan-400 bg-gray-800 px-3 py-1 rounded-full mt-4">
                <Users className="h-4 w-4" />
                <span>Competitive</span>
              </div>
            </div>

            {/* About Role */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-indigo-500 rounded" />
                <h3 className="text-base md:text-lg font-bold text-cyan-400">About This Role</h3>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {formData.description}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-indigo-500 rounded" />
                <h3 className="text-base md:text-lg font-bold text-cyan-400">What We’re Looking For</h3>
              </div>
              <div className="bg-gray-800/40 border border-gray-700 rounded-xl p-4 text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {formData.requirements}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;
