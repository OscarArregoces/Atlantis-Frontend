import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Avatar, Card, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { UsuariosFormUpdate } from "./UsuariosFormUpdate";
import { UsuariosDetails } from "./UsuariosDetails";
import { useAxios } from "../../../../utils/axios.instance";
import { BASE_URL_MEDIA } from "../../../../environment/env-dev";
import Swal from "sweetalert2";
import { ModalDelete } from "../../../../components/private/ModalDelete";

const TABLE_HEAD = ["Miembro", "Pais", "Ciudad", "Correo", "Telefono", "Acciones"];

export const UsuariosTable = ({ data, getUsers }) => {

    const [openFormUpdate, setOpenFormUpdate] = useState(false);
    const [openFormDelete, setOpenFormDelete] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);
    const [userId, setUserId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const handelDelete = (id) => {
        setOpenFormDelete(true);
        setUserId(id)
    }
    const handleUpdate = (user) => {
        setOpenFormUpdate(!openFormUpdate);
        setCurrentUser(user)
    }
    const deleteUser = async () => {
        if (userId) {
            const { data } = await useAxios.delete(`/person/${userId}`)
            if (data.error) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error en consulta',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            setTimeout(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Eliminado exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                })
            }, 1000);
            await getUsers()
        }
    };
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
                    {data.map((member, index) => {
                        const { _id, email, person } = member;
                        const { name, surname, no_document, country, city, phone, img_url } = person;
                        const isLast = index === data.length - 1;
                        const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";
                        return (
                            <tr key={email}>
                                <td className={`${classes} flex justify-start items-center`}>
                                    <Avatar
                                        src={img_url ? `${BASE_URL_MEDIA}${img_url}` : '/assets/img/sinFoto.png'}
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
                                        <IconButton variant="text" onClick={() => handleUpdate(member)}>
                                            <PencilIcon className="h-5 w-5" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip content="Eliminar usuario">
                                        <IconButton variant="text" onClick={() => handelDelete(_id)}>
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
                data={currentUser}
                openFormUpdate={openFormUpdate}
                setOpenFormUpdate={setOpenFormUpdate}
                getUsers={getUsers}
            />
            <ModalDelete
                display={openFormDelete}
                setDisplay={setOpenFormDelete}
                deleteFnc={deleteUser}
            />
            <UsuariosDetails
                openDetails={openDetails}
                setOpenDetails={setOpenDetails}
            />
        </Card>
    );
}