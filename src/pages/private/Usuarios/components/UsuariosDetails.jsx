import React from "react";
import {
    Dialog,
} from "@material-tailwind/react";

export const UsuariosDetails = ({ openDetails, setOpenDetails }) => {


    return (
        <>
            <Dialog
                open={openDetails}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
                // className="h-full overflow-auto"
                size="md"
            >
            </Dialog>
        </>
    );
}