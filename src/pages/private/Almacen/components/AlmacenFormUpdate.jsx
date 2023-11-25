import React, { useEffect, useState } from "react";
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
import { useAxios, useAxiosWithFile } from "../../../../utils/axios.instance";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL_MEDIA } from "../../../../environment/env-dev";

export const AlmacenFormUpdate = ({ dataProduct, displayForm, setDisplayForm, getProducts }) => {
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

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const getCategories = async () => {
        const { data } = await useAxios.get('/category');
        if (data.error) {
            toast.error("Error en consulta");
        } else {
            setCategories(data.data)
        }
    }
    const getSuppliers = async () => {
        const { data } = await useAxios.get('/supplier');
        if (data.error) {
            toast.error("Error en consulta");
        } else {
            setSuppliers(data.data)
        }
    }
    useEffect(() => {
        getCategories();
        getSuppliers();
    }, [])

    const onChangeCategory = async (category_id) => {
        if (!category_id) {
            setValue("category", "");
        }
        resetField("subcategory")
        const { data } = await useAxios.get(`/subcategory/byCategory/${category_id}`);
        setSubcategories(data.data);
    }


    useEffect(() => {
        if (dataProduct) {
            const newData = {
                name: dataProduct.name,
                brand: dataProduct.brand,
                quantity: dataProduct.quantity,
                unit_price: dataProduct.unit_price,
                unit_cost: dataProduct.unit_cost,
                supplier: dataProduct.supplier,
                img_url: dataProduct.img_url,
                category: dataProduct.subcategory.category._id,
                subcategory: dataProduct.subcategory._id,
                reference: dataProduct.reference,
            }
            Object.keys(newData).forEach((fieldName) => {
                setValue(fieldName, newData[fieldName]);
            });
        }

        if (dataProduct) {
            async function getSubcategory() {
                const { data } = await useAxios.get(`/subcategory/byCategory/${dataProduct.subcategory.category._id}`);
                setSubcategories(data.data);
            }
            getSubcategory();
        }

    }, [dataProduct])

    const onSubmit = async (dataValue) => {
        const newDataValue = {
            ...dataValue,
            img_url: typeof (dataValue.img_url) === 'object' ? dataValue.img_url[0] : dataProduct.img_url,
            quantity: Number(dataValue.quantity),
            unit_price: Number(dataValue.unit_price),
            unit_cost: Number(dataValue.unit_cost),
            supplier: dataValue.supplier._id,
        }
        const formData = new FormData();
        for (const fileName in newDataValue) {
            formData.append(fileName, newDataValue[fileName]);
        }
        const { data } = await useAxiosWithFile('patch', `/product/${dataProduct._id}`, formData);
        if (data.error) {
            toast.error("Hubo un problema");
        } else {
            reset();
            setDisplayForm(false);
            getProducts();
            toast.success('Producto actualizado')
        }
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
                avatar.src = `${BASE_URL_MEDIA}/${dataProduct.img_url}` || '/assets/img/sinFoto.png';
            }
        })
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
                                    src={BASE_URL_MEDIA + dataProduct?.img_url || '/assets/img/sinFoto.png'}
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
                                        {...register('img_url')}
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
                                            value={dataProduct.subcategory.category._id}
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
                                    // render={({ field: { onChange, onBlur, value } }) => {
                                    render={({ field }) => {
                                        return (
                                            <Select
                                                label="Subcategoria"
                                                value={dataProduct.subcategory._id}
                                                // onChange={onChange}
                                                // onBlur={onBlur}
                                                // value={value}
                                                {...field}
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
                                            value={dataProduct.supplier._id}
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