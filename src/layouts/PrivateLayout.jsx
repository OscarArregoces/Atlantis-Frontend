import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components/private/Navbar"
import { useEffect, useState } from "react";
import { useAxios } from "../utils/axios.instance";


export const PrivateLayout = () => {
  const [isValid, setIsValid] = useState(true);
  // useEffect(() => {
  //   async function getCategory() {
  //     const { data } = await useAxios.get('/category');
  //     if (data.error) {
  //       return setIsValid(false);
  //     }
  //     if (data.data === 'Invalid Token') {
  //       return setIsValid(false)
  //     }
  //     return setIsValid(true)
  //   };
  //   getCategory();
  // }, []);

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
