import React from 'react';

const ToggleSwitch = ({ isDarkMode, toggleTheme }) => {
  return (
    <div
      className={`w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition duration-300 ${
        isDarkMode ? 'justify-end' : 'justify-start'
      }`}
      onClick={toggleTheme}
    >
      <div
        className={`w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-transform duration-300 ${
          isDarkMode ? 'translate-x-6' : 'translate-x-0'
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
