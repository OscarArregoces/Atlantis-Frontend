import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

import { useForm } from "react-hook-form";
import { useAxios } from "../../utils/axios.instance";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (body) => {
    const { data } = await useAxios.post('/auth/login', body);
    if (data.error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Credenciales incorrectas',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('user', JSON.stringify(data.data.user))
      reset()
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Bienvenido ${data.data.user.name}`,
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        navigate('/private/dashboard')
      }, 1500);
    }

  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="p-2">
          Bienvenido
        </Typography>
        <Typography color="gray" className="mt-1 font-normal p-2">
          Ingresa tus datos para ingresar.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96 p-2">
          <div className="mb-4 flex flex-col gap-6">
            <Input required type="email" size="lg" label="Correo electronico" {...register("email")} />
            <Input required type="password" size="lg" label="Contraseña" {...register("password")} />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Entrar
          </Button>
        </form>
      </Card>
    </div>

  )
}