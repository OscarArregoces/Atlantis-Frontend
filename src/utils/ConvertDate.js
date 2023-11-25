
export function ConverDate(fechaString) {
    // Crea un objeto Date a partir de la cadena de fecha
    const fecha = new Date(fechaString);

    // Extrae las partes relevantes de la fecha
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Meses son indexados desde 0
    const dia = String(fecha.getDate()).padStart(2, '0');

    // Formatea la fecha como "YYYY-MM-DD"
    const fechaFormateada = `${año}-${mes}-${dia}`;

    return fechaFormateada;
}