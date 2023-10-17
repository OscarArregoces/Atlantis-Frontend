import { CloudArrowUpIcon, EyeIcon, EyeSlashIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Avatar,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TYPE_DOCUMENT } from "../../../../const/TABLE_ROWS";
import { useAxios, useAxiosWithFile } from "../../../../utils/axios.instance";
import Swal from "sweetalert2";
import { BASE_URL_MEDIA } from "../../../../environment/env-dev";

export function Prueba() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(null);
    const { register, handleSubmit, control, formState: { errors }, setValue } = useForm();
    const handleGetUser = async (idUser) => {
        const { data } = await useAxios.get(`/person/${idUser}`);
        if (data.error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error en consulta',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            setUser(data.data)
        }
    }
    useEffect(() => {
        const userSession = JSON.parse(localStorage.getItem('user'));
        handleGetUser(userSession._id)
    }, []);
    useEffect(() => {
        if (user) {
            const newData = {
                email: user.email,
                password: user.password,
                name: user.person.name,
                surname: user.person.surname,
                type_document: user.person.type_document,
                no_document: user.person.no_document,
                country: user.person.country,
                city: user.person.city,
                phone: user.person.phone,
                birthday: user.person.birthday,
                img_url: user.person.img_url,
            }
            Object.keys(newData).forEach((fieldName) => {
                setValue(fieldName, newData[fieldName]);
            });

        }
    }, [user]);

    const onSubmit = async (dataValue) => {
        const newDataValue = { ...dataValue, img_url: dataValue.img_url[0] };
        const formData = new FormData();
        for (let fileName in newDataValue) {
            formData.append(fileName, newDataValue[fileName]);
        };
        const { data } = await useAxiosWithFile('patch', `/person/${user._id}`, formData)
        if (data.error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error en consulta',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Datos actualizados',
                showConfirmButton: false,
                timer: 1500
            })
        }
    };


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
        <Card className="w-full max-w-[834px]">
            <CardHeader color="cyan" variant="gradient">
                <Typography
                    variant="h1"
                    className="font-semibold text-white text-center"
                >
                    Perfil
                </Typography>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardBody>
                    <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
                        <div className="grid grid-cols-1">
                            <Avatar
                                 src={user ? `${BASE_URL_MEDIA}/${user.person.img_url}` : '/assets/img/sinFoto.png'}
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
                </CardBody>
                <CardBody>
                    <div>
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
                                    type="text"
                                    label="Fecha de nacimiento"
                                    {...register('birthday', { required: true })}
                                />
                                {errors.birthday && errors.birthday.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>
                        </div>
                    </div>

                </CardBody>
                <CardFooter className="flex justify-end pt-0">
                    <Button type="submit" variant="gradient" >
                        <span>Actualizar</span>
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}