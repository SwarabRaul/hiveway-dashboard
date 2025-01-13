import React from 'react';
import { FaTint, FaWater } from 'react-icons/fa'; // Added FaWater for Salinity icon

const StatusCard = ({ title, value, unit }) => {
    const getIcon = (title) => {
        switch (title) {
            case 'TDS':
                return <FaTint className="text-green-500" size={24} />;
            case 'Salinity':
                return <FaWater className="text-blue-500" size={24} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 bg-opacity-30 backdrop-blur-md p-6 rounded-lg shadow-md flex items-center space-x-4">
            {getIcon(title)}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
                <p className="text-2xl font-bold text-gray-700 dark:text-gray-200">
                    {value !== null && value !== undefined ? value : '--'} {unit}
                </p>
            </div>
        </div>
    );
};

export default StatusCard;
