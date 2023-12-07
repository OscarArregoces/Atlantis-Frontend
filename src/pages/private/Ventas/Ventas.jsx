import { Card, CardHeader, Typography, Button, } from "@material-tailwind/react";
import { AdjustmentsVerticalIcon, ArchiveBoxIcon, PlusIcon, RectangleGroupIcon } from "@heroicons/react/24/solid";
import { VentasTable } from "./components/VentasTable";
import { useEffect, useState } from "react";
import { VentasFormCreate } from "./components/VentasFormCreate";
import { useAxios } from "../../../utils/axios.instance";

function VentasDashboard({ getSales }) {
  const [displayFormCreate, setDisplayFormCreate] = useState(false);
  return (
    <>
      <Card className="w-full rounded-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="
            mb-8 gap-8 flex flex-col justify-center items-start 
            md:flex md:flex-row md:items-center md:justify-between 
            lg:flex lg:flex-row lg:items-center lg:justify-between
          ">
            <div>
              <Typography variant="h5" color="blue-gray">
                Historial de ventas
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Accede a información de todas las ventas
              </Typography>
            </div>
            <div className="flex shrink-0  gap-2 flex-col md:flex md:flex-col lg:flex lg:flex-row">
              <Button color="green" className="flex items-center gap-3" size="sm" onClick={() => setDisplayFormCreate(!displayFormCreate)}>
                <PlusIcon strokeWidth={2} className="h-4 w-4" /> Nueva venta
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-5">
            <div className="w-full md:max-w-xl lg:max-w-xl">
              <Button className="flex items-center gap-3" size="sm">
                <AdjustmentsVerticalIcon strokeWidth={2} className="h-5 w-5" /> Filtrar ventas
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      <VentasFormCreate
        display={displayFormCreate}
        setDisplay={setDisplayFormCreate}
        getSales={getSales}
      />
    </>
  )
}

export const Ventas = () => {
  const [sales, setSales] = useState([]);
  const getSales = async () => {
    const { data } = await useAxios.get("/sale");
    setSales(data.data);
  }
  useEffect(() => {
    getSales();
  }, [])

  return (
    < >
      <VentasDashboard
        getSales={getSales}
      />
      <VentasTable
        sales={sales}
      />
    </>
  )
}
