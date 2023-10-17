import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Avatar, Card, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { BASE_URL_MEDIA } from "../../../../environment/env-dev";
import { useState } from "react";
import { useAxios } from "../../../../utils/axios.instance";
import Swal from "sweetalert2";
import { ModalDelete } from "../../../../components/private/ModalDelete";
import { AlmacenFormUpdate } from "./AlmacenFormUpdate";

const TABLE_HEAD = ["Producto", "Categoria", "Marca", "Cantidad", "Precio total", "Precio unidad", "Costo unidad", "Provedor", ""];

export const AlmacenTable = ({ products, getProducts }) => {
    const [idProduct, setIdProduct] = useState(null);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const handleClickDelete = (id) => {
        setIdProduct(id);
        setShowDelete(!showDelete);
    }
    const handleClickUpdate = (product) => {
        setCurrentProduct(product);
        setShowUpdate(true);
    }
    const handleDelete = async () => {
        const { data } = await useAxios.delete(`/product/${idProduct}`);
        if (data.error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error en consulta',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            getProducts();
        }
    }
    return (
        <>
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
                        {
                            products.length === 0 ?
                                <tr>
                                    <td>---</td>
                                    <td>---</td>
                                    <td>---</td>
                                    <td>---</td>
                                    <td>---</td>
                                    <td>---</td>
                                    <td>---</td>
                                    <td>---</td>
                                </tr>
                                :
                                products.map((product, index) => {
                                    const { _id, name, brand, quantity, total_price, unit_price, unit_cost, supplier, img_url, category } = product;
                                    const isLast = index === product.length - 1;
                                    const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={name}>
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
                                                    {name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {category.name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {brand}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {quantity}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {total_price}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {unit_price}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {unit_cost}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {supplier}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Tooltip content="Editar usuario">
                                                    <IconButton variant="text" onClick={() => handleClickUpdate(product)}>
                                                        <PencilIcon className="h-5 w-5" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Eliminar usuario">
                                                    <IconButton variant="text" onClick={() => handleClickDelete(_id)}>
                                                        <TrashIcon className="h-5 w-5" />
                                                    </IconButton>
                                                </Tooltip>

                                            </td>
                                        </tr>
                                    );
                                })}
                    </tbody>
                </table>
            </Card>
            <ModalDelete
                display={showDelete}
                setDisplay={setShowDelete}
                deleteFnc={handleDelete}
            />
            <AlmacenFormUpdate
                dataProduct={currentProduct}
                displayForm={showUpdate}
                setDisplayForm={setShowUpdate}
                getProducts={getProducts}
            />
        </>
    );
}