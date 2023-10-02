import React from "react";
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
} from "@material-tailwind/react";
import { ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";

export const UsuariosFormCreate = ({ openFormCreate, setOpenFormCreate }) => {
    const { register, handleSubmit, reset, control } = useForm({
        defaultValues: {
            email: '',
            password: '',
            name: '',
            surname: '',
            type_document: '',
            ocument: '',
            country: '',
            city: '',
            phone: '',
            birthday: '',
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <>
            <Dialog
                open={openFormCreate}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                // className="h-full overflow-auto"
                size="md"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader
                        className="text-gray-700"
                    >
                        Registrando usuario
                    </DialogHeader>
                    <DialogBody>
                        <div className="flex gap-2 mb-5">
                            <ShieldCheckIcon className="h-5 w-5" />
                            <Typography
                                variant="small"
                                className="font-semibold text-gray-700"
                            >
                                Credenciales de acceso
                            </Typography>

                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
                            <Input type="text" label="Correo electronico" {...register('email')} />
                            <Input type="password" label="Contraseña" {...register('password')} />
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

                            <Input type="text" label="No documento" {...register('document')} />
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