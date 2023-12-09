import { useEffect } from "react";
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
import { CloudArrowUpIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";
import { Controller, useForm } from "react-hook-form";
import { TYPE_DOCUMENT } from "../../../../const/TYPE_DOCUMENT";
import { BASE_URL_MEDIA } from "../../../../environment/env-dev";
import toast, { Toaster } from "react-hot-toast";

export const UsuariosFormUpdate = ({ dataUser, openFormUpdate, setOpenFormUpdate }) => {
    const { register, handleSubmit, reset, control, setValue } = useForm({
        defaultValues: {
            email: '',
            name: '',
            surname: '',
            type_document: '',
            document: '',
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
                avatar.src = `${BASE_URL_MEDIA}/${dataUser.person.img_url}` || '/assets/img/sinFoto.png';
            }
        })
    }

    const onSubmit = async (dataValue) => {
        reset();
        setOpenFormUpdate(false);
        toast.success('Usuario actualizado')
    };

    return (
        <>
            <Dialog
                open={openFormUpdate}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                handler={() => setOpenFormUpdate(!openFormUpdate)}
                size="md"
                className="overflow-y-auto max-h-[90vh]"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader
                        className="text-gray-700"
                    >
                        Detalles usuario
                    </DialogHeader>
                    <DialogBody>

                        <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
                            <div className="grid grid-cols-1">
                                <Avatar
                                    src={dataUser ? `${BASE_URL_MEDIA}/${dataUser.person.img_url}` : '/assets/img/sinFoto.png'}
                                    alt="avatar"
                                    id="avatar"
                                    size="xxl"
                                    className="m-auto"
                                />
                                <div className="hidden" >
                                    <Input
                                        type="file"
                                        label="Subir archivo"
                                        id="inputUpload"
                                        accept="image/*"
                                        {...register('img_url')}
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
                                <Input type="text" label="Correo electronico" {...register('email')} />
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
                                        value={dataUser.person.type_document}
                                    >
                                        {
                                            TYPE_DOCUMENT.map(document => (
                                                <Option key={document.value} value={document.value}>{document.title}</Option>
                                            ))
                                        }

                                    </Select>
                                )}
                            />

                            <Input type="text" label="No documento" {...register('no_document')} />
                            <Input type="text" label="Pais" {...register('country')} />
                            <Input type="text" label="Ciudad" {...register('city')} />
                            <Input type="text" label="Celular" {...register('phone')} />
                            <Input type="date" label="Fecha de nacimiento" {...register('birthday')} />
                        </div>
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => setOpenFormUpdate(!openFormUpdate)}
                            className="mr-1"
                        >
                            <span>Cancelar</span>
                        </Button>
                        <Button type="submit" variant="gradient" color="yellow">
                            <span>Editar</span>
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