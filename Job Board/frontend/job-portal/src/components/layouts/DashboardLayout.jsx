import { useState, useEffect } from "react";
import { Briefcase, Building2, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { NAVIGATION_MENU } from "../../utils/data";
import ProfileDropdown from "./ProfileDropdown";

const NavigationItem = ({ item, isActive, onClick, isCollapsed }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 group
        ${
          isActive
            ? "bg-cyan-700 text-white shadow-lg"
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }
      `}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
      {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
    </button>
  );
};

const DashboardLayout = ({ activeMenu, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState(activeMenu || "dashboard");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (profileDropdownOpen) setProfileDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [profileDropdownOpen]);

  const handleNavigation = (itemId) => {
    setActiveNavItem(itemId);
    navigate(`/${itemId}`);
    if (isMobile) setSidebarOpen(false);
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sidebarCollapsed = !isMobile && false;

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform
          ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          ${sidebarCollapsed ? "w-16" : "w-64"} bg-gray-800 border-r border-gray-700`}
      >
        {/* Logo */}
        <div className="flex items-center h-16 border-b border-gray-700 pl-6">
          {!sidebarCollapsed ? (
            <Link className="flex items-center space-x-3" to="/">
              <div className="h-8 w-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">CareerConnect</span>
            </Link>
          ) : (
            <div className="h-8 w-8 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {NAVIGATION_MENU.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={activeNavItem === item.id}
              onClick={handleNavigation}
              isCollapsed={sidebarCollapsed}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            className="w-full flex items-center px-3 py-3 text-sm font-medium rounded-xl text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-200"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 flex-shrink-0 text-gray-400" />
            {!sidebarCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Top Navbar */}
        <header className="bg-gray-800/80 backdrop-blur-sm border-b border-gray-700 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl hover:bg-gray-700 transition-colors duration-200"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5 text-gray-300" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-300" />
                )}
              </button>
            )}
            <div>
              <h1 className="text-base font-semibold text-white">Welcome back!</h1>
              <p className="text-sm text-gray-400 hidden sm:block">
                Here's what's happening with your jobs today.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ProfileDropdown
              isOpen={profileDropdownOpen}
              onToggle={(e) => {
                e.stopPropagation();
                setProfileDropdownOpen(!profileDropdownOpen);
              }}
              avatar={user?.avatar || ""}
              companyName={user?.name || ""}
              email={user?.email || ""}
              userRole={user?.role || "jobseeker"}
              onLogout={logout}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-900">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

