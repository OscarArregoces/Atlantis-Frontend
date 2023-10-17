import { Card, CardHeader, Typography, Button, } from "@material-tailwind/react";
import { AdjustmentsVerticalIcon, PlusIcon } from "@heroicons/react/24/solid";
import { AlmacenTable } from "./components/AlmacenTable";
import { MangeCategory } from "./components/MangeCategory";
import { useEffect, useState } from "react";
import { useAxios } from "../../../utils/axios.instance";
import Swal from "sweetalert2";
import { AlmacenFormCreate } from "./components/AlmacenFormCreate";

function AlmacenDashboard({getProducts}) {

  const [displayCategory, setDisplayCategory] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  return (
    <>
      <Card className="w-full rounded-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 gap-8 flex flex-col justify-center items-start md:flex md:flex-row md:items-center md:justify-between lg:flex lg:flex-row lg:items-center lg:justify-between ">
            <div>
              <Typography variant="h5" color="blue-gray">
                Almacen
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Listado de productos
              </Typography>
            </div>
            <Button color="green" className="flex items-center gap-3" size="sm" onClick={() => setDisplayForm(!displayForm)}>
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> Agregar producto
            </Button>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-5">
            <Button className="flex items-center gap-3" size="sm" onClick={() => setDisplayCategory(!displayCategory)}>
              <AdjustmentsVerticalIcon strokeWidth={2} className="h-5 w-5" /> Categorias
            </Button>
          </div>
        </CardHeader>
      </Card>
      <MangeCategory
        display={displayCategory}
        setDisplay={setDisplayCategory}
      />
      <AlmacenFormCreate
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
        getProducts={getProducts}
      />
    </>
  )
}

export const Almacen = () => {
  const [product, setProduct] = useState([]);
  const getProducts = async () => {
    const { data } = await useAxios.get('/product');
    if (data.error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error en consulta',
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      setProduct(data.data)
    }
  }
  useEffect(() => {
    getProducts();
  }, [])

  return (
    < >
      <AlmacenDashboard 
        getProducts={getProducts}
      />
      <AlmacenTable
        products={product}
        getProducts={getProducts}
      />
    </>
  )
}
