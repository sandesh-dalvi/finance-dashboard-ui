import { X } from "lucide-react";
import { NavLink } from "react-router";
import { navItems } from "../utils/links";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static z-50 w-64 h-full bg-background-light pt-10 text-neutral-light transform transition-transform duration-300 border-r border-border
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <h2 className="font-bold">Menu</h2>
          <button className=" cursor-pointer" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg transition-colors font-medium ${isActive ? " bg-primary text-surface " : " text-neutral-dark hover:text-primary hover:bg-primary/20"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className=""></div>
      </aside>
    </>
  );
};

export default Sidebar;
