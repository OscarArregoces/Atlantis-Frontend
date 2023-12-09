import { CloudArrowUpIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { TYPE_DOCUMENT } from "../../../const/TYPE_DOCUMENT";
import toast, { Toaster } from "react-hot-toast";
import { dataPerfil } from "../../../const/Data";


export const Perfil = () => {
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    const newData = {
      email: dataPerfil.email,
      name: dataPerfil.person.name,
      surname: dataPerfil.person.surname,
      type_document: dataPerfil.person.type_document,
      no_document: dataPerfil.person.no_document,
      country: dataPerfil.person.country,
      city: dataPerfil.person.city,
      phone: dataPerfil.person.phone,
      birthday: dataPerfil.person.birthday,
      img_url: dataPerfil.person.img_url,
    }
    Object.keys(newData).forEach((fieldName) => {
      setValue(fieldName, newData[fieldName]);
    });
  }, []);

  const onSubmit = async (dataValue) => {
    toast.success("Perfil actualizado");
  };


  const handleUpload = () => {
    const inputUpload = document.querySelector('#inputUpload');
    inputUpload.click();
    const avatar = document.querySelector('#avatar');
    inputUpload.addEventListener('change', (e) => {
      if (e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          avatar.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
      } else {
        avatar.src = '/assets/img/sinFoto.png';
      }
    })
  }
  return (
    <>
      <div className="
        w-full min-h-[calc(100vh-3.5rem)] flex justify-center items-center py-10
        md:w-full md:min-h-[calc(100vh-3.5rem)] md:flex md:justify-center md:items-center md:pt-6
        lg:w-full lg:h-[calc(100vh-3.5rem)] lg:flex lg:justify-center lg:items-center lg:pt-6
      ">
        <Card className="w-full max-w-[90%] md:max-w-[90%] lg:max-w-[834px]">
          <CardHeader color="cyan" variant="gradient">
            <Typography
              variant="h1"
              className="font-semibold text-white text-center"
            >
              Perfil
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody>
              <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
                <div className="grid grid-cols-1">
                  <Avatar
                    src={dataPerfil ? dataPerfil.person.img_url : '/assets/img/sinFoto.png'}
                    alt="avatar"
                    id="avatar"
                    size="xxl"
                    className="m-auto"
                  />
                  <div className="hidden" >
                    <Input
                      type="file"
                      label="Subir archivo"
                      accept="image/*"
                      id="inputUpload"
                      {...register('img_url')}
                    />

                  </div>
                  <Button
                    variant="text"
                    className="flex items-center gap-3 max-w-[200px] m-auto mt-2"
                    onClick={handleUpload}
                  >
                    <CloudArrowUpIcon className="h-5 w-5" />
                    Subir foto
                  </Button>
                </div>
                <div className="flex flex-col justify-end gap-4">
                  <div className="flex gap-2 mb-5">
                    <ShieldCheckIcon className="h-5 w-5" />
                    <Typography
                      variant="small"
                      className="font-semibold text-gray-700"
                    >
                      Credenciales de acceso
                    </Typography>

                  </div>
                  <div>
                    <Input
                      type="email"
                      label="Correo electronico"
                      {...register('email', { required: true })}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className="text-center text-red-500 text-sm">Campo requerido</span>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
            <CardBody>
              <div>
                <div className="flex gap-2 mb-5">
                  <UserIcon className="h-5 w-5" />
                  <Typography
                    variant="small"
                    className="font-semibold text-gray-700"
                  >
                    Datos personales
                  </Typography>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid md:grid-cols-2 md:gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
                  <div>
                    <Input
                      type="text"
                      label="Nombres"
                      {...register('name', { required: true })}
                    />
                    {errors.name && errors.name.type === "required" && (
                      <span className="text-center text-red-500 text-sm">Campo requerido</span>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Apellidos"
                      {...register('surname', { required: true })}
                    />
                    {errors.surname && errors.surname.type === "required" && (
                      <span className="text-center text-red-500 text-sm">Campo requerido</span>
                    )}
                  </div>

                  <div>
                    <Controller
                      render={({ field }) => (
                        <Select
                          label="Tipo de documento"
                          {...field}
                        >
                          {
                            TYPE_DOCUMENT.map(document => (
                              <Option key={document.value} value={document.value}>{document.title}</Option>
                            ))
                          }
                        </Select>
                      )}
                      rules={{ required: true }}
                      name="type_document"
                      control={control}
                      defaultValue=""
                    />
                    {errors.type_document && errors.type_document.type === "required" && (
                      <span className="text-center text-red-500 text-sm">Campo requerido</span>
                    )}
                  </div>

                  <div>
                    <Input
                      type="text"
                      label="No documento"
                      {...register('no_document', { required: true })}
                    />
                    {errors.no_document && errors.no_document.type === "required" && (
                      <span className="text-center text-red-500 text-sm">Campo requerido</span>
                    )}
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Pais"
                      {...register('country', { required: true })}
                    />
                    {errors.country && errors.country.type === "required" && (
                      <span className="text-center text-red-500 text-sm">Campo requerido</span>
                    )}
                  </div>

                  <div>
                    <Input
                      type="text"
                      label="Ciudad"
                      {...register('city', { required: true })}
                    />
                    {errors.city && errors.city.type === "required" && (
                      <span className="text-center text-red-500 text-sm">Campo requerido</span>
                    )}
                  </div>

                  <div>
                    <Input
                      type="text"
                      label="Celular"
                      {...register('phone', { required: true })}
                    />
                    {errors.phone && errors.phone.type === "required" && (
                      <span className="text-center text-red-500 text-sm">Campo requerido</span>
                    )}
                  </div>
                  <div>
                    <Input
                      type="date"
                      label="Fecha de nacimiento"
                      {...register('birthday', { required: true })}
                    />
                    {errors.birthday && errors.birthday.type === "required" && (
                      <span className="text-center text-red-500 text-sm">Campo requerido</span>
                    )}
                  </div>
                </div>
              </div>

            </CardBody>
            <CardFooter className="flex justify-end pt-0">
              <Button type="submit" variant="gradient" >
                <span>Actualizar</span>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}
