import { Button, Dialog, Card, Typography, CardHeader, CardBody, CardFooter, Tooltip, IconButton, Input, Select, Option } from "@material-tailwind/react"
import { PencilIcon, PlusIcon, TrashIcon, } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useAxios } from "../../../../utils/axios.instance";
import toast, { Toaster } from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { ModalDelete } from "../../../../components/private/ModalDelete";

const TABLE_HEAD = ["Subcategoría", "Categoría", "Acciones"];

function SubCategoryDashboard({ setDisplay }) {
    return (
        <>
            <Card className="w-full rounded-none shadow-sm">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 gap-8 flex flex-col justify-center items-start md:flex md:flex-row md:items-center md:justify-between lg:flex lg:flex-row lg:items-center lg:justify-between ">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Listado de las subcategorías
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Accede a información de las subcategorías y trabaja con ellas a tu gusto.
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

function SubCategoryTable({ subCategories, getSubCategories }) {
    const [displayDelete, setDisplayDelete] = useState(false);
    const [idSubCategory, setIdSubCategory] = useState(null);
    const handleClick = (id) => {
        setIdSubCategory(id);
        setDisplayDelete(!displayDelete);
    }
    const handleDelete = async () => {
        const { data } = await useAxios.delete(`/subcategory/${idSubCategory}`);
        if (data.error) {
            toast.error("Error en consulta");
        } else {
            await getSubCategories();
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
                        subCategories.length === 0 ? <tr><td>No hay subcategorias</td><td>---</td></tr> :
                            subCategories.map(({ _id, name, category }, index) => {
                                const isLast = index === subCategories.length - 1;
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
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {category.name}
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


function SubCategoryForm({ getSubCategories }) {
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        async function getCategories() {
            const { data } = await useAxios.get('/category');
            if (data.error) {
                toast.error("Error en consulta");
            } else {
                setCategories(data.data)
            }
        }
        getCategories()
    }, [])

    const onSubmit = async (dataValue) => {
        const { data } = await useAxios.post('/subcategory', dataValue);
        if (data.error) {
            toast.error("Error en consulta");
        } else {
            await getSubCategories();
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
                        Subcategorías
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Nombre" size="lg" {...register('name', { required: true })} />
                    {errors.name && errors.name.type === "required" && (
                        <span className="text-start text-red-500 text-sm">Campo requerido</span>
                    )}
                    <Controller
                        rules={{ required: true }}
                        name="category"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select
                                label="Categoria"
                                {...field}
                            >
                                {
                                    categories.map(category => (
                                        <Option key={category._id} value={category._id}>{category.name}</Option>
                                    ))
                                }
                            </Select>
                        )}
                    />
                    {errors.type_document && errors.type_document.type === "required" && (
                        <span className="text-center text-red-500 text-sm">Campo requerido</span>
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
export const MangeSubCategory = ({ display, setDisplay }) => {

    const [subCategories, setSubCategories] = useState([]);
    const getSubCategories = async () => {
        const { data } = await useAxios.get('/subcategory');
        if (data.error) {
            toast.error("Error en consulta");
        } else {
            setSubCategories(data.data)
        }
    }

    useEffect(() => {
        getSubCategories();
    }, [])


    return (
        <Dialog open={display} size="xl" className="min-h-[50vh]">
            <SubCategoryDashboard
                setDisplay={setDisplay}
            />
            <div className="flex">
                <div className="w-1/2 flex justify-center items-center">
                    <SubCategoryForm
                        getSubCategories={getSubCategories}
                    />
                </div>
                <div className="w-1/2">
                    <SubCategoryTable
                        subCategories={subCategories}
                        getSubCategories={getSubCategories}
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
