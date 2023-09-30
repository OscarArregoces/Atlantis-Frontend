import { createBrowserRouter, } from "react-router-dom";
import  App  from '../App';
import { PublicLayout } from '../layouts/PublicLayout';
import { PrivateLayout } from '../layouts/PrivateLayout';
import { Dashboard } from '../pages/private/Dashboard/Dashboard';
import { Perfil } from "../pages/private/Perfil/Perfil";
import { Usuarios } from "../pages/private/Usuarios/Usuarios";
import { Admin } from "../pages/private/Admin/Admin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "*",
        element: <h1>PAGE NOT FOUND</h1>

    },
    {
        path: "login",
        element: <PublicLayout />,
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
                path: 'Admin',
                element: <Admin />
            },
            {
                path: 'Usuarios',
                element: <Usuarios />
            },
        ]
    },
]);