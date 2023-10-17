import { Card, CardHeader, Typography, Button, } from "@material-tailwind/react";
import { AdjustmentsVerticalIcon, ArchiveBoxIcon, PlusIcon, RectangleGroupIcon } from "@heroicons/react/24/solid";
import { VentasTable } from "./components/VentasTable";

function VentasDashboard() {
  return (
    <>
      <Card className="w-full rounded-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 gap-8 flex flex-col justify-center items-start md:flex md:flex-row md:items-center md:justify-between lg:flex lg:flex-row lg:items-center lg:justify-between ">
            <div>
              <Typography variant="h5" color="blue-gray">
                Historial de ventas
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Accede a información de todas las ventas
              </Typography>
            </div>
            <Button color="green" className="flex items-center gap-3" size="sm">
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> Nueva venta
            </Button>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-5">
            <Button className="flex items-center gap-3" size="sm">
              <AdjustmentsVerticalIcon strokeWidth={2} className="h-5 w-5" /> Filtrar ventas
            </Button>
          </div>

        </CardHeader>
      </Card>
    </>
  )
}

export const Ventas = () => {
  return (
    < >
      <VentasDashboard />
      <VentasTable />
    </>
  )
}
