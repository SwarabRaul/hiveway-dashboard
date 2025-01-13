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
                labels: {
                    color: 'gray', // Default label color
                },
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 10,
                    color: 'gray', // Default X-axis label color
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)', // Default grid line color
                },
            },
            y: {
                ticks: {
                    color: 'gray', // Default Y-axis label color
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)', // Default grid line color
                },
            },
        },
    };

    return (
        <div className="bg-white dark:bg-gray-800 bg-opacity-30 backdrop-blur-md p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
            <Line
                data={chartData}
                options={{
                    ...options,
                    plugins: {
                        ...options.plugins,
                        legend: {
                            ...options.plugins.legend,
                            labels: {
                                color: document.documentElement.classList.contains('dark')
                                    ? 'white'
                                    : 'gray', // Adapt label color based on theme
                            },
                        },
                    },
                    scales: {
                        x: {
                            ...options.scales.x,
                            ticks: {
                                ...options.scales.x.ticks,
                                color: document.documentElement.classList.contains('dark')
                                    ? 'white'
                                    : 'gray', // Adapt X-axis label color based on theme
                            },
                            grid: {
                                ...options.scales.x.grid,
                                color: document.documentElement.classList.contains('dark')
                                    ? 'rgba(255, 255, 255, 0.2)'
                                    : 'rgba(200, 200, 200, 0.2)', // Adapt grid line color
                            },
                        },
                        y: {
                            ...options.scales.y,
                            ticks: {
                                ...options.scales.y.ticks,
                                color: document.documentElement.classList.contains('dark')
                                    ? 'white'
                                    : 'gray', // Adapt Y-axis label color based on theme
                            },
                            grid: {
                                ...options.scales.y.grid,
                                color: document.documentElement.classList.contains('dark')
                                    ? 'rgba(255, 255, 255, 0.2)'
                                    : 'rgba(200, 200, 200, 0.2)', // Adapt grid line color
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default ChartComponent;
