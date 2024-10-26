"use client";

import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import API from "@/app/lib/auth";

interface Proyecto {
  estado: string;
  cantidad: number;
}




const PieChart1 = () => {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const res = await API<Proyecto[]>({}, "getEstadosProyectos/", "GET", false);
        if (res.result) {
          setProyectos(res.result);
        }
      } catch (error) {
        console.error("ERROR ", error);
      }
    };

    fetchProyectos();
  }, []);


  useEffect(() => {
    const chartDom = document.getElementById("pie-chart_2");
    const myChart = echarts.init(chartDom!);
    const data = proyectos.map(proyecto => ({
        name: proyecto.estado,
        value: proyecto.cantidad,
      }));
    
    const option = {
        title: {
            text: 'Proyectos por estado',
            left: 'center'
          },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
            series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                show: false,
                position: 'center'
                },
                emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold'
                }
                },
                labelLine: {
                show: false
                },
                data: data
            }
        ]
    };
    
    myChart.setOption(option);
    
    return () => {
      myChart.dispose();
    };
  }, [proyectos]);

  return <div id="pie-chart_2" style={{ width: '100%', height: '400px' }} />;
};

export default PieChart1;