"use client";

import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import API from "@/app/lib/auth";

interface Prueba {
  name: string;
  value: number;
}

const PieChart = () => {
  const [pruebas, setPruebas] = useState<Prueba[]>([]);

  useEffect(() => {
    const fetchPruebas = async () => {
      try {
        const res = await API<Prueba[]>({}, "getCountPruebas/", "GET", false);
        if (res.result) {
          setPruebas(res.result);
        }
      } catch (error) {
        console.error("ERROR ", error);
      }
    };

    fetchPruebas();
  }, []);

  useEffect(() => {
    const chartDom = document.getElementById("pie-chart");
    const myChart = echarts.init(chartDom!);
    const data = pruebas.map(prueba => ({
      name: prueba.name,
      value: prueba.value,
    }));
    
    const option = {
      title: {
        text: 'Reporte de Pruebas',
        subtext: 'Por estado',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Pruebas',
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [pruebas]); // Agregar pruebas como dependencia para actualizar el gráfico cuando cambie

  return <div id="pie-chart" style={{ width: '100%', height: '400px' }} />;
};

export default PieChart;