import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../utils/axios.instance";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import LoginFondo from "/assets/svg/LoginFondo.svg"
import "./css/Login.css"
import { DialogChangePassword } from "../../components/public/DialogChangePassword";
export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      email:'HarryPotter@gmail.com',
      password:'123456789'
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [display, setDisplay] = useState(false);

  const onSubmit = async (body) => {
    toast.success("Bienvenido Harry Potter");
    setTimeout(() => {
      navigate('/private/dashboard');
    }, 1500);
  }


  return (
    <div className="w-screen h-screen p-5 flex justify-center items-center">
      <img id="LoginFondo" src={LoginFondo} alt="LoginFondo" />
      <Card className="w-96">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <CardHeader
            variant="gradient"
            color="cyan"
            className="h-28 flex justify-center items-center gap-2"
          >
            <Avatar src="/assets/img/logo.png" className="h-10 w-10" />
            <Typography variant="h3" color="white">
              DEMO
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              type="email"
              label="Correo electronico"
              {...register('email', { required: true })}
            />
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

          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" type="submit" color="cyan" fullWidth>
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
                onClick={() => setDisplay(!display)}
              >
                Recuperala aquí
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <DialogChangePassword
        display={display}
        setDisplay={setDisplay}
      />
    </div>

  );
}