import { Button } from '@material-tailwind/react';
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
    const navigate = useNavigate();
    console.log(location)
    return (
        <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Lo sentimos, no pudimos encontrar esta página.</p>
                    <p className="mt-4 mb-8 dark:text-gray-400">Pero no te preocupes, puedes encontrar muchas otras cosas en nuestra página de inicio.</p>
                    <Button
                        variant="gradient"
                        onClick={() => navigate(-1)}
                    >
                        Volver a la página de inicio
                    </Button>
                </div>
            </div>
        </section>
    )
}
