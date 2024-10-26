"use client";

import React, { useEffect, useState} from "react";
import * as echarts from "echarts";
import API from "@/app/lib/auth";

interface Defecto{
    cantidad_defecto: number;
    recurso: string;
}

const BarChart = () => {
  const [defectos, setDefectos] = useState<Defecto[]>([]);

  useEffect(() => {
    const fetchDefectos = async () => {
      try {
        const res = await API<Defecto[]>({}, "getDefectosRecurso/", "GET", false);
        if (res.result) {
          setDefectos(res.result);
        }
      } catch (error) {
        console.error("ERROR ", error);
      }
    };

    fetchDefectos();
  }, []);

  useEffect(() => {
    const chartDom = document.getElementById("bar-chart");
    const myChart = echarts.init(chartDom!);

    // Mapea los defectos para extraer nombres y cantidades
    const nombres = defectos.map(defecto => defecto.recurso);
    const cantidades = defectos.map(defecto => defecto.cantidad_defecto);

    const option = {
      title: {
        text: 'Defectos por Recurso',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
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
          name: 'Defectos',
          type: 'bar',
          data: cantidades,
          itemStyle: {
            color: '#14557C'
          }
        }
      ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [defectos]);

  return <div id="bar-chart" style={{ width: '100%', height: '400px' }} />;
};

export default BarChart;