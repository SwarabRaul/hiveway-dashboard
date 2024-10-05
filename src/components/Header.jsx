// src/components/Header.jsx

import React from 'react';

const Header = ({ projectName, latestUpdate }) => {
    return (
        <header className="bg-yellow-600 text-white p-4 shadow">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <h1 className="text-2xl font-bold">{projectName} Dashboard</h1>
                <p className="text-sm mt-2 md:mt-0">Last Updated: {latestUpdate}</p>
            </div>
        </header>
    );
};

export default Header;
