import { Card, Typography } from "@material-tailwind/react";

const TABLE_ROWS = [
    {
        description: "Pantalon",
        cantidad: 5,
        unit_price: 20000,
        unit_cost: 15000,
        line_total: 500000
    },
    {
        description: "Sueter",
        cantidad: 6,
        unit_price: 40000,
        unit_cost: 15588,
        line_total: 5360000
    },
    {
        description: "Tenis",
        cantidad: 12,
        unit_price: 10000,
        unit_cost: 5000,
        line_total: 120000
    },
    {
        description: "Camisa",
        cantidad: 5,
        unit_price: 20000,
        unit_cost: 15000,
        line_total: 500000
    },
    {
        description: "Tacones",
        cantidad: 6,
        unit_price: 40000,
        unit_cost: 15588,
        line_total: 5360000
    },
    {
        description: "Blusas",
        cantidad: 12,
        unit_price: 10000,
        unit_cost: 5000,
        line_total: 120000
    },
];
export const EconomiaTable = () => {
    return (
        <Card className="h-full w-full rounded-none shadow-none">
            <table className="w-full min-w-max table-auto text-left">
                <thead className="border-b border-blue-400 text-end">
                    <tr>
                        <th className="bg-cyan-100 p-4"                        >
                            <Typography
                                variant="small"
                                color="black"
                                className="font-normal leading-none text-start"
                            >
                                Descripción
                            </Typography>
                        </th>
                        <th className="bg-cyan-100 p-4"                        >
                            <Typography
                                variant="small"
                                color="black"
                                className="font-normal leading-none"
                            >
                                Cantidad
                            </Typography>
                        </th>
                        <th className="bg-cyan-100 p-4"                        >
                            <Typography
                                variant="small"
                                color="black"
                                className="font-normal leading-none"
                            >
                                Precio unidad
                            </Typography>
                        </th>
                        <th className="bg-cyan-100 p-4"                        >
                            <Typography
                                variant="small"
                                color="black"
                                className="font-normal leading-none"
                            >
                                Costo unidad
                            </Typography>
                        </th>
                        <th className="bg-cyan-100 p-4"                        >
                            <Typography
                                variant="small"
                                color="black"
                                className="font-normal leading-none"
                            >
                                Linea total
                            </Typography>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-cyan-100 border-b border-blue-400 text-end">
                    {TABLE_ROWS.map(({ description, cantidad, unit_price, unit_cost, line_total }, index) => {
                        const isLast = index === TABLE_ROWS.length - 1;
                        const classes = "p-4";

                        return (
                            <tr key={description}>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal text-start"
                                    >
                                        {description}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                    >
                                        {cantidad}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                    >
                                        {unit_price}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                    >
                                        {unit_cost}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography
                                        variant="small"
                                        color="gray"
                                        className="font-normal"
                                    >
                                        {line_total}
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