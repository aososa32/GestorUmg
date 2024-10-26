"use client";

import React, { useEffect, useState} from "react";
import * as echarts from "echarts";
import API from "@/app/lib/auth";

interface Proyecto{
    nombre: string;
    porcentaje: string;
}

const BarChart = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  useEffect(() => {
    const fetchDefectos = async () => {
      try {
        const res = await API<Proyecto[]>({}, "getPorcentajeProyecto/", "GET", false);
        if (res.result) {
            setProyectos(res.result);
        }
      } catch (error) {
        console.error("ERROR ", error);
      }
    };

    fetchDefectos();
  }, []);

  useEffect(() => {
    const chartDom = document.getElementById("bar-chart-2");
    const myChart = echarts.init(chartDom!);

    // Mapea los defectos para extraer nombres y cantidades
    const nombres = proyectos.map(proyecto => proyecto.nombre);
    const cantidades = proyectos.map(proyecto => proyecto.porcentaje);

    const option = {
      title: {
        text: 'Porcentaje de avance por Proyecto',
        left: 'center'
      },
        xAxis: {
            type: 'category',
            data: nombres
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
            data: cantidades,
            type: 'line'
            }
        ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [proyectos]);

  return <div id="bar-chart-2" style={{ width: '100%', height: '400px' }} />;
};

export default BarChart;