import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Workflow,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Profile", path: "/profile", icon: <UserCircle size={18} /> },
  ];

  const adminMenu = [
    { name: "Employees", path: "/employees", icon: <Users size={18} /> },
    { name: "Projects", path: "/projects", icon: <FolderKanban size={18} /> },
    { name: "Allocations", path: "/allocations", icon: <Workflow size={18} /> },
  ];

  return (
    <aside
      className={`$ {
        isOpen ? "w-64" : "w-16"
      } bg-white shadow-md h-full transition-all duration-300 ease-in-out border-r flex flex-col`}
    >
      <div className="flex items-center justify-between px-4 h-16 border-b">
        <span className="font-bold text-lg text-indigo-600 truncate">
          {isOpen ? "ResourcePro" : "RP"}
        </span>
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-indigo-600 focus:outline-none"
        >
          ☰
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        {[...menu, ...(user?.role === "Admin" ? adminMenu : [])].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 my-1 rounded-lg transition-colors duration-200 hover:bg-indigo-100 hover:text-indigo-600 ${
                isActive ? "bg-indigo-200 text-indigo-700" : "text-gray-700"
              }`
            }
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={18} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
