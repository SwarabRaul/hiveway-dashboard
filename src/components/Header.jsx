import React from 'react';
import ToggleSwitch from './ToggleSwitch';

const Header = ({ projectName, latestUpdate, isDarkMode, toggleTheme }) => {
  return (
    <header className="bg-white dark:bg-gray-800 bg-opacity-30 backdrop-blur-md text-gray-900 dark:text-white p-4 shadow-md rounded-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">{projectName} Dashboard</h1>
        <p className="text-sm mt-2 md:mt-0">Last Updated: {latestUpdate}</p>
        <ToggleSwitch isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;
