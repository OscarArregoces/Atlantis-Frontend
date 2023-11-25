import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Card,
    Avatar,
    Typography,
} from "@material-tailwind/react";
import { BASE_URL_MEDIA } from "../../../../environment/env-dev";
import { ConverDate } from "../../../../utils/ConvertDate";

export const VentasDetails = ({ display, setDisplay, dataDetail }) => {

    return (
        <Dialog open={display} size="xl">
            <DialogHeader>Detalles de venta</DialogHeader>
            <DialogBody className="bg-gray-100">
            <div className="rounded-none m-auto my-2 p-2 w-[95%] flex flex-col md:flex md:flex-row md:gap-5 lg:flex lg:flex-row lg:gap-5">
                    <div className="flex gap-2">
                        <Typography
                            variant="small"
                            className="text-end"
                        >
                            Cliente:
                        </Typography>
                        <Typography
                            variant="small"
                            className="text-end"
                            color="black"
                        >
                            {dataDetail.client_name}
                        </Typography>
                    </div>
                    <div className="flex gap-2">
                        <Typography
                            variant="small"
                            className="text-end"
                        >
                            Telefono:
                        </Typography>
                        <Typography
                            variant="small"
                            className="text-end"
                            color="black"
                        >
                            {dataDetail.client_phone}
                        </Typography>
                    </div>
                    <div className="flex gap-2">
                        <Typography
                            variant="small"
                            className="text-end"
                        >
                            Total:
                        </Typography>
                        <Typography
                            variant="small"
                            className="text-end"
                            color="black"
                        >
                            {dataDetail?.totalSale?.toLocaleString()} COP
                        </Typography>
                    </div>
                    <div className="flex gap-2">
                        <Typography
                            variant="small"
                            className="text-end"
                        >
                            Fecha:
                        </Typography>
                        <Typography
                            variant="small"
                            className="text-end"
                            color="black"
                        >
                              {ConverDate(dataDetail.createdAt)}
                        </Typography>
                    </div>
                </div>
                <div className="h-[50vh] max-h-[50vh] overflow-y-auto">
                    {
                        dataDetail.products.length > 0 &&
                        dataDetail.products.map(({ _id, product: { img_url, name, reference, brand, unit_price, subcategory }, quantity }) => (
                            <Card key={_id} className="rounded-none m-auto my-2 p-2 w-[95%]">
                                <div className="my-3 flex justify-center items-center">
                                    <div className="w-1/2">
                                        <Avatar
                                            src={BASE_URL_MEDIA + img_url}
                                            color="gray"
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
                                            Cantidad: {quantity}
                                        </Typography>
                                    </div>
                                </div>
                            </Card>
                        ))
                    }
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => setDisplay(!display)}
                    className="mr-1"
                >
                    <span>Volver</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}