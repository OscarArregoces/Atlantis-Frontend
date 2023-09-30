import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Typography, ListItem, ListItemPrefix } from '@material-tailwind/react'
import { UserCircleIcon, Cog6ToothIcon, PowerIcon, } from "@heroicons/react/24/solid";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
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
                    <Typography
                        variant="h5"
                        color="white"
                        className='hover:scale-110 ease-in duration-200 block'
                    >
                        EMPRESA
                    </Typography>
                </div>
                <div className='w-1/2 h-full flex justify-end items-center'>
                    <Menu>
                        <MenuHandler>
                            <div className='cursor-pointer flex justify-end items-center gap-2 mr-4'>
                                <Avatar src="/assets/img/avatar.jpg" alt="avatar" size='sm' />
                            </div>
                        </MenuHandler>
                        <MenuList className='rounded-none mt-1'>
                            <MenuItem>
                                <ListItem onClick={() => navigate('perfil')}>
                                    <ListItemPrefix>
                                        <UserCircleIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Perfil
                                </ListItem>
                            </MenuItem>
                            <MenuItem>
                                <ListItem>
                                    <ListItemPrefix>
                                        <Cog6ToothIcon className="h-5 w-5" />
                                    </ListItemPrefix>
                                    Configuraciones
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
        </header>
    )
}
