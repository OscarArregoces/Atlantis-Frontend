import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Input,
    Option,
    Select,
    Typography,
} from "@material-tailwind/react";
import { ShieldCheckIcon, UserIcon, } from "@heroicons/react/24/solid";
import { Controller, useForm } from "react-hook-form";
import { BASE_URL_MEDIA } from "../../../../environment/env-dev";
import { TYPE_DOCUMENT } from "../../../../const/TYPE_DOCUMENT";

export const UsuariosDetails = ({ openDetails, setOpenDetails, dataUser }) => {
    const [disabled, setDisabled] = useState(true);
    const { register, control, setValue } = useForm({
        defaultValues: {
            email: '',
            name: '',
            surname: '',
            type_document: '',
            no_document: '',
            country: '',
            city: '',
            phone: '',
            birthday: '',
        }
    });

    useEffect(() => {
        if (dataUser) {
            const newData = {
                email: dataUser.email,
                name: dataUser.person.name,
                surname: dataUser.person.surname,
                type_document: dataUser.person.type_document,
                no_document: dataUser.person.no_document,
                country: dataUser.person.country,
                city: dataUser.person.city,
                phone: dataUser.person.phone,
                birthday: dataUser.person.birthday,
                img_url: dataUser.person.img_url,
            }
            Object.keys(newData).forEach((fieldName) => {
                setValue(fieldName, newData[fieldName]);
            });

        }
    }, [dataUser])
    return (
        <>
            <Dialog
                open={openDetails}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                handler={() => setOpenDetails(!openDetails)}
                size="md"
                className="overflow-y-auto max-h-[90vh]"
            >
                <DialogHeader
                    className="text-gray-700"
                >
                    Detalles usuario
                </DialogHeader>
                <DialogBody>

                <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
                        <div className="grid grid-cols-1">
                            <Avatar
                                src={dataUser ? dataUser.person.img_url : '/assets/img/sinFoto.png'}
                                alt="avatar"
                                size="xxl"
                                className="m-auto"
                            />
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
                            <Input type="text" label="Correo electronico" {...register('email', { disabled: disabled })} />
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
                        <Input type="text" label="Nombres" {...register('name', { disabled: disabled })} />
                        <Input type="text" label="Apellidos" {...register('surname', { disabled: disabled })} />

                        <Controller
                            control={control}
                            name="type_document"
                            render={({ field: { onChange, onBlur } }) => (

                                <Select
                                    label="Tipo de documento"
                                    {...register('type_document')}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={dataUser.person.type_document}
                                    disabled={disabled}
                                >
                                    {
                                        TYPE_DOCUMENT.map(document => (
                                            <Option key={document.value} value={document.value}>{document.title}</Option>
                                        ))
                                    }

                                </Select>
                            )}
                        />

                        <Input type="text" label="No documento" {...register('no_document', { disabled: disabled })} />
                        <Input type="text" label="Pais" {...register('country', { disabled: disabled })} />
                        <Input type="text" label="Ciudad" {...register('city', { disabled: disabled })} />
                        <Input type="text" label="Celular" {...register('phone', { disabled: disabled })} />
                        <Input type="text" label="Fecha de nacimiento" {...register('birthday', { disabled: disabled })} />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={() => setOpenDetails(!openDetails)}
                        className="mr-1"
                    >
                        <span>Volver</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}