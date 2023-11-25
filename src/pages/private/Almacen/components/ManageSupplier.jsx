import { Button, Dialog, Card, Typography, CardHeader, CardBody, CardFooter, Tooltip, IconButton, Input } from "@material-tailwind/react"
import { PencilIcon, TrashIcon, } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useAxios } from "../../../../utils/axios.instance";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ModalDelete } from "../../../../components/private/ModalDelete";

const TABLE_HEAD = ["Nombre", "Telefono", "Correo electronico", "Ciudad", "Direccion", "Acciones"];

function SupplierDashboard({ setDisplay }) {
    return (
        <>
            <Card className="w-full h-24 rounded-none shadow-sm">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 gap-8 flex flex-col justify-center items-start md:flex md:flex-row md:items-center md:justify-between lg:flex lg:flex-row lg:items-center lg:justify-between ">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Listado de los proveedores
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Accede a información de los proveedores y trabaja con ellas a tu gusto.
                            </Typography>
                        </div>
                        <Button
                            color="gray"
                            onClick={() => setDisplay(display => !display)}
                            className="mr-1"
                        >
                            <span>Salir</span>
                        </Button>

                    </div>
                </CardHeader>
            </Card>
        </>
    )
}

function SupplierTable({ suppliers, getSuppliers }) {
    const [displayDelete, setDisplayDelete] = useState(false);
    const [idSupplier, setIdSupplier] = useState(null);
    const handleClick = (id) => {
        setIdSupplier(id);
        setDisplayDelete(!displayDelete);
    }
    const handleDelete = async () => {
        const { data } = await useAxios.delete(`/supplier/${idSupplier}`);
        if (data.error) {
            toast.error("Error en consulta");
        } else {
            await getSuppliers();
        }
    }

    return (
        <Card className="w-full h-[calc(100vh-6rem)]  max-h-[calc(100vh-6  rem)] overflow-y-auto  rounded-none">
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
                        suppliers.length === 0 ? <tr><td>No hay proveedores</td><td>---</td></tr> :
                            suppliers.map(({ _id, name, phone, email, city, address }, index) => {
                                const isLast = index === suppliers.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
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
                                                {phone}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {email}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {city}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {address}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Editar proveedor">
                                                <IconButton variant="text" >
                                                    <PencilIcon className="h-5 w-5" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Eliminar proveedor">
                                                <IconButton variant="text" onClick={() => handleClick(_id)} >
                                                    <TrashIcon className="h-5 w-5" />
                                                </IconButton>
                                            </Tooltip>

                                        </td>
                                    </tr>
                                );
                            })}
                </tbody>
            </table>
            <ModalDelete
                display={displayDelete}
                setDisplay={setDisplayDelete}
                deleteFnc={handleDelete}
            />
        </Card>
    );
}


function SupplierForm({ getSuppliers }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (dataValue) => {
        const { data } = await useAxios.post('/supplier', dataValue);
        if (data.error) {
            toast.error("Error en consulta");
        } else {
            await getSuppliers();
            reset();
        }
    }
    return (
        <Card className="w-96">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader
                    variant="gradient"
                    color="cyan"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Proveedores
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <div>
                        <Input label="Nombre" size="lg" type="text" {...register('name', { required: true })} />
                        {errors.name && errors.name.type === "required" && (
                            <span className="text-start text-red-500 text-sm">Campo requerido</span>
                        )}
                    </div>
                    <div>
                        <Input label="Telefono" size="lg" type="number" {...register('phone', { required: true })} />
                        {errors.name && errors.name.type === "required" && (
                            <span className="text-start text-red-500 text-sm">Campo requerido</span>
                        )}
                    </div>
                    <div>
                        <Input label="Correo electronico" size="lg" type="email" {...register('email', { required: true })} />
                        {errors.name && errors.name.type === "required" && (
                            <span className="text-start text-red-500 text-sm">Campo requerido</span>
                        )}
                    </div>
                    <div>
                        <Input label="Ciudad" size="lg" type="text" {...register('city', { required: true })} />
                        {errors.name && errors.name.type === "required" && (
                            <span className="text-start text-red-500 text-sm">Campo requerido</span>
                        )}
                    </div>
                    <div>
                        <Input label="Direccion" size="lg" type="text" {...register('address', { required: true })} />
                        {errors.name && errors.name.type === "required" && (
                            <span className="text-start text-red-500 text-sm">Campo requerido</span>
                        )}
                    </div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" type="submit" fullWidth>
                        Crear
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
export const ManageSupplier = ({ display, setDisplay, getSuppliers, suppliers }) => {

    useEffect(() => {
        getSuppliers();
    }, [])


    return (
        <Dialog open={display} size="xxl" className="bg-gray-200" >
            <SupplierDashboard
                setDisplay={setDisplay}
            />
            <div className="flex">
                <div className="w-1/3 h-[calc(100vh-6rem)] flex justify-center items-center">
                    <SupplierForm
                        getSuppliers={getSuppliers}
                    />
                </div>
                <div className="w-2/3 h-[calc(100vh-6rem)]">
                    <SupplierTable
                        suppliers={suppliers}
                        getSuppliers={getSuppliers}
                    />
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </Dialog>
    )
}
