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
    <>
      <div className="flex">
        <div className="h-full min-h-screen">
          <Sidebar>
            <SidebarItem icon={<HomeIcon className="h-5 w-5" />} text="Inicio" path="dashboard" />
            <SidebarItem icon={<UserIcon className="h-5 w-5" />} text="Usuarios" path="usuarios" />
            <SidebarItem icon={<ShieldCheckIcon className="h-5 w-5" />} text="Admin" path="admin" />
          </Sidebar>
        </div>
        <div className="w-full">
          <div className="w-full h-14">
            <Navbar />
          </div>
          <div className="w-full h-full max-h-[calc(100vh-3.5rem)]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
