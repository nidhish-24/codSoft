import { ChevronDown, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  userRole,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-3 p-2 rounded-xl bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="h-9 w-9 object-cover rounded-full border-2 border-cyan-500"
          />
        ) : (
          <div className="h-9 w-9 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {companyName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-white">{companyName}</p>
          <p className="text-xs text-gray-400">{userRole === "employer" ? "Employer" : "Job Seeker"}</p>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm font-medium text-white">{companyName}</p>
            <p className="text-xs text-gray-400 truncate">{email}</p>
          </div>

          {/* Menu Links */}
          <button
            onClick={() => navigate(userRole === 'jobseeker' ? '/profile' : '/company-profile')}
            className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-cyan-700 hover:text-white transition-colors flex items-center gap-2 rounded-lg"
          >
            <User className="w-4 h-4" />
            View Profile
          </button>

          <div className="border-t border-gray-700 mt-2 pt-2">
            <button
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-700 hover:text-white transition-colors flex items-center gap-2 rounded-lg"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
