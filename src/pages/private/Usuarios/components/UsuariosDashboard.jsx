import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
} from "@material-tailwind/react";

export const UsuariosDashboard = () => {
    return (
        <>
            <Card className="w-full rounded-none">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 gap-8 flex flex-col justify-center items-start md:flex md:flex-row md:items-center md:justify-between lg:flex lg:flex-row lg:items-center lg:justify-between ">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Lista de usuarios
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Accede a información de todos los usuarios
                            </Typography>
                        </div>
                        <div className="flex shrink-0  gap-2 flex-col md:flex md:flex-col lg:flex lg:flex-row">
                            <Button variant="outlined" size="sm">
                                Ver todos
                            </Button>
                            <Button className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Añadir usuario
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-5">
                        <div className="w-full md:max-w-xl lg:max-w-xl">
                            <Input
                                label="Buscar"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </>
    )
}
