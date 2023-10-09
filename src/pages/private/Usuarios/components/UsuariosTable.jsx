import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Avatar, Card, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { TABLE_ROWS } from "../../../../const/TABLE_ROWS";
import { useEffect, useState } from "react";
import { UsuariosFormUpdate } from "./UsuariosFormUpdate";
import { UsuariosFormDelete } from "./UsuariosFormDelete";
import { UsuariosDetails } from "./UsuariosDetails";
import { useAxios } from "../../../../utils/axios.instance";
import { BASE_URL_MEDIA } from "../../../../environment/env-dev";

const TABLE_HEAD = ["Miembro", "Pais", "Ciudad", "Correo", "Telefono", "Acciones"];

export const UsuariosTable = ({ data, getUser }) => {

    const [openFormUpdate, setOpenFormUpdate] = useState(false);
    const [openFormDelete, setOpenFormDelete] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [userId, setUserId] = useState(null);
    const handelDelete = (id) =>{
        setOpenFormDelete(true);
        setUserId(id)
    }
    const deleteUser = async (id) => {
        const { data } = await useAxios.delete(`/person/${id}`)
    }
    return (
        <Card className="h-[calc(100vh-221.5px)] w-full max-h-[calc(100vh-221.5px)] rounded-none overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(({ email, person }, index) => {
                        const { name, surname, no_document, country, city, phone, img_url } = person;
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";
                        return (
                            <tr key={email}>
                                <td className={`${classes} flex justify-start items-center`}>
                                    <Avatar
                                        src={img_url ? `${BASE_URL_MEDIA}${img_url}` : '/assets/img/img_notFound.png'}
                                        title={img_url ? 'Perfil' : 'Sin perfil'}
                                        alt="avatar"
                                        size="md"
                                    />
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal ml-2"
                                    >
                                        {(name & surname) ? `${name} ${surname}` : name ? name : '-----'}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {country ? country : '-----'}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {city ? city : '-----'}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {email ? email : '-----'}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal"
                                    >
                                        {phone ? phone : '-----'}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Tooltip content="Ver detalles">
                                        <IconButton variant="text" onClick={() => setOpenDetails(!openDetails)}>
                                            <EyeIcon className="h-5 w-5" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip content="Editar usuario">
                                        <IconButton variant="text" onClick={() => setOpenFormUpdate(!openFormUpdate)}>
                                            <PencilIcon className="h-5 w-5" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip content="Eliminar usuario">
                                        <IconButton variant="text" onClick={() => handelDelete()}>
                                            <TrashIcon className="h-5 w-5" />
                                        </IconButton>
                                    </Tooltip>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <UsuariosFormUpdate
                data={data}
                openFormUpdate={openFormUpdate}
                setOpenFormUpdate={setOpenFormUpdate}
            />
            <UsuariosFormDelete
                openFormDelete={openFormDelete}
                setOpenFormDelete={setOpenFormDelete}
            />
            <UsuariosDetails
                openDetails={openDetails}
                setOpenDetails={setOpenDetails}
            />
        </Card>
    );
}