import { Avatar, Menu, MenuHandler, MenuItem, MenuList, ListItem, ListItemPrefix, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Input, } from '@material-tailwind/react'
import { PowerIcon, IdentificationIcon, UserIcon, EyeSlashIcon, EyeIcon, ShieldCheckIcon, } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';
import { SidebarBtn } from './SidebarBtn';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useAxios } from '../../utils/axios.instance';
import { BASE_URL_MEDIA } from '../../environment/env-dev';

const ChangePasswordd = ({ display, setDisplay }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const { register, reset, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            password: "",
            newPassword: "",
        }
    });


    const onSubmit = async (dataValue) => {
        toast.success("Contraseña actualizada");
        reset();
        setDisplay(!display);
    }
    return (
        <Dialog open={display}>
            <DialogHeader className='flex gap-5'>
                <ShieldCheckIcon className='h-8 w-8' />
                Cambiar contraseña
            </DialogHeader>
            <DialogBody>
                <Typography variant='small' className='p-3'>
                    ¡Asegura tu cuenta! Cambia tu contraseña para mantener tu información segura y protegida. Elige una nueva contraseña fuerte que combine letras, números y caracteres especiales. Tu seguridad es nuestra prioridad, y este paso adicional garantiza un acceso seguro y confiable a tu cuenta en todo momento. Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full p-3 '>
                    <div className='flex flex-col justify-center items-center bg-gray-200 rounded-md p-3'>
                        <div className='w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center items-center my-2'>
                            <Input
                                label="Contraseña actual"
                                className='bg-white'
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
                                <span className="text-start text-red-500 text-sm">Campo requerido</span>
                            )}
                        </div>
                        <div className='w-full md:w-1/2 lg:w-1/2 flex flex-col justify-center items-center my-2'>
                            <Input
                                label="Contraseña nueva"
                                className='bg-white'
                                {...register('newPassword', { required: true })}
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
                            {errors.password && errors.password.type === "required" && (
                                <span className="text-start text-red-500 text-sm">Campo requerido</span>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-end items-center m-5'>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => setDisplay(!display)}
                            className="mr-1"
                        >
                            <span>Cancelar</span>
                        </Button>
                        <Button type='submit' variant="gradient" color="green">
                            <span>Guardar</span>
                        </Button>
                    </div>
                </form>
            </DialogBody>
            <Toaster
                position='top-right'
                reverseOrder={false}
            />
        </Dialog>
    );
}

export const Navbar = () => {
    const [display, setDisplay] = useState(false);
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login')
    }


    return (
        <header>
            <nav className='w-full h-14 bg-cyan-600 flex justify-center items-center'>
                <div className='w-1/2 h-full flex justify-start items-center ml-4'>
                    <SidebarBtn />
                </div>
                <div className='w-1/2 h-full flex justify-end items-center'>
                    <Menu>
                        <MenuHandler>
                            <div className='cursor-pointer flex justify-end items-center gap-2 mr-4'>
                                <Avatar src="/fakeData/harry.jpg" alt="avatar" size='sm' />
                            </div>
                        </MenuHandler>
                        <MenuList className='rounded-none mt-1'>
                            <MenuItem>
                                <ListItem onClick={() => navigate('perfil')}>
                                    <ListItemPrefix>
                                        <UserIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Perfil
                                </ListItem>
                            </MenuItem>
                            <MenuItem>
                                <ListItem onClick={() => setDisplay(!display)}>
                                    <ListItemPrefix>
                                        <IdentificationIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Cambiar constraseña
                                </ListItem>
                            </MenuItem>
                            <MenuItem>
                                <ListItem onClick={handleLogOut}>
                                    <ListItemPrefix>
                                        <PowerIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Salir
                                </ListItem>
                            </MenuItem>
                        </MenuList>
                    </Menu>

                </div>
            </nav>
            <ChangePasswordd
                display={display}
                setDisplay={setDisplay}
            />
        </header>
    )
}
