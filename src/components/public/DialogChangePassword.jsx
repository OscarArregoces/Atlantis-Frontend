import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Input,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAxios } from "../../utils/axios.instance";

export const DialogChangePassword = ({ display, setDisplay }) => {
    const [successful, setSuccessful] = useState(false);
    const [error, setError] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const onSubmit = async (dataValue) => {
        console.log(dataValue);
        const { data } = await useAxios.post("/auth/forgotPassword", dataValue);
        if (data.error) return setError(true);
        setError(false);
        setSuccessful(true);
        setTimeout(() => {
            setDisplay(!display);
            setSuccessful(false);
            reset();
        }, 1500);
    }
    const handleCancel = () => {
        setSuccessful(false);
        setError(false);
        reset();
        setDisplay(!display)
    }

    return (
        <Dialog open={display} size="md">
            <DialogHeader className="flex justify-between">
                Recupera tu cuenta
                {successful && <XMarkIcon className="h-5 w-5 cursor-pointer" onClick={handleCancel} />}
            </DialogHeader>
            <DialogBody>
                {
                    (successful && !error)
                    &&
                    <Typography variant="paragraph" className="bg-green-100 p-5 rounded-md mb-5" >
                        Te hemos enviado un correo electronico, revisa tu bandeja de entrada y sigue las instrucciones.
                    </Typography>
                }
                {
                    !successful
                    &&
                    <>

                        {
                            !error
                            &&
                            <Typography variant="paragraph" className="bg-gray-100 p-5 rounded-md mb-5" >
                                Ingresa tu correo electronico para ayudarnos a buscar tu cuenta.
                            </Typography>
                        }
                        {
                            error
                            &&
                            <Typography variant="paragraph" className="bg-red-100 p-5 rounded-md mb-5" >
                                El correo que proporcionaste no existe.
                            </Typography>
                        }
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col justify-center items-center mb-10">
                                <Input type="email" label="Correo electronico" color="cyan" {...register("email", { required: true })} />
                                {errors.name && errors.name.type === "required" && (
                                    <span>This is required</span>
                                )}
                            </div>
                            <div className="flex justify-end gap-5">
                                <Button
                                    variant="text"
                                    color="gray"
                                    onClick={handleCancel}
                                    className="mr-1"
                                >
                                    <span>Volver</span>
                                </Button>
                                <Button type="submit" variant="gradient" color="blue">
                                    <span>Buscar</span>
                                </Button>
                            </div>
                        </form>
                    </>

                }
            </DialogBody>
        </Dialog>
    )
}
