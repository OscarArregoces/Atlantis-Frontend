import { Button, Dialog, Card, Typography, CardHeader, CardBody, CardFooter, Tooltip, IconButton, Input } from "@material-tailwind/react"
import { PencilIcon, PlusIcon, TrashIcon, } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useAxios } from "../../../../utils/axios.instance";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ModalDelete } from "../../../../components/private/ModalDelete";
import { dataCategorias } from "../../../../const/Data";

const TABLE_HEAD = ["Categoria", "Acciones"];

function CategoryDashboard({ setDisplay }) {
    return (
        <>
            <Card className="w-full rounded-none shadow-sm">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 gap-8 flex flex-col justify-center items-start md:flex md:flex-row md:items-center md:justify-between lg:flex lg:flex-row lg:items-center lg:justify-between ">
                        <div>
                            <div className="w-full mb-3 flex justify-end md:hidden lg:hidden">
                                <Button
                                    color="gray"
                                    onClick={() => setDisplay(display => !display)}
                                >
                                    <span>Salir</span>
                                </Button>
                            </div>
                            <Typography variant="h5" color="blue-gray">
                                Listado de las categorias
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Accede a información de las categorias y trabaja con ellas a tu gusto.
                            </Typography>
                        </div>
                        <Button
                            color="gray"
                            onClick={() => setDisplay(display => !display)}
                            className="mr-1 hidden md:block lg:block"
                        >
                            <span>Salir</span>
                        </Button>

                    </div>
                </CardHeader>
            </Card>
        </>
    )
}

function CategoryTable({ setCurrentEdit }) {
    const [displayDelete, setDisplayDelete] = useState(false);
    const [idCategory, setIdCategory] = useState(null);
    
    const handleClick = (idCategory) => {
        setIdCategory(idCategory);
        setDisplayDelete(!displayDelete);
    }
    const handleDelete = async () => {
        toast.success("Categoria eliminada");
    }

    const handleEdit = (_id, name) => {
        if (!_id || !name) return;
        setCurrentEdit({ _id: _id, name: name });
    }

    return (
        <Card className="h-full w-full min-h-[50vh] max-h-[50vh] overflow-y-auto  rounded-none">
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
                        dataCategorias.length === 0 ? <tr><td>No hay categorias</td><td>---</td></tr> :
                        dataCategorias.map(({ _id, name }, index) => {
                                const isLast = index === dataCategorias.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={name}>
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
                                            <Tooltip content="Editar categoria">
                                                <IconButton variant="text" onClick={() => handleEdit(_id, name)}>
                                                    <PencilIcon className="h-5 w-5" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip content="Eliminar categoria">
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


function CategoryForm({ getCategories, currentEdit, setCurrentEdit }) {

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
    const onSubmit = async (dataValue) => {
        if (!currentEdit) {
            const { data } = await useAxios.post('/category', dataValue);
            if (data.error) {
                return toast.error("Hubo un problema");
            } else {
                await getCategories();
                toast.success("Categoria guardada");
                return reset();
            }
        }
        const { _id } = currentEdit;
        const { data } = await useAxios.patch(`/category/${_id}`, dataValue);
        if (data.error) {
            toast.error("Hubo un problema");
        } else {
            await getCategories();
            setCurrentEdit(null);
            toast.success("Categoria actualizada");
            reset();
        }
    }
    useEffect(() => {
        if (currentEdit) {
            const { name } = currentEdit;
            setValue("name", name);
        }
    }, [currentEdit])

    return (
        <Card className="w-96">
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardHeader
                    variant="gradient"
                    color="cyan"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Categorias
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Nombre" size="lg" {...register('name', { required: true })} />
                    {errors.name && errors.name.type === "required" && (
                        <span className="text-start text-red-500 text-sm">Campo requerido</span>
                    )}
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" type="submit" color={currentEdit && "yellow"} fullWidth>
                        {
                            currentEdit ? "Actualizar" : "Crear"
                        }
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
export const MangeCategory = ({ display, setDisplay }) => {
    return (
        <Dialog open={display} size="xl" className="min-h-[50vh] max-h-[90vh] overflow-y-auto">
            <CategoryDashboard
                setDisplay={setDisplay}
            />
            <div className="
                flex flex-col justify-center items-center
                md:flex md:flex-row
                lg:flex lg:flex-row
            ">
                <div className="
                    w-full mb-5 md:w-1/2 lg:w-1/2 
                    flex justify-center items-center
                ">
                    <CategoryForm />
                </div>
                <div className="
                    w-full md:w-1/2 lg:w-1/2
                ">
                    <CategoryTable />
                </div>
            </div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </Dialog>
    )
}
