import { useState } from "react";
import {
    Drawer,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import { Sidebar, SidebarItem } from "./Sidebar";
import { ArchiveBoxIcon, CurrencyDollarIcon, HomeIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/solid";

export const SidebarBtn = () => {
    const [open, setOpen] = useState(false);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => {
        setOpen(false)
    };

    return (
        <>
            <Typography
                variant="h5"
                color="white"
                className='hover:scale-110 ease-in duration-200 block cursor-pointer'
                onClick={openDrawer}
            >
                EMPRESA
            </Typography>
            <Drawer open={open} onClose={closeDrawer} className="p-4">
                <div className="flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                        Empresa
                    </Typography>
                    <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <Sidebar>
                    <SidebarItem icon={<HomeIcon className="h-5 w-5" />} text="Inicio" path="dashboard" closeDrawer={closeDrawer} />
                    <SidebarItem icon={<UserIcon className="h-5 w-5" />} text="Usuarios" path="usuarios" closeDrawer={closeDrawer} />
                    <SidebarItem icon={<ShoppingBagIcon className="h-5 w-5" />} text="Ventas" path="ventas" closeDrawer={closeDrawer} />
                    <SidebarItem icon={<ArchiveBoxIcon className="h-5 w-5" />} text="Almacen" path="almacen" closeDrawer={closeDrawer} />
                    <SidebarItem icon={<CurrencyDollarIcon className="h-5 w-5" />} text="Economia" path="economia" closeDrawer={closeDrawer} />
                </Sidebar>
            </Drawer>
        </>
    );
}