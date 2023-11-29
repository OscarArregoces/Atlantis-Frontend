export const getDate = () => {
    // Obtén la fecha actual
    var fechaActual = new Date();

    // Define los nombres de los meses en español
    var meses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Obtiene el día, mes y año
    var dia = fechaActual.getDate();
    var mes = meses[fechaActual.getMonth()];
    var ano = fechaActual.getFullYear();

    // Formatea la fecha en el formato deseado
    var fechaFormateada = dia + ' ' + mes + ', ' + ano;

    // Imprime la fecha formateada
   return fechaFormateada;

}