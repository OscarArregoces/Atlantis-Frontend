import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Spinner } from "@material-tailwind/react";
import 'chart.js/auto';

export const BarGraphic = ({ data }) => {
  const ref = useRef();
  if (!data) return <Spinner />
  return <Bar ref={ref} data={data} />
};