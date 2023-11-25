import { Card, CardHeader, Typography, Button, } from "@material-tailwind/react";
import { AdjustmentsVerticalIcon, PlusIcon } from "@heroicons/react/24/solid";
import { AlmacenTable } from "./components/AlmacenTable";
import { MangeCategory } from "./components/MangeCategory";
import { useEffect, useState } from "react";
import { useAxios } from "../../../utils/axios.instance";
import { AlmacenFormCreate } from "./components/AlmacenFormCreate";
import { MangeSubCategory } from "./components/ManageSubCategory";
import { ManageSupplier } from "./components/ManageSupplier";
import toast, { Toaster } from "react-hot-toast";

function AlmacenDashboard({ getProducts }) {

  const [displayCategory, setDisplayCategory] = useState(false);
  const [displaySubCategory, setDisplaySubCategory] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);
  const [displaySupplier, setDisplaySupplier] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const getSuppliers = async () => {
    const { data } = await useAxios.get('/supplier');
    if (data.error) {
      toast.error("Error en consulta");
    } else {
      setSuppliers(data.data)
    }
  }

  const getCategories = async () => {
    const { data } = await useAxios.get('/category');
    if (data.error) {
      toast.error("Error en consulta");
    } else {
      setCategories(data.data)
    }
  }


  useEffect(() => {
    getCategories();
    getSuppliers();
  }, [])


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
                Listado de productos almacenados en stock.
              </Typography>
            </div>
            <Button color="green" className="flex items-center gap-3" size="sm" onClick={() => setDisplayForm(!displayForm)}>
              <PlusIcon strokeWidth={2} className="h-4 w-4" /> Agregar producto
            </Button>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row mb-5">
            <Button className="flex items-center gap-3" size="sm" onClick={() => setDisplayCategory(!displayCategory)}>
              <AdjustmentsVerticalIcon strokeWidth={2} className="h-5 w-5" /> Categorias
            </Button>
            <Button className="flex items-center gap-3" size="sm" onClick={() => setDisplaySubCategory(!displaySubCategory)}>
              <AdjustmentsVerticalIcon strokeWidth={2} className="h-5 w-5" /> SubCategorias
            </Button>
            <Button className="flex items-center gap-3" size="sm" onClick={() => setDisplaySupplier(!displaySupplier)}>
              <AdjustmentsVerticalIcon strokeWidth={2} className="h-5 w-5" /> Provedores
            </Button>
          </div>
        </CardHeader>
      </Card>
      <MangeCategory
        display={displayCategory}
        setDisplay={setDisplayCategory}
        getCategories={getCategories}
        categories={categories}
      />
      <MangeSubCategory
        display={displaySubCategory}
        setDisplay={setDisplaySubCategory}
      />
      <ManageSupplier
        display={displaySupplier}
        setDisplay={setDisplaySupplier}
        getSuppliers={getSuppliers}
        suppliers={suppliers}
      />
      <AlmacenFormCreate
        displayForm={displayForm}
        setDisplayForm={setDisplayForm}
        getProducts={getProducts}
        categories={categories}
        suppliers={suppliers}
      />
    </>
  )
}

export const Almacen = () => {
  const [product, setProduct] = useState([]);
  const getProducts = async () => {
    const { data } = await useAxios.get('/product');
    if (data.error) {
      toast.error("Error en consulta.")
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
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}
