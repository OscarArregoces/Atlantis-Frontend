import { Outlet } from "react-router-dom"
import { Navbar } from "../components/private/Navbar"
import { Sidebar, SidebarItem } from "../components/private/Sidebar"
import { useEffect, useState } from "react"
import { HomeIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/solid"

export const PrivateLayout = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open)
    console.log(open)
  }
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleMediaChange = (event) => {
      setOpen(true);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    handleMediaChange(mediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);


  return (
    <div className="bg-gray-200">
      <Navbar />
      <Outlet />
    </div>
  )
}
