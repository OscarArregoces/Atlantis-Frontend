import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    Input,
    Card,
    CardBody,
    Typography,
    Select,
    Option,
    Avatar,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useAxios } from "../../../../utils/axios.instance";
import { BASE_URL_MEDIA } from "../../../../environment/env-dev";
import { ArrowSmallDownIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export const VentasFormCreate = ({ display, setDisplay, getSales }) => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValue: {
            client_name: "",
            client_phone: "",
        }
    });

    const getProducts = async () => {
        const { data } = await useAxios.get("/product");
        if (data.error) {
            return toast.error('Error en consulta');
        }
        setProducts(data.data);
    }

    useEffect(() => {
        getProducts();
    }, [])

    const onChangeProducts = async (idProduct) => {
        const { data } = await useAxios.get(`/product/${idProduct}`);
        if (data.error) {
            return toast.error('Error en consulta');
        }
        setProduct(data.data);
    }
    const handleAddCart = () => {
        if (!product) return;
        const cantidad = document.querySelector('#cantidad');

        product.cantidad = cantidad.value === "0" ? 1 : Number(cantidad.value);
        cantidad.value = "1";

        const totalPrice = product.unit_price * product.cantidad;
        product.totalPrice = totalPrice;

        const itemFound = cart.find((item) => item._id === product._id);

        if (!itemFound) {
            return setCart((state) => [...state, product]);
        }

        const newCart = cart.filter((item) => item._id !== itemFound._id);
        setCart(newCart);
        setCart((state) => [...state, product]);
    }
    const handleRemoveCart = (idProduct) => {
        const newCart = cart.filter((item) => item._id !== idProduct);
        setCart(newCart);
    }
    const onSubmit = async (dataValue) => {
        if (cart.length === 0) return toast.error('No hay productos');
        let totalSale = 0;
        const newCart = cart.map((item) => {
            totalSale += item.totalPrice;
            return { product: item._id, quantity: item.cantidad }
        });
        dataValue.products = newCart;
        dataValue.totalSale = totalSale;

        const { data } = await useAxios.post("/sale", dataValue);
        if (data.error) return toast.error(data.data);

        reset();
        setCart([]);
        setProduct(null);
        getSales();
        toast.success('Venta registrada');
        setTimeout(() => {
            setDisplay(!display)
        }, 1000);
    }


    return (
        <>
            <Dialog open={display} size="xl" className="overflow-y-auto max-h-[90vh]">
                <DialogHeader>Registrar venta</DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-full flex flex-col justify-items-center items-center md:flex md:flex-row md:gap-2 lg:flex lg:flex-row lg:gap-2">
                            <div className="w-full h-full md:w-1/2 md:h-[60vh] md:max-h-[60vh] lg:w-1/2 lg:h-[60vh] lg:max-h-[60vh] bg-gray-50 rounded-md p-2">
                                <Typography variant="lead" color="blue-gray" className="mb-2 text-center flex justify-center items-center gap-5">
                                <UserCircleIcon className="h-5 w-5" />
                                    Datos del cliente
                                </Typography>
                                <div className="w-full flex flex-col md:flex md:flex-col lg:flex lg:flex-row lg:gap-2">
                                    <div className="w-full my-1 md:w-full lg:w-1/2">
                                        <Input variant="outlined" label="Nombre del cliente" {...register("client_name", { required: true })} />
                                        {errors.client_name && errors.client_name.type === "required" && (
                                            <span className="text-red-400">Campo requeriddo</span>
                                        )}
                                    </div>
                                    <div className="w-full my-1 md:w-full lg:w-1/2">
                                        <Input type="number" variant="outlined" label="Telefono del cliente"  {...register("client_phone", { required: true })} />
                                        {errors.client_phone && errors.client_phone.type === "required" && (
                                            <span className="text-red-400">Campo requeriddo</span>
                                        )}
                                    </div>
                                </div>
                                <Card className="mt-12 w-full rounded-none">
                                    <CardBody>
                                        <Typography variant="lead" color="blue-gray" className="mb-2 text-center">
                                            Seleccionar productos
                                        </Typography>
                                        <Select label="Producto" onChange={(e) => onChangeProducts(e)}>
                                            {
                                                products.map((product) => (
                                                    <Option key={product._id} value={product._id}>{product.name}</Option>
                                                ))
                                            }
                                        </Select>
                                        {
                                            product &&
                                            <div className="my-3">
                                                <div className="flex">
                                                    <div className="w-1/2">
                                                        <Avatar
                                                            src={BASE_URL_MEDIA + product.img_url}
                                                            alt="avatar"
                                                            size="xxl"
                                                            color="blue"
                                                            withBorder={true}
                                                            className="p-0.5"
                                                        />
                                                    </div>
                                                    <div className="w-1/2">
                                                        <Typography
                                                            variant="lead"
                                                            className="text-end"
                                                        >
                                                            {product.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            className="text-end"
                                                        >
                                                            {product.reference}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            className="text-end"
                                                        >
                                                            {product.brand}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            className="text-end"
                                                        >
                                                            {product.unit_price.toLocaleString()} COP
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            className="text-end"
                                                        >
                                                            {product.subcategory.category.name + " - " + product.subcategory.name}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className="w-full flex flex-col items-start md:flex md:flex-col md:items-start lg:flex lg:flex-row lg:items-center">
                                                    <div className="w-1/2 mt-5">
                                                        <Input id="cantidad" variant="static" label="Cantidad" defaultValue={1} type="number" />
                                                    </div>
                                                    <div className="w-1/2 mt-5 lg:flex lg:justify-end">
                                                        <Button color="blue" onClick={handleAddCart}>Agregar</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="w-full h-full md:w-1/2 md:h-[60vh] md:max-h-[60vh] lg:w-1/2 lg:h-[60vh] lg:max-h-[60vh] bg-gray-50 rounded-md p-2 overflow-y-auto">
                                <Typography variant="lead" color="blue-gray" className="mb-2 text-center flex justify-center items-center gap-5">
                                    <ShoppingCartIcon className="h-5 w-5" />
                                    Carrito de compra
                                </Typography>
                                {
                                    cart.map(({ _id, img_url, name, reference, brand, unit_price, subcategory, cantidad }) => (
                                        <Card key={_id} className="m-auto my-2 p-2 w-[95%] rounded-none">
                                            <div className="my-3 flex justify-center items-center">
                                                <div className="w-1/2">
                                                    <Avatar
                                                        src={BASE_URL_MEDIA + img_url}
                                                        color="green"
                                                        alt="avatar"
                                                        size="xxl"
                                                        withBorder={true}
                                                        className="p-0.5"
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <Typography
                                                        variant="lead"
                                                        className="text-end"
                                                    >
                                                        {name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="text-end"
                                                    >
                                                        {reference}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="text-end"
                                                    >
                                                        {brand}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="text-end"
                                                    >
                                                        {unit_price.toLocaleString()} COP
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="text-end"
                                                    >
                                                        {subcategory.category.name + " - " + subcategory.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="text-end"
                                                    >
                                                        Cantidad: {cantidad}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div className="flex justify-end items-center">
                                                <div className="w-1/2 flex justify-start items-center">
                                                    <Typography
                                                        variant="small"
                                                        className="ml-3"
                                                    >
                                                        Subtotal: {(cantidad * unit_price).toLocaleString()}
                                                    </Typography>
                                                </div>

                                                <div className="w-1/2 flex justify-end items-center">

                                                    <Button variant="text" color="red" className="rounded-full" onClick={() => handleRemoveCart(_id)}>
                                                        Eliminar
                                                    </Button>
                                                </div>

                                            </div>
                                        </Card>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="w-full h-40 mt-2 flex justify-end items-center gap-2">
                            <Button
                                variant="text"
                                color="red"
                                onClick={() => setDisplay(!display)}
                                className="mr-1"
                            >
                                <span>Cancelar</span>
                            </Button>
                            <Button variant="gradient" color="green" type="submit">
                                <span>Guardar</span>
                            </Button>
                        </div>
                    </form>
                </DialogBody>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </Dialog>

        </>
    );
}