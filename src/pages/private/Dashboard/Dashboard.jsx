import { Chip, Spinner, Typography } from "@material-tailwind/react"
import { BarGraphic } from "../../../components/private/BarGraphic"
import { CubeIcon, CurrencyDollarIcon, ShoppingBagIcon, ShoppingCartIcon, TruckIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useAxios } from "../../../utils/axios.instance";
import toast, { Toaster } from "react-hot-toast";
import { refactorDataGrafic } from "../../../utils/refactorDataGraphic";
import { getCurrentDate } from "../../../utils/GetDate";

const DashboardItem = ({ item }) => {
  const { type } = item;
  return (
    <div className="
     bg-white w-[90%] p-3 shadow--md rounded-xl m-3
      md:w-1/3 md:p-3 md:shadow-md md:rounded-xl md:mx-3
      lg:w-1/3 lg:p-3 lg:shadow-md lg:rounded-xl lg:mx-3 lg:transform lg:hover:scale-105 lg:transition-transform
    ">
      <div className="w-full flex flex-col items-start justify-center">
        <Typography variant="lead" color="black">
          {type}
        </Typography>
        <div className="
          w-full flex flex-row justify-center items-start gap-4
          md:w-full md:flex md:flex-col jmd:ustify-center md:items-start md:gap-4
          lg:w-full lg:flex lg:flex-row jlg:ustify-between lg:items-center lg:gap-4
        ">
          <div className="
            w-full flex flex-col justify-center items-start
            md:w-full md:flex md:flex-col  md:justify-center md:items-start
            lg:w-full lg:flex lg:flex-col  lg:justify-center lg:items-start
          ">
            <Chip
              variant="ghost"
              className="my-1"
              color={
                type === "Productos" ? "red" :
                  type === "Ingresos" ? "green" :
                    type === "Ventas" ? "cyan" :
                      type === "Cargando" ? "gray" : "gray"
              }
              value={
                type === "Productos" ? "Total: " + " " + item.total_productos.toLocaleString() :
                  type === "Ingresos" ? "generados:" + " " + item.generados.toLocaleString() + " " + "COP" :
                    type === "Ventas" ? "generadas:" + " " + item.generadas.toLocaleString() :
                      type === "Cargando" ? <Spinner /> : "Ninguno"
              } />
            <Chip
              variant="ghost"
              className="my-1"
              color="orange"
              value={
                type === "Productos" ? "Tipo de productos: " + " " + item.tipo_productos.toLocaleString() :
                  type === "Ingresos" ? "Por generar: " + " " + item.por_generar.toLocaleString() + " " + "COP" :
                    type === "Ventas" ? "Por generar: " + " " + item.por_generar.toLocaleString() :
                      type === "Cargando" ? <Spinner /> : "Ninguno"
              } />
          </div>
          <Chip
            value={
              type === "Productos" ? <CubeIcon className="h-8 w-8 md:h-5 md:w-5 lg:h-8 lg:w-8" /> :
                type === "Ingresos" ? <CurrencyDollarIcon className="h-8 w-8 md:h-5 md:w-5 lg:h-8 lg:w-8" /> :
                  type === "Ventas" ? <ShoppingCartIcon className="h-8 w-8 md:h-5 md:w-5 lg:h-8 lg:w-8" /> : <TruckIcon className="h-8 w-8 md:h-5 md:w-5 lg:h-5 lg:w-5" />
            }
            color={
              type === "Productos" ? "red" :
                type === "Ingresos" ? "green" :
                  type === "Ventas" ? "cyan" : "gray"
            }
            variant="gradient" />
        </div>
      </div>
    </div>
  )
}
const ListItem = ({ nameProduct, totalQuantity, totalRevenue }) => {
  return (
    <div className="w-full p-3 bg-white">
      <div className="flex items-center gap-2">
        <Chip
          value={
            <ShoppingBagIcon className="h-5 w-5" />
          }
          color="indigo"
          variant="gradient"
          className="h-10 w-10 rounded-full flex justify-center items-center"
        />
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <Typography variant="paragraph" color="deep-purple" className="font-semibold">
              {nameProduct}
            </Typography>
            <Typography variant="small" color="gray">
              Cantidad: {totalQuantity.toLocaleString()}
            </Typography>
          </div>
          <Chip variant="ghost" color="green" value={
            totalRevenue.toLocaleString() + " " + "COP"
          } />

        </div>
      </div>
    </div>
  )
}
export const Dashboard = () => {
  const [dataGraphic, setDataGraphic] = useState(null);
  const [dataRanking, setDataRanking] = useState([]);
  const [dataDashboardItems, setDashboardItems] = useState([]);
  const getDataGraphic = async () => {
    const { data } = await useAxios.get("/utils/dashboard/graphic");
    if (data.error) {
      return toast.error("Error en consulta");
    }
    if (data.data[0]?.name === "Sin productos") {
      const currentDate = getCurrentDate();
      const data = {
        labels: [currentDate],
        datasets: [
          {
            label: 'Sin productos',
            data: [0],
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)'
          },
        ],
      };

      setDataGraphic(data);
    } else {
      const dataSorted = await refactorDataGrafic(data.data);
      setDataGraphic(dataSorted);
    }
  }
  const getDataRanking = async () => {
    const { data } = await useAxios.get("/utils/dashboard/rankingProducts");
    if (data.error) {
      return toast.error("Error en consulta");
    }
    setDataRanking(data.data);
  }
  const getDashboardItems = async () => {
    const { data } = await useAxios.get("/utils/dashboard/items");
    if (data.error) {
      return toast.error("Error en consulta");
    }
    setDashboardItems(data.data);
  }
  useEffect(() => {
    getDataGraphic();
    getDataRanking();
    getDashboardItems();
  }, [])

  return (
    <div className="
        w-screen max-w-screen h-full 
        md:w-screen md:max-w-[99vw] md:h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-3.5rem)]
        lg:w-screen lg:max-w-[99vw] lg:h-full lg:min-h-[calc(100vh-3.5rem)]
      ">
      <div className="
        w-full flex flex-col justify-center items-center
        md:mb-3 md:flex md:flex-row md:justify-center md:items-center 
        lg:mb-3 lg:flex lg:flex-row lg:justify-center lg:items-center
      ">
        {
          dataDashboardItems.length === 0 && [1, 2, 3].map((id) => (
            <DashboardItem
              key={id}
              item={
                {
                  "type": "Cargando",
                }
              }
            />
          ))
        }
        {
          dataDashboardItems.map((item) => (
            <DashboardItem
              key={item.type}
              item={item}
            />
          ))
        }
      </div>
      <div className="
        w-full flex flex-col justify-center items-center
        md:w-full md:h-full md:flex md:flex-col
        lg:w-full lg:max-w-[99vw] lg:min-h-[calc(100vh-15.5rem)] lg:flex lg:flex-row
      ">
        <div className="
          w-[90%] m-3 bg-white rounded-xl flex flex-col justify-center items-center
          md:w-full md:mx-3 md:bg-white md:rounded-xl md:flex md:flex-col md:justify-center md:items-center md:h-[70vh]
          lg:w-2/3 lg:mx-3 lg:bg-white lg:rounded-xl lg:flex lg:flex-col lg:justify-center lg:items-center lg:h-[75vh]
        ">
          <Typography variant="lead" className="my-5" >Ventas ultimos 7 días</Typography>
          <BarGraphic data={dataGraphic} />
        </div>
        <div className="
          w-[90%] m-3 p-3 bg-white rounded-xl flex flex-col justify-start items-center
          md:w-full md:p-0 md:mx-3 md:bg-white md:rounded-xl md:flex md:flex-col md:justify-start md:items-center md:overflow-hidden md:h-[70vh]
          lg:w-1/3 lg:p-0 lg:mx-3 lg:bg-white lg:rounded-xl lg:flex lg:flex-col lg:justify-start lg:items-center lg:overflow-y-scroll lg:h-[75vh]
        ">
          <Typography variant="lead" color="black" className="my-5">
            Ranking de productos
          </Typography>
          {
            dataRanking.length === 0 && <div className="w-full h-full flex justify-center items-center"><Spinner /></div>
          }
          {
            dataRanking.map(({ totalQuantity, totalRevenue, productDetails }) => (
              <ListItem
                key={productDetails.name}
                nameProduct={productDetails.name}
                totalQuantity={totalQuantity}
                totalRevenue={totalRevenue}
              />
            ))
          }

        </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  )
}
