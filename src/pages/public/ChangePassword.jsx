import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
    Spinner,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../utils/axios.instance";
import { useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useLocation } from 'react-router-dom';
import { validPassword } from "../../utils/ValidPassword";
import toast, { Toaster } from "react-hot-toast";
import LoginFondo from "/assets/svg/LoginFondo.svg"
import "./css/Login.css"
import { NotFound } from "../../components/common/NotFound";

export const ChangePassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    async function changePassword(body) {
        console.log(body);
        const { data } = await useAxios.post('/auth/recoverPassword', body);
        return data;
    }

    const onSubmit = async (dataValue) => {
        const { password, confirmPassword } = dataValue;

        const isValid = validPassword(password, confirmPassword);
        if (!isValid) return toast.error("Las contraseñas no coinciden.");

        let body = { password: password, _id: token._id }

        toast.promise(
            changePassword(body),
            {
                loading: 'Verificando...',
                success: (data) => {
                    if (!data.error) {
                        reset();
                        setTimeout(() => {
                            navigate('/login');
                        }, 1000);
                    }
                    return "Contraseña actualizada"
                },
                error: 'Hubo un problema',
            }
        );
    }

    async function validSesion(id) {
        const body = {
            id: id
        }
        const { data } = await useAxios.post('/auth/verifyTokenPassword', body);
        return data;
    }

    useEffect(() => {
        setLoading(true);
        const queryParams = new URLSearchParams(location.search);
        const tokenParams = queryParams.get('token');
        if (!tokenParams) return navigate("/login")
        validSesion(tokenParams).then(data => {
            if (!data.error) {
                setToken(data.data);
            }
        })
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    if (loading) {
        return <div className="h-screen w-screen flex flex-col justify-center items-center"><Typography variant="lead">Verificando...</Typography><Spinner className="h-60 w-60" /></div>
    }
    if (!loading && !token) {
        return <NotFound />
        // return <div className="h-screen w-screen flex justify-center items-center"><Typography variant="lead">No tienes permiso</Typography></div>
    }


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
                            ¡Hola <span className="font-semibold">{token.name}</span>!
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
