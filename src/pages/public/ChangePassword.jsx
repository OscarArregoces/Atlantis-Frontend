import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import LoginFondo from "/assets/svg/LoginFondo.svg"
import "./css/Login.css"

export const ChangePassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (dataValue) => {
        toast.success("Contraseña actualizada");
    }

    useEffect(() => {
        return navigate("/login")
    }, []);

    return (
        <div className="w-screen h-screen p-5 flex justify-center items-center">
            <img id="LoginFondo" src={LoginFondo} alt="LoginFondo" />
            <Card className="w-96">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="h-28 flex justify-center items-center gap-2"
                    >
                        <Typography variant="h3" color="white">
                            Recupera tu cuenta
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="small">
                            ¡Hola <span className="font-semibold">Harry Potter</span>!
                        </Typography>
                        <Typography variant="small">
                            Sabemos que estás interesado en recuperar tu cuenta. ¡Estás en el lugar adecuado para cambiar tu contraseña y asegurar tu acceso!
                        </Typography>
                        <Input
                            label="Nueva contraseña"
                            {...register('password', { required: true })}
                            type={
                                showNewPassword ? 'text' : 'password'
                            }
                            icon={
                                showNewPassword
                                    ?
                                    <EyeSlashIcon className="h-5 w-5 cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)} />
                                    :
                                    <EyeIcon className="h-5 w-5 cursor-pointer" onClick={() => setShowNewPassword(!showNewPassword)} />
                            }
                        />
                        {errors.email && errors.email.type === "required" && (
                            <span className="text-start text-red-500 text-sm">Campo requerido</span>
                        )}

                        <Input
                            label="Confirmar contraseña"
                            {...register('confirmPassword', { required: true })}
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
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="gradient" type="submit" color="gray" fullWidth>
                            Actualizar
                        </Button>
                    </CardFooter>
                </form>
            </Card>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div >
    )
}
