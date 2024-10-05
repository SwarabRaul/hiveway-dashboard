// src/components/ChartComponent.jsx

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartTitle,
    Tooltip,
    Legend
);

const ChartComponent = ({ title, dataKey, color }) => {
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('https://hivewaybackend.onrender.com/');
                if (Array.isArray(response.data)) {
                    const data = response.data;
                    const labels = data.map((item) =>
                        new Date(item.createdAt).toLocaleTimeString()
                    );
                    const values = data.map((item) => item[dataKey]);

                    setChartData({
                        labels,
                        datasets: [
                            {
                                label: title,
                                data: values,
                                fill: false,
                                backgroundColor: color,
                                borderColor: color,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchChartData();
        const interval = setInterval(fetchChartData, 60000); // Refresh every 60 seconds

        return () => clearInterval(interval);
    }, [title, dataKey, color]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 10,
                },
            },
        },
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default ChartComponent;
