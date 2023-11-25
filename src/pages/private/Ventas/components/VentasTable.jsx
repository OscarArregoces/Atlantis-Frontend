import { ClipboardDocumentCheckIcon, ClipboardDocumentListIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
    Card,
    Typography,
    CardBody,
    IconButton,
    Tooltip,
    Chip,
} from "@material-tailwind/react";
import { ConverDate } from "../../../../utils/ConvertDate";
import { useState } from "react";
import { VentasDetails } from "./VentasDetails";

const TABLE_HEAD = ["#", "Nombre cliente", "Celular cliente", "Valor", "Fecha", "Detalles"];


export const VentasTable = ({ sales = [] }) => {

    const [displayDetails, setDisplayDetails] = useState(false);
    const [dataDetail, setDataDetail] = useState({
        "_id": "",
        "client_name": "",
        "client_phone": "",
        "products": [],
        "createdAt": "",
        "updatedAt": ""
    });

    const handleDetail = (currentSale) => {
        setDataDetail(currentSale);
        setDisplayDetails(!displayDetails)
    }

    return (
        <Card className="h-[calc(100vh-221.5px)] w-full max-h-[calc(100vh-221.5px)] rounded-none overflow-scroll">
            <CardBody className="px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
                        {sales.map(
                            (
                                sale,
                                index,
                            ) => {
                                const {
                                    _id,
                                    client_name,
                                    client_phone,
                                    createdAt: fecha,
                                    totalSale
                                } = sale;
                                const isLast = index === sales.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {index + 1}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {client_name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {client_phone}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={totalSale.toLocaleString() + " " + "COP"}
                                                    color="green"
                                                />
                                            </div>
                                        </td>
                                        {/* <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {totalSale.toLocaleString()} COP
                                            </Typography>
                                        </td> */}
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {ConverDate(fecha)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Mostrar detalles">
                                                <IconButton variant="text" onClick={() => handleDetail(sale)}>
                                                    <ClipboardDocumentListIcon className="h-5 w-5" />
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <VentasDetails
                display={displayDetails}
                setDisplay={setDisplayDetails}
                dataDetail={dataDetail}
            />
            {/* {
                dataDetail
                &&
                <VentasDetails
                    display={displayDetails}
                    setDisplay={setDisplayDetails}
                    dataDetail={dataDetail}
                />
            } */}
        </Card>
    );
}