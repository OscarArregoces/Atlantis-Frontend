import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
    Select,
    Option,
    Avatar,
} from "@material-tailwind/react";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useAxios } from "../../../../utils/axios.instance";
import toast, { Toaster } from "react-hot-toast";
export const AlmacenFormCreate = ({ displayForm, setDisplayForm, getProducts, categories, suppliers }) => {
    const [subcategories, setSubcategories] = useState([]);
    const [categorySelected, setCategorySelected] = useState(true);
    const { register, handleSubmit, reset, control, formState: { errors }, setValue, resetField } = useForm({
        defaultValues: {
            name: '',
            brand: '',
            quantity: '',
            unit_price: '',
            unit_cost: '',
            supplier: '',
            img_url: '',
            category: '',
            subcategory: '',
            reference: '',
        }
    });
    const onSubmit = async (dataValue) => {
        reset();
        setDisplayForm(false);
        toast.success('Producto guardado')
    }
    const handleUpload = () => {
        const inputUpload = document.querySelector('#inputUpload');
        inputUpload.click();
        const avatar = document.querySelector('#avatar');
        inputUpload.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    avatar.src = e.target.result;
                }
                reader.readAsDataURL(e.target.files[0])
            } else {
                avatar.src = '/assets/img/sinFoto.png';
            }
        })
    }
    const onChangeCategory = async (category_id) => {
        // if (!category_id) {
        //     setValue("category", "");
        //     return setCategorySelected(true);
        // }
        // resetField("subcategory")
        // setCategorySelected(false);
        // const { data } = await useAxios.get(`/subcategory/byCategory/${category_id}`);
        // setSubcategories(data.data);
    }
    return (
        <>
            <Dialog
                open={displayForm}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                size="md"
                className="overflow-y-auto max-h-[90vh]"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader
                        className="text-gray-700"
                    >
                        Guardando productos
                    </DialogHeader>
                    <DialogBody>

                        <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
                            <div className="grid grid-cols-1">
                                <Avatar
                                    src="/assets/img/sinFoto.png"
                                    alt="avatar"
                                    id="avatar"
                                    variant="square"
                                    size="xxl"
                                    className="m-auto"
                                />
                                <div className="hidden" >
                                    <Input
                                        type="file"
                                        label="Subir archivo"
                                        accept="image/*"
                                        id="inputUpload"
                                        {...register('img_url', { required: true })}
                                    />

                                </div>
                                <Button
                                    variant="text"
                                    className="flex items-center gap-3 max-w-[200px] m-auto mt-2"
                                    onClick={handleUpload}
                                >
                                    <CloudArrowUpIcon className="h-5 w-5" />
                                    Cargar foto
                                </Button>
                                {errors.img_url && errors.img_url.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Debes cargar una foto</span>
                                )}
                            </div>
                            <div className="grid gap-4">
                                <div className="flex gap-2 mb-5">
                                    <ShoppingBagIcon className="h-5 w-5" />
                                    <Typography
                                        variant="small"
                                        className="font-semibold text-gray-700"
                                    >
                                        Datos del producto
                                    </Typography>

                                </div>
                                <div>
                                    <Input
                                        type="text"
                                        label="Nombre"
                                        {...register('name', { required: true })}
                                    />
                                    {errors.name && errors.name.type === "required" && (
                                        <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                    )}
                                </div>

                                <div>
                                    <Input
                                        type="text"
                                        label="Marca"
                                        {...register('brand', { required: true })}
                                    />
                                    {errors.brand && errors.brand.type === "required" && (
                                        <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        type="text"
                                        label="Codigo referencia"
                                        {...register('reference', { required: true })}
                                    />
                                    {errors.reference && errors.reference.type === "required" && (
                                        <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogBody>

                    <DialogBody>
                        <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
                            <div>
                                <Controller
                                    control={control}
                                    name="category"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur } }) => (
                                        <Select
                                            label="Categoria"
                                            onChange={(value) => {
                                                onChange(value);
                                                onChangeCategory(value);
                                            }}
                                            onBlur={onBlur}
                                        >
                                            {
                                                categories.map(category => (
                                                    <Option key={category._id} value={category._id}>{category.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                />
                                {errors.category && errors.category.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>
                            <div>
                                <Controller
                                    control={control}
                                    name="subcategory"
                                    rules={{ required: true }}
                                    defaultValue=""
                                    render={({ field }) => {
                                        return (
                                            <Select
                                                label="Subcategoria"
                                                {...field}
                                                disabled={categorySelected}
                                            >
                                                {
                                                    subcategories.map(subcategorie => (
                                                        <Option key={subcategorie._id} value={subcategorie._id}>{subcategorie.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        )
                                    }}
                                />
                                {errors.subcategory && errors.subcategory.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="number"
                                    label="Precio unidad"
                                    {...register('unit_price', { required: true })}
                                />
                                {errors.unit_price && errors.unit_price.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>

                            <div>
                                <Input
                                    type="number"
                                    label="Costo unidad"
                                    {...register('unit_cost', { required: true })}
                                />
                                {errors.unit_cost && errors.unit_cost.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>
                            <div>
                                <Controller
                                    control={control}
                                    name="supplier"
                                    rules={{ required: true }}
                                    render={({ field: { onChange, onBlur } }) => (
                                        <Select
                                            label="Proveedor"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        >
                                            {
                                                suppliers.map(supplier => (
                                                    <Option key={supplier._id} value={supplier._id}>{supplier.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                />
                                {errors.supplier && errors.supplier.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>
                            <div>
                                <Input
                                    type="number"
                                    label="Cantidad"
                                    {...register('quantity', { required: true })}
                                />
                                {errors.quantity && errors.quantity.type === "required" && (
                                    <span className="text-center text-red-500 text-sm">Campo requerido</span>
                                )}
                            </div>
                        </div>
                    </DialogBody>

                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => setDisplayForm(!displayForm)}
                            className="mr-1"
                        >
                            <span>Cancelar</span>
                        </Button>
                        <Button type="submit" variant="gradient" color="green">
                            <span>Guardar</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>

            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </>
    );
}