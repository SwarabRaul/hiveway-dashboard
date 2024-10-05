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
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('https://hivewaybackend.onrender.com/');
                if (Array.isArray(response.data)) {
                    const data = response.data;

                    // Sort data by createdAt in ascending order
                    const sortedData = data.sort(
                        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                    );

                    // Get the last 10 entries
                    const recentData = sortedData.slice(-10);

                    const labels = recentData.map((item) =>
                        new Date(item.createdAt).toLocaleTimeString()
                    );
                    const values = recentData.map((item) => item[dataKey]);

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
                    setError(null); // Clear previous errors
                } else {
                    setError('Unexpected data format.');
                }
            } catch (error) {
                console.error('Error fetching chart data:', error);
                setError('Failed to fetch chart data.');
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
            {error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <Line data={chartData} options={options} />
            )}
        </div>
    );
};

export default ChartComponent;
