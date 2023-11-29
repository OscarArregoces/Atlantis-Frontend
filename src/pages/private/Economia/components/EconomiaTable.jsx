import { Card, Spinner, Typography } from "@material-tailwind/react";


export const EconomiaTable = ({ tableRows }) => {
    if (!tableRows) {
        return (
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        )
    }
    return (
        <Card className="h-full w-full rounded-none shadow-none bg-cyan-100">
            <table className="w-full min-w-max table-auto text-left">
                <thead className="border-b border-blue-400 text-end">
                    <tr>
                        <th className="bg-cyan-100 p-4">
                            <Typography
                                variant="small"
                                className="text-normal text-black font-semibold leading-none text-start"
                            >
                                #
                            </Typography>
                        </th>
                        <th className="bg-cyan-100 p-4">
                            <Typography
                                variant="small"
                                className="text-normal text-black font-semibold leading-none text-start"
                            >
                                Producto
                            </Typography>
                        </th>
                        <th className="bg-cyan-100 p-4">
                            <Typography
                                variant="small"
                                className="text-normal text-black font-semibold leading-none text-end"
                            >
                                Cantidad actual
                            </Typography>
                        </th>
                        <th className="bg-cyan-100 p-4">
                            <Typography
                                variant="small"
                                className="text-normal text-black font-semibold leading-none text-end"
                            >
                                Cantidad vendida
                            </Typography>
                        </th>
                        <th className="bg-cyan-100 p-4">
                            <Typography
                                variant="small"
                                className="text-normal text-black font-semibold leading-none text-end"
                            >
                                Precio unidadd
                            </Typography>
                        </th>
                        <th className="bg-cyan-100 p-4">
                            <Typography
                                variant="small"
                                className="text-normal text-black font-semibold leading-none text-end"
                            >
                                Costo unidad
                            </Typography>
                        </th>
                        <th className="bg-cyan-100 p-4">
                            <Typography
                                variant="small"
                                className="text-normal text-black font-semibold leading-none text-end"
                            >
                                Ingresos generados
                            </Typography>
                        </th>
                        <th className="bg-cyan-100 p-4">
                            <Typography
                                variant="small"
                                className="text-normal text-black font-semibold leading-none text-end"
                            >
                                Ingresos por generar
                            </Typography>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-cyan-100 text-end">
                    {tableRows.map(({ product, current_quantity, quantity_sold, unit_price, unit_cost, generated, to_generate }, index) => {
                        const classes = "p-4";
                        return (
                            <tr key={product}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal text-start"
                                    >
                                        {index + 1}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal text-start"
                                    >
                                        {product}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal text-end"
                                    >
                                        {current_quantity.toLocaleString()}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal text-end"
                                    >
                                        {quantity_sold.toLocaleString()}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal text-end"
                                    >
                                        {unit_price.toLocaleString() + " " + "COP"}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal text-end"
                                    >
                                        {unit_cost.toLocaleString() + " " + "COP"}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal text-end"
                                    >
                                        {generated.toLocaleString() + " " + "COP"}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal text-end"
                                    >
                                        {to_generate.toLocaleString() + " " + "COP"}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
}