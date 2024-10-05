// src/components/Timeline.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCircle } from 'react-icons/fa';

const Timeline = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchTimeline = async () => {
            try {
                const response = await axios.get('https://hivewaybackend.onrender.com/');
                if (Array.isArray(response.data)) {
                    const data = response.data;
                    setEvents(data.slice(-10).reverse()); // Latest 10 events in chronological order
                }
            } catch (error) {
                console.error('Error fetching timeline data:', error);
            }
        };

        fetchTimeline();
        const interval = setInterval(fetchTimeline, 60000); // Refresh every 60 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Activity Timeline</h3>
            <ul className="relative border-l border-gray-200">
                {events.map((event, index) => (
                    <li key={event._id} className="mb-10 ml-6">
                        <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full ring-8 ring-white">
                            <FaCircle className="text-white" />
                        </span>
                        <h4 className="mb-1 text-lg font-semibold text-gray-900">
                            {new Date(event.createdAt).toLocaleString()}
                        </h4>
                        <p className="text-base font-normal text-gray-500">
                            Sound: {event.sound} dB, Temperature: {event.temperature}°C, Humidity: {event.humidity}%
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Timeline;
