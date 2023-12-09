import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Avatar, Card, Chip, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { BASE_URL_MEDIA } from "../../../../environment/env-dev";
import { useState } from "react";
import { useAxios } from "../../../../utils/axios.instance";
import toast, { Toaster } from "react-hot-toast";
import { ModalDelete } from "../../../../components/private/ModalDelete";
import { AlmacenFormUpdate } from "./AlmacenFormUpdate";
import { dataProductos } from "../../../../const/Data";

const TABLE_HEAD = ["Producto", "Categoria", "Subcategoria", "Marca", "Cantidad", "Estado", "Precio unidad", "Costo unidad", "Provedor",  ""];

export const AlmacenTable = () => {
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const handleClickDelete = (id) => {
        setShowDelete(!showDelete);
    }
    const handleClickUpdate = (product) => {
        setCurrentProduct(product);
        setShowUpdate(true);
    }
    const handleDelete = async () => {
        toast.success("Producto eliminado");
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
                            dataProductos.length === 0 ?
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
                                dataProductos.map((product, index) => {
                                    const { _id, name, brand, quantity, unit_price, unit_cost, supplier, img_url, subcategory } = product;
                                    const isLast = index === dataProductos.length - 1;
                                    const classes = isLast ? "p-4 border-b border-blue-gray-50" : "p-4 border-b border-blue-gray-50";
                                    return (
                                        <tr key={name}>
                                            <td className={`${classes} flex justify-start items-center`}>
                                                <Avatar
                                                    src={img_url ? `${BASE_URL_MEDIA}${img_url}` : '/assets/img/sinFoto.png'}
                                                    title={img_url ? 'Perfil' : 'Sin perfil'}
                                                    alt="avatar"
                                                    size="md"
                                                    variant="square"
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
                                                    {subcategory.name}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {subcategory.category.name}
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
                                                    {quantity.toLocaleString()}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={quantity === 0 ? "No disponible" : quantity > 1 && quantity <= 5 ? "Pocas unidades" : "Disponible"}
                                                        color={quantity === 0 ? "red" : quantity > 1 && quantity <= 5 ? "yellow" : "green"}
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {unit_price.toLocaleString()}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {unit_cost.toLocaleString()}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {supplier.name}
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
            />
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    );
}