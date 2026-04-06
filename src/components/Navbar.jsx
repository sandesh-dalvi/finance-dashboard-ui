import { ChevronDown, Menu, Moon, Sun } from "lucide-react";
import { useApp } from "../context/AppContext";

const Navbar = ({ setIsSidebarOpen }) => {
  const { toggleTheme, theme, role, setRole } = useApp();
  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b border-border bg-background-light">
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden cursor-pointer text-neutral"
      >
        <Menu size={22} />
      </button>

      <h1 className="font-semibold">Finance Dashboard</h1>
      <div className=" flex items-center justify-center gap-3">
        {/* Role Switcher */}

        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full appearance-none px-3 py-2 rounded-xl text-sm font-medium cursor-pointer pr-8 bg-primary border border-border text-surface"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-2.5 top-3 pointer-events-none text-secondary"
          />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg cursor-pointer bg-neutral/10 hover:bg-neutral/20"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
