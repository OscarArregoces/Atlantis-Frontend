import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
    Select,
    Option,
    Avatar,
} from "@material-tailwind/react";
import { CloudArrowUpIcon, EyeIcon, EyeSlashIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";
import { useAxios } from "../../../../utils/axios.instance";

export const UsuariosFormCreate = ({ openFormCreate, setOpenFormCreate, getUsers }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            email: '',
            password: '',
            name: '',
            surname: '',
            birthday: '',
            type_document: '',
            no_document: '',
            country: '',
            city: '',
            phone: '',
            imr_url: '',
        }
    });
    const onSubmit = async (dataValue) => {
        const { data } = await useAxios.post('/person/createMember', dataValue);
        if (data.error) {
            console.log(data)
        } else {
            reset();
            setOpenFormCreate(false);
            await getUsers();
        }
    }
    return (
        <>
            <Dialog
                open={openFormCreate}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                size="md"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader
                        className="text-gray-700"
                    >
                        Registrando usuario
                    </DialogHeader>
                    <DialogBody>

                        <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
                            <div className="grid grid-cols-1">
                                <Avatar
                                    src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                                    alt="avatar"
                                    size="xxl"
                                    className="m-auto"
                                />

                                <Button
                                    variant="text"
                                    className="flex items-center gap-3 max-w-[200px] m-auto mt-2"
                                >
                                    <CloudArrowUpIcon className="h-5 w-5" />
                                    Subir foto
                                </Button>
                            </div>
                            <div className="grid gap-4">
                                <div className="flex gap-2 mb-5">
                                    <ShieldCheckIcon className="h-5 w-5" />
                                    <Typography
                                        variant="small"
                                        className="font-semibold text-gray-700"
                                    >
                                        Credenciales de acceso
                                    </Typography>

                                </div>
                                <Input
                                    type="text"
                                    label="Correo electronico"
                                    {...register('email')} />

                                <Input
                                    label="Contraseña"
                                    {...register('password')}
                                    type={
                                        showPassword ? 'text' : 'password'
                                    }
                                    icon={
                                        showPassword
                                            ?
                                            <EyeSlashIcon className="h-5 w-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                                            :
                                            <EyeIcon className="h-5 w-5 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />
                                    } />
                            </div>
                        </div>
                    </DialogBody>
                    <DialogBody>
                        <div className="flex gap-2 mb-5">
                            <UserIcon className="h-5 w-5" />
                            <Typography
                                variant="small"
                                className="font-semibold text-gray-700"
                            >
                                Datos personales
                            </Typography>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
                            <Input type="text" label="Nombres" {...register('name')} />
                            <Input type="text" label="Apellidos" {...register('surname')} />

                            <Controller
                                control={control}
                                name="type_document"
                                render={({ field: { onChange, onBlur } }) => (

                                    <Select
                                        label="Tipo de documento"
                                        {...register('type_document')}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                    >
                                        <Option value="cc">Cedula Ciudadania</Option>
                                        <Option value="ti">Tarjeta de identidad</Option>
                                        <Option value="nit">NIT</Option>
                                        <Option value="pa">Pasaporte</Option>
                                    </Select>
                                )}
                            />

                            <Input type="text" label="No documento" {...register('no_document')} />
                            <Input type="text" label="Pais" {...register('country')} />
                            <Input type="text" label="Ciudad" {...register('city')} />
                            <Input type="text" label="Celular" {...register('phone')} />
                            <Input type="text" label="Fecha de nacimiento" {...register('birthday')} />
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => setOpenFormCreate(!openFormCreate)}
                            className="mr-1"
                        >
                            <span>Cancelar</span>
                        </Button>
                        <Button type="submit" variant="gradient" color="green">
                            <span>Guardar</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}