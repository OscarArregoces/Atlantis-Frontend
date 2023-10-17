import { Button, Dialog, Card, Typography, CardHeader, CardBody, CardFooter, Tooltip, IconButton, Input } from "@material-tailwind/react"
import { PencilIcon, PlusIcon, TrashIcon, } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useAxios } from "../../../../utils/axios.instance";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { ModalDelete } from "../../../../components/private/ModalDelete";

const TABLE_HEAD = ["Name", "Acciones"];

function CategoryDashboard({ setDisplay }) {
    return (
        <>
            <Card className="w-full rounded-none shadow-sm">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 gap-8 flex flex-col justify-center items-start md:flex md:flex-row md:items-center md:justify-between lg:flex lg:flex-row lg:items-center lg:justify-between ">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Listado de las categorias
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Accede a información de las categorias y trabaja cone ellas a tu gusto.
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

function CategoryTable({ categories, getCategories }) {
    const [displayDelete, setDisplayDelete] = useState(false);
    const [idCategory, setIdCategory] = useState(null);
    const handleClick = (idCategory) => {
        setIdCategory(idCategory);
        setDisplayDelete(!displayDelete);
    }
    const handleDelete = async () => {
        const { data } = await useAxios.delete(`/category/${idCategory}`);
        if (data.error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error en consulta',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            await getCategories();
        }
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
                        categories.length === 0 ? <tr><td>No hay categorias</td><td>---</td></tr> :
                            categories.map(({ _id, name }, index) => {
                                const isLast = index === categories.length - 1;
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
                                                <IconButton variant="text" >
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


function CategoryForm({ getCategories }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (dataValue) => {
        const { data } = await useAxios.post('/category', dataValue);
        if (data.error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error en consulta',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            await getCategories();
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
                    <Button variant="gradient" type="submit" fullWidth>
                        Crear
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
export const MangeCategory = ({ display, setDisplay }) => {

    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        const { data } = await useAxios.get('/category');
        if (data.error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Error en consulta',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            setCategories(data.data)
        }
    }

    useEffect(() => {
        getCategories();
    }, [])


    return (
        <Dialog open={display} size="xl" className="min-h-[50vh]">
            <CategoryDashboard
                setDisplay={setDisplay}
            />
            <div className="flex">
                <div className="w-1/2 flex justify-center items-center">
                    <CategoryForm
                        getCategories={getCategories}
                    />
                </div>
                <div className="w-1/2">
                    <CategoryTable
                        categories={categories}
                        getCategories={getCategories}
                    />
                </div>
            </div>
        </Dialog>
    )
}
