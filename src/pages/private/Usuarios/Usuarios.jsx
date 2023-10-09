import { useEffect, useState } from "react";
import { UsuariosDashboard } from "./components/UsuariosDashboard"
import { UsuariosTable } from "./components/UsuariosTable"
import { useAxios } from "../../../utils/axios.instance";

export const Usuarios = () => {
  const [data, setData] = useState([]);
  const getUsers = async () => {
    const { data } = await useAxios.get('/person');
    console.log(data);
    if (data.erorr) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error en consulta',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      if (typeof data.data === String) return;
      setData(data.data);
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
      <UsuariosDashboard
        getUsers={getUsers}
      />
      <UsuariosTable
        data={data}
        getUsers={getUsers}
      />
    </>
  )
}
