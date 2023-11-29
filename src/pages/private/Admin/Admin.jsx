import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Select,
  Option,
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
import { useAxios } from "../../../utils/axios.instance";

export const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState(true);
  const getCategories = async () => {
    const { data } = await useAxios.get('/category');
    setCategories(data.data)
  }
  useEffect(() => {
    getCategories();
  }, [])
  const { handleSubmit, reset, control, formState: { errors }, setValue, resetField, register, watch } = useForm({
    defaultValues: {
      category: '',
      subcategory: '',
    }
  });

  const onSubmit = async (dataValue) => {
    console.log(dataValue);
  }

  const onChangeCategory = async (category_id) => {
    if (!category_id) {
      resetField("category")
      return setCategorySelected(true);
    }
    resetField("subcategory")

    setCategorySelected(false);
    const { data } = await useAxios.get(`/subcategory/byCategory/${category_id}`);
    setSubcategories(data.data);
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="w-[400px]">
        <Card>
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Prueba
            </Typography>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-4">
              <div>
                <Controller
                  control={control}
                  name="category"
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur } }) => (
                    <Select
                      label="Categoria"
                      onChange={(value) => {
                        onChange(value);
                        onChangeCategory(value);
                      }}
                      onBlur={onBlur}
                    >
                      {
                        categories.map(category => (
                          <Option key={category._id} value={category._id}>{category.name}</Option>
                        ))
                      }
                    </Select>
                  )}
                />
                {errors.category && errors.category.type === "required" && (
                  <span className="text-center text-red-500 text-sm">Campo requerido</span>
                )}
              </div>
              <div>
                <Controller
                  control={control}
                  name="subcategory"
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value } }) => {
                    return (
                      <Select
                        label="Subcategoria"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        disabled={categorySelected}
                      >
                        {
                          subcategories.map(subcategorie => (
                            <Option key={subcategorie._id} value={subcategorie._id}>{subcategorie.name}</Option>
                          ))
                        }
                      </Select>
                    )
                  }}
                />
                {errors.subcategory && errors.subcategory.type === "required" && (
                  <span className="text-center text-red-500 text-sm">Campo requerido</span>
                )}
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button type="submit" variant="gradient">Enviar</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
