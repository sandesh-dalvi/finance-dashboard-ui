import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

const SharedLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 🌙 Theme init
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    <div className="flex min-h-screen bg-background text-neutral">
      <div className="">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
      <main className=" flex-1">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <Outlet />
      </main>
    </div>
  );
};

export default SharedLayout;
