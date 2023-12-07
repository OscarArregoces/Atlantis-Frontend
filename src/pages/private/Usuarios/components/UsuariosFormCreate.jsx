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
import { useAxiosWithFile } from "../../../../utils/axios.instance";
import { TYPE_DOCUMENT } from "../../../../const/TYPE_DOCUMENT";
import toast, { Toaster } from "react-hot-toast";

export const UsuariosFormCreate = ({ openFormCreate, setOpenFormCreate, getUsers }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
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
            img_url: ''
        }
    });
    const onSubmit = async (dataValue) => {
        const newDataValue = { ...dataValue, img_url: dataValue.img_url[0] };
        const formData = new FormData();
        for (let clave in newDataValue) {
            formData.append(clave, newDataValue[clave]);
        }

        const { data } = await useAxiosWithFile('post', '/person/createMember', formData);
        if (data.error) {
            toast.error("Error en consulta");
        } else {
            reset();
            setOpenFormCreate(false);
            await getUsers();
        }
    }
    const handleUpload = () => {
        const inputUpload = document.querySelector('#inputUpload');
        inputUpload.click();
        const avatar = document.querySelector('#avatar');
        inputUpload.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    avatar.src = e.target.result;
                }
                reader.readAsDataURL(e.target.files[0])
            } else {
                avatar.src = '/assets/img/sinFoto.png';
            }
        })
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
                className="overflow-y-auto max-h-[90vh]"
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
                                    src="/assets/img/sinFoto.png"
                                    alt="avatar"
                                    id="avatar"
                                    size="xxl"
                                    className="m-auto"
                                />
                                <div className="hidden" >
                                    <Input
                                        type="file"
                                        label="Subir archivo"
                                        accept="image/*"
                                        id="inputUpload"
                                        {...register('img_url', { required: true })}
                                    />

                                </div>
                                <Button
                                    variant="text"
                                    className="flex items-center gap-3 max-w-[200px] m-auto mt-2"
                                    onClick={handleUpload}
                                >
                                    <CloudArrowUpIcon className="h-5 w-5" />
                                    Subir foto
                                </Button>
                                {errors.img_url && errors.img_url.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Debes cargar una foto</span>
                                )}
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
                                <div>
                                    <Input
                                        type="email"
                                        label="Correo electronico"
                                        {...register('email', { required: true })}
                                    />
                                    {errors.email && errors.email.type === "required" && (
                                        <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                    )}
                                </div>

                                <div>
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
                                        <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                    )}
                                </div>
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
                            <div>
                                <Input
                                    type="text"
                                    label="Nombres"
                                    {...register('name', { required: true })}
                                />
                                {errors.name && errors.name.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    label="Apellidos"
                                    {...register('surname', { required: true })}
                                />
                                {errors.surname && errors.surname.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>

                            <div>
                                <Controller
                                    render={({ field }) => (
                                        <Select
                                            label="Tipo de documento"
                                            {...field}
                                        >
                                            {
                                                TYPE_DOCUMENT.map(document => (
                                                    <Option key={document.value} value={document.value}>{document.title}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                    rules={{ required: true }}
                                    name="type_document"
                                    control={control}
                                    defaultValue=""
                                />
                                {errors.type_document && errors.type_document.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>

                            <div>
                                <Input
                                    type="text"
                                    label="No documento"
                                    {...register('no_document', { required: true })}
                                />
                                {errors.no_document && errors.no_document.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="text"
                                    label="Pais"
                                    {...register('country', { required: true })}
                                />
                                {errors.country && errors.country.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>

                            <div>
                                <Input
                                    type="text"
                                    label="Ciudad"
                                    {...register('city', { required: true })}
                                />
                                {errors.city && errors.city.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>

                            <div>
                                <Input
                                    type="text"
                                    label="Celular"
                                    {...register('phone', { required: true })}
                                />
                                {errors.phone && errors.phone.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="date"
                                    label="Fecha de nacimiento"
                                    {...register('birthday', { required: true })}
                                />
                                {errors.birthday && errors.birthday.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>
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
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    );
}