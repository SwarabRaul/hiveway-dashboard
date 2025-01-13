import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCircle } from 'react-icons/fa';

const Timeline = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTimeline = async () => {
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

                    setEvents(recentData);
                    setError(null); // Clear previous errors
                } else {
                    setError('Unexpected data format.');
                }
            } catch (error) {
                console.error('Error fetching timeline data:', error);
                setError('Failed to fetch timeline data.');
            }
        };

        fetchTimeline();
        const interval = setInterval(fetchTimeline, 60000); // Refresh every 60 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white dark:bg-gray-800 bg-opacity-30 backdrop-blur-md p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Activity Timeline</h3>
            <ul className="relative border-l border-gray-200 dark:border-gray-700">
                {events.map((event, index) => (
                    <li key={event._id} className="mb-10 ml-6">
                        <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-500 dark:bg-blue-700 rounded-full ring-8 ring-white dark:ring-gray-800">
                            <FaCircle className="text-white" />
                        </span>
                        <h4 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {new Date(event.createdAt).toLocaleString()}
                        </h4>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                            TDS: {event.TDS} ppm, Salinity: {event.Salinity} ppt
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Timeline;
