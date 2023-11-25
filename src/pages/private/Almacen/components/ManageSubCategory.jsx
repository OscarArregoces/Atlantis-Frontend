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
                            <div className="w-full mb-3 flex justify-end md:hidden lg:hidden">
                                <Button
                                    color="gray"
                                    onClick={() => setDisplay(display => !display)}
                                >
                                    <span>Salir</span>
                                </Button>
                            </div>
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

function SubCategoryTable({ subCategories, getSubCategories, setCurrentEdit }) {
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
    const handleEdit = async (subcategory) => {
        if (!subcategory) return;
        setCurrentEdit(subcategory)
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
                                                <IconButton variant="text" onClick={() => handleEdit({
                                                    _id: _id,
                                                    name: name,
                                                    category: category._id,
                                                })} >
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


function SubCategoryForm({ getSubCategories, currentEdit, setCurrentEdit }) {
    const { register, handleSubmit, reset, formState: { errors }, control, setValue } = useForm();
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
    useEffect(() => {
        if (currentEdit) {
            const { _id, name, category } = currentEdit;
            setValue("name", name);
            setValue("category", category);
        }
    }, [currentEdit])

    const onSubmit = async (dataValue) => {
        if (!currentEdit) {
            const { data } = await useAxios.post('/subcategory', dataValue);
            if (data.error) {
                return toast.error("Hubo un problema");
            } else {
                toast.success("Subcategoria creada");
                await getSubCategories();
                return reset();
            }
        }
        const { _id } = currentEdit;
        const { data } = await useAxios.patch(`/subcategory/${_id}`, dataValue);
        if (data.error) {
            toast.error("Hubo un problema");
        } else {
            toast.success("Subcategoria actualizada");
            setCurrentEdit(null);
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
export const MangeSubCategory = ({ display, setDisplay }) => {

    const [currentEdit, setCurrentEdit] = useState(null)
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
        <Dialog open={display} size="xl" className="min-h-[50vh] max-h-[90vh] overflow-y-auto">
            <SubCategoryDashboard
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
                    <SubCategoryForm
                        getSubCategories={getSubCategories}
                        currentEdit={currentEdit}
                        setCurrentEdit={setCurrentEdit}
                    />
                </div>
                <div className="
                     w-full md:w-1/2 lg:w-1/2
                ">
                    <SubCategoryTable
                        subCategories={subCategories}
                        getSubCategories={getSubCategories}
                        setCurrentEdit={setCurrentEdit}
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
