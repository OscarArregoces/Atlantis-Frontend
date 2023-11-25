import { Chip, Typography } from "@material-tailwind/react"
import { BarGraphic } from "../../../components/private/graphics/BarGraphic"

export const Dashboard = () => {
  return (
    <div className="w-screen max-w-screen h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)]">
      <div className="w-full h-40 flex flex-row justify-center items-center">
        <div className="w-1/3 p-3 shadow-md rounded-xl bg-white mx-3">
          <div className="w-max flex flex-col items-start justify-center">
            <Typography variant="lead" color="black">
              Productos
            </Typography>
            <div className="flex items-center gap-4">
              <Chip value="20 %" color="red" variant="gradient" />
              <Typography variant="small" color="gray">
                46
              </Typography>
            </div>
          </div>
        </div>
        <div className="w-1/3 p-3 shadow-md rounded-xl bg-white mx-3">
          <div className="w-max flex flex-col items-start justify-center">
            <Typography variant="lead" color="black">
              Ingresos
            </Typography>
            <div className="flex items-center gap-4">
              <Chip value="20 %" color="green" variant="gradient" />
              <Typography variant="small" color="gray">
                337.500 COP
              </Typography>
            </div>
          </div>
        </div>
        <div className="w-1/3 p-3 shadow-md rounded-xl bg-white mx-3">
          <div className="w-max flex flex-col items-start justify-center">
            <Typography variant="lead" color="black">
              Ventas
            </Typography>
            <div className="flex items-center gap-4">
              <Chip value="20 %" color="cyan" variant="gradient" />
              <Typography variant="small" color="gray">
                44
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[calc(100vh-15.5rem)] flex">
        <div className="w-2/3 mx-3 bg-white rounded-xl flex justify-center items-center">
          <BarGraphic />
        </div>
        <div className="w-1/3 mx-3 bg-white rounded-xl flex justify-center items-start">
          <div className="w-full p-3 shadow-md rounded-xl bg-white mx-3">
            <div className="w-max flex flex-col items-start justify-center">
              <Typography variant="lead" color="black">
                Productos
              </Typography>
              <div className="flex items-center gap-4">
                <Chip value="20 %" color="red" variant="gradient" />
                <Typography variant="small" color="gray">
                  46
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
