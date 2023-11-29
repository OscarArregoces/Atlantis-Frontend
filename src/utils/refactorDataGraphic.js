import { useAxios } from "./axios.instance";

const colorsDataSets = [
    {
        backgroundColor: "#7ED7C1",
        borderColor: "#7ED7C1"
    },
    {
        backgroundColor: "#FF8F8F",
        borderColor: "#FF8F8F"
    },
    {
        backgroundColor: "#7071E8",
        borderColor: "#7071E8"
    },
    {
        backgroundColor: "#FFCD4B",
        borderColor: "#FFCD4B"
    },
    {
        backgroundColor: "#FFFB73",
        borderColor: "#FFFB73"
    },
    {
        backgroundColor: "#CDF5FD",
        borderColor: "#CDF5FD"
    },
    {
        backgroundColor: "#FF6AC2",
        borderColor: "#FF6AC2"
    },
]
export const refactorDataGrafic = async (dataGraphic) => {
    const dataResponse = {
        labels: [],
        datasets: [],
    };

    const uniqueProductNames = Array.from(new Set(dataGraphic.flatMap(({ productsInfo }) => productsInfo.map(({ name }) => name))));
    const tempData = {};
    uniqueProductNames.forEach((productName) => {
        tempData[productName] = [];
    });

    dataGraphic.forEach(({ fecha, productsInfo }) => {
        dataResponse.labels.push(fecha);

        uniqueProductNames.forEach((productName) => {
            tempData[productName].push(0);
        });

        productsInfo.forEach(({ name, quantity }) => {
            tempData[name][tempData[name].length - 1] += quantity;
        });
    });

    uniqueProductNames.forEach((productName, index) => {
        dataResponse.datasets.push({
            label: productName,
            data: tempData[productName],
            fill: true,
            backgroundColor: colorsDataSets[index].backgroundColor,
            borderColor: colorsDataSets[index].borderColor,
        });
    });

    const productsLabels = dataResponse.datasets.map(({ label }) => label);
    const nameTranslated = await TranslateNameProducts({ nameProducts: productsLabels });

    const datasetsSorted = dataResponse.datasets.map((dataset, index) => ({ ...dataset, label: nameTranslated[index] }));
    dataResponse.datasets = datasetsSorted
    return dataResponse;
};

const TranslateNameProducts = async (body) => {
    const { data } = await useAxios.post("/utils/dashboard/graphic/translate", body);
    if (data.error) {
        return nameProducts;
    }
    return data.data
}















// const data = {
//     labels: ['2023-11-11', '2023-11-12', '2023-11-13', '2023-11-14', '2023-11-15', '2023-11-16'],
//     datasets: [
//         {
//             label: 'Pantalon',
//             data: [6, 11, 5, 2, 6, 1],
//             fill: true,
//             backgroundColor: 'rgba(75,192,192,0.2)',
//             borderColor: 'rgba(75,192,192,1)'
//         },
//         {
//             label: 'CAMISA',
//             data: [6, 11, 5, 2, 6, 1],
//             fill: true,
//             backgroundColor: 'rgba(75,192,192,0.2)',
//             borderColor: 'rgba(75,192,192,1)'
//         }
//     ],
// };