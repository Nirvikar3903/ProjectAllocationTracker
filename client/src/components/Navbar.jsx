import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      {/* Sidebar toggle (hamburger) */}
      <button
        className="text-gray-600 hover:text-gray-900 focus:outline-none"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Branding */}
      <h1 className="text-xl font-bold tracking-wide text-blue-600">
        Resource Tracker
      </h1>

      {/* User Profile & Logout */}
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut className="h-5 w-5 text-red-500" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
