export const getDate = () => {
    var fechaActual = new Date();
    var meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    var dia = fechaActual.getDate();
    var mes = meses[fechaActual.getMonth()];
    var ano = fechaActual.getFullYear();
    var fechaFormateada = dia + ' ' + mes + ', ' + ano;
   return fechaFormateada;
}

export function getCurrentDate() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${año}-${mes}-${dia}`;
}