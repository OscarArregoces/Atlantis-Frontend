import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../utils/axios.instance";
import Swal from "sweetalert2";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false)

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
      <Card className="w-96">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Empresa
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              label="Correo electronico"
              {...register('email', { required: true })}
            />
            {errors.email && errors.email.type === "required" && (
              <span className="text-start text-red-500 text-sm">Campo requerido</span>
            )}

            <Input
              label="Contraseña"
              {...register('password', { required: true })}
              type={
                showPassword ? 'text' : 'password'
              }
              icon={
                showPassword
                  ?
                  <EyeSlashIcon className="h-5 w-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                  :
                  <EyeIcon className="h-5 w-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
              }
            />
            {errors.password && errors.password.type === "required" && (
              <span className="text-start text-red-500 text-sm">Campo requerido</span>
            )}
            {/* <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" fullWidth>
              Entrar
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Olvidaste tu contraseña?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Recuperala aquí
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>

  );
}