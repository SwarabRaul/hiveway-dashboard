// src/components/StatusCard.jsx

import React from 'react';
import { FaVolumeUp, FaThermometerHalf, FaTint } from 'react-icons/fa';

const StatusCard = ({ title, value, unit }) => {
    const getIcon = (title) => {
        switch (title) {
            case 'Sound':
                return <FaVolumeUp className="text-blue-500" size={24} />;
            case 'Temperature':
                return <FaThermometerHalf className="text-red-500" size={24} />;
            case 'Humidity':
                return <FaTint className="text-green-500" size={24} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
            {getIcon(title)}
            <div>
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-2xl font-bold">
                    {value !== null && value !== undefined ? value : '--'} {unit}
                </p>
            </div>
        </div>
    );
};

export default StatusCard;
