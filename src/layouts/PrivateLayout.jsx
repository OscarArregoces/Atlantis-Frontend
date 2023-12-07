import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components/private/Navbar"
import { useState } from "react";

export const PrivateLayout = () => {
  const [isValid, setIsValid] = useState(true);

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="bg-gray-200">
      <Navbar />
      <Outlet />
    </div>
  )
}
