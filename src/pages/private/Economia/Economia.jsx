import { Chip, Spinner, Typography } from "@material-tailwind/react"
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { EconomiaTable } from "./components/EconomiaTable";
import { useEffect, useState } from "react";
import { useAxios } from "../../../utils/axios.instance";
import toast, { Toaster } from "react-hot-toast";
import { getDate } from "../../../utils/GetDate";

const tableCol = [
  'Total ingresos generados',
  'Total ingresos por generar',
  'Cantidad total actual de productos',
  'Cantidad total de productos vendidos',
  'Dinero invertido'
];

export const Economia = () => {
  const [tableRows, setTableRows] = useState(null);
  const [deductions, setDeductions] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const getEconomyStatistics = async () => {
    const { data } = await useAxios.get("/utils/economy");
    if (data.error) return toast.error("Error en consulta");
    const { tableRows: dataTable, deductions: dataCurrent } = data.data;
    setTableRows(dataTable);
    setDeductions(dataCurrent);
  }

  useEffect(() => {
    getEconomyStatistics();
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user);
  }, [])

  return (
    <div className="
      w-screen max-w-screen min-h-[calc(100vh-3.5rem)] bg-white flex justify-center items-center
    ">
      <div className="w-[90vw] max-w-[90vw] max-h-80vh] my-5 bg-cyan-100 rounded-md shadow-xl ">
        <div className="w-full flex justify-between items-center border-b border-blue-400 p-4 ">
          <div className="flex items-center gap-2">
            <CurrencyDollarIcon className="h-10 w-10" />
            <Typography variant="h3" >
              Economia
            </Typography>
          </div>
          <div className="flex flex-col justify-center items-end">
            {
              userInfo &&
              <Typography variant="paragraph" className="text-normal font-semibold" >
                {userInfo.name}
              </Typography>
            }
            <Typography variant="small" color="gray" >
              {
                getDate()
              }
            </Typography>
          </div>
        </div>
        <div>
          <div className="ml-5 my-5">
            <div className="my-5 p-2 md:p-0 md:my-5 lg:my-5 lg:p-0" >
              <Typography variant="lead" className="text-normal font-semibold" >
                Atlantis
              </Typography>
              <Typography variant="small" >
                Colombia, La Guajira, Riohacha
              </Typography>
              <Typography variant="small" >
                440001
              </Typography>
            </div>
            <Typography variant="paragraph" color="gray" className="p-2 md:p-0 lg:p-0" >
              La sección de economía brinda una visión exhaustiva de la salud financiera en tu Sistema de Gestión de Inventario (SGI). Obtén información detallada sobre cada producto, incluyendo inversiones asociadas, costos y proyecciones de ventas. Con un análisis integral, podrás tomar decisiones informadas para optimizar la rentabilidad. Explora inversiones, evalúa la relación costo-beneficio y sigue de cerca las proyecciones de ganancias, proporcionando una perspectiva holística que impulsa la eficiencia operativa y el crecimiento sostenible del sistema económico.
            </Typography>
          </div>


        </div>
        {
          tableRows ?
            <div className="w-full h-[32vh] max-h-[32vh] overflow-y-auto">
              <EconomiaTable tableRows={tableRows} />
            </div>
            :
            <div className="flex justify-center items-center my-40">
              <Spinner />
            </div>
        }
        {
          deductions ?
            <div className="flex justify-between items-center p-4 border-t border-blue-400">
              <div className="flex flex-col">
                {
                  tableCol.map((name, index) => (
                    // <Chip variant="ghost" color="green" key={index} value={name} className="my-1" />
                    <Typography variant="small" key={index} className="text-normal font-semibold" >
                      {name}
                    </Typography>
                  ))
                }
              </div>
              <div className="flex flex-col items-end">
                <Typography variant="small" className="text-normal font-semibold text-green-700" >
                  {deductions.revenue_generated.toLocaleString() + " " + "COP"}
                </Typography>
                <Typography variant="small" className="text-normal font-semibold text-green-700" >
                  {deductions.to_generate.toLocaleString() + " " + "COP"}
                </Typography>
                <Typography variant="small" className="text-normal font-semibold" >
                  {deductions.current_quantity_products.toLocaleString()}
                </Typography>
                <Typography variant="small" className="text-normal font-semibold" >
                  {deductions.quantity_products_sold.toLocaleString()}
                </Typography>
                <Typography variant="small" className="text-normal font-semibold text-green-700" >
                  {deductions.invested.toLocaleString() + " " + "COP"}
                </Typography>
              </div>

            </div>
            :
            <div className="flex justify-center items-center my-40">
              <Spinner />
            </div>

        }

      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}