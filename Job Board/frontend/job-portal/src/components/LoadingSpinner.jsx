import { Briefcase } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-cyan-600 mx-auto mb-4"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-cyan-600" />
          </div>
        </div>
        <p className="text-indigo-700 font-medium">
          Finding amazing opportunities...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
