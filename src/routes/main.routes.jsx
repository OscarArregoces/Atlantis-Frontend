import { BrowserRouter, Route, Routes, createBrowserRouter, } from "react-router-dom";
import { PublicLayout } from '../layouts/PublicLayout';
import { PrivateLayout } from '../layouts/PrivateLayout';
import { Dashboard } from '../pages/private/Dashboard/Dashboard';
import { Perfil } from "../pages/private/Perfil/Perfil";
import { Usuarios } from "../pages/private/Usuarios/Usuarios";
import { Admin } from "../pages/private/Admin/Admin";
import { NotFound } from "../components/common/NotFound";
import { Ventas } from "../pages/private/Ventas/Ventas";
import { Almacen } from "../pages/private/Almacen/Almacen";
import { Login } from "../pages/public/Login";
import { Economia } from "../pages/private/Economia/Economia";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
    },
    {
        path: "*",
        element:  <NotFound />

    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "private",
        element: <PrivateLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'perfil',
                element: <Perfil />
            },
            {
                path: 'admin',
                element: <Admin />
            },
            {
                path: 'usuarios',
                element: <Usuarios />
            },
            {
                path: 'ventas',
                element: <Ventas />
            },
            {
                path: 'almacen',
                element: <Almacen />
            },
            {
                path: 'economia',
                element: <Economia />
            },
        ]
    },
]);

