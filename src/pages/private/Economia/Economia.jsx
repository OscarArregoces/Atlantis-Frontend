import { Typography } from "@material-tailwind/react"
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { EconomiaTable } from "./components/EconomiaTable";
export const Economia = () => {
  return (
    <div className="w-screen max-w-screen h-[calc(100vh-3.5rem)] max-h-[calc(100vh-3.5rem)] bg-white flex justify-center items-center">
      <div className="w-[90vw] max-w-[90vw] h-[80vh] max-h-80vh] bg-cyan-100 rounded-md shadow-xl">
        <div className="w-full flex justify-between items-center border-b border-blue-400 p-4">
          <div className="flex items-center gap-2">
            <CurrencyDollarIcon className="h-10 w-10" />
            <Typography variant="h3" >
              Economia
            </Typography>
          </div>
          <div className="flex flex-col justify-center items-end">
            <Typography variant="paragraph" >
              Customer ID: C1613
            </Typography>
            <Typography variant="paragraph" >
              9137 3rd Lane California City CA 93504, U.S.A.
            </Typography>
          </div>
        </div>
        <div>
          <div className="ml-5 my-5">
            <Typography variant="small" >
              26 Noviembre, 2024
            </Typography>
            <Typography variant="lead" className="flex gap-4" >
              Bolsa <span className="text-gray-600">#00002</span>
            </Typography>
          </div>
          <div className="ml-5 my-5">
            <Typography variant="lead" >
              Atlantis
            </Typography>
            <Typography variant="small" >
              Colombia, La Guajira, Riohacha
            </Typography>
            <Typography variant="small" >
              440001
            </Typography>
          </div>

        </div>
        <div>
          <EconomiaTable />
        </div>
        <div className="flex justify-between items-center m-4">
          <Typography variant="small" >
            Total
          </Typography>
          <Typography variant="small" >
            700560
          </Typography>
        </div>
      </div>
    </div>
  )
}
