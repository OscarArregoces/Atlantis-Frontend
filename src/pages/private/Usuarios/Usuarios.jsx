import { useEffect, useState } from "react";
import { Card, CardHeader, Input, Typography, Button, } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon, PaperAirplaneIcon, UserPlusIcon } from "@heroicons/react/24/solid";

import { useAxios } from "../../../utils/axios.instance";
import { UsuariosTable } from "./components/UsuariosTable"
import { UsuariosFormCreate } from "./components/UsuariosFormCreate";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";


function UsuariosDashboard({ getUsers, data, setData }) {
  const [openFormCreate, setOpenFormCreate] = useState(false);
  const { handleSubmit, reset, register } = useForm();

  const onSubmit = (dataValue) => {
    const match = data.filter(user => user.email === dataValue.email);
    setData(match);
  }
  const handleReset = () => {
    reset();
    getUsers();
  }

  return (
    <>
      <Card className="w-full rounded-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8 gap-8 flex flex-col justify-center items-start md:flex md:flex-row md:items-center md:justify-between lg:flex lg:flex-row lg:items-center lg:justify-between ">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Lista de usuarios
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Accede a información de todos los usuarios
                </Typography>
              </div>
              <div className="flex shrink-0  gap-2 flex-col md:flex md:flex-col lg:flex lg:flex-row">
                <Button className="flex items-center gap-3" size="sm" onClick={() => setOpenFormCreate(!openFormCreate)}>
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Añadir usuario
                </Button>
              </div>
            </div>
            <div className="
              w-full flex flex-col gap-3 max-w-xl mb-5
              md:w-full md:flex md:flex-row md:gap-3 md:max-w-xl md:mb-5
              lg:w-full lg:flex lg:flex-row lg:gap-3 lg:max-w-xl lg:mb-5
              ">
              <div className="min-w-full max-w-[300px]">
                <Input
                  type="email"
                  label="Buscar por correo electronico"
                  {...register("email", { required: true })}
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <div className="
                flex shrink-0 gap-2 flex-col 
                md:flex md:flex-row 
                lg:flex lg:flex-row
              ">
                <Button type="submit" className="flex items-center gap-3 max-w-min" size="sm" color="blue">
                  <PaperAirplaneIcon strokeWidth={2} className="h-4 w-4" /> Buscar
                </Button>
                <Button className="flex items-center gap-3 max-w-min" size="sm" color="blue-gray" onClick={handleReset}>
                  <ArrowPathIcon strokeWidth={2} className="h-4 w-4" /> Reiniciar
                </Button>
              </div>
            </div>
          </form>
        </CardHeader>
      </Card>
      <UsuariosFormCreate
        openFormCreate={openFormCreate}
        setOpenFormCreate={setOpenFormCreate}
        getUsers={getUsers}
      />
    </>
  )
}

export const Usuarios = () => {
  const [data, setData] = useState([]);

  const getUsers = async () => {
    const { data } = await useAxios.get('/person');
    if (data.erorr) {
      toast.error("Error en consulta");
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
        data={data}
        setData={setData}
      />
      <UsuariosTable
        data={data}
        getUsers={getUsers}
      />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}

// data = [1,2,3,4,5]   ||    data = [2]
// dataCopy = [1,2,3,4,5]   ||    dataCopy = [1,2,3,4,5


//Busqueda => 2