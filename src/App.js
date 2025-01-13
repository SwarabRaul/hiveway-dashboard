import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import StatusCard from './components/StatusCard';
import ChartComponent from './components/ChartComponent';
import Timeline from './components/Timeline';

function App() {
  const [latestData, setLatestData] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchLatestData = async () => {
    try {
      const response = await axios.get('https://hivewaybackend.onrender.com/');
      if (Array.isArray(response.data) && response.data.length > 0) {
        const sortedData = response.data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        const latest = sortedData[sortedData.length - 1];
        setLatestData(latest);
      }
    } catch (error) {
      console.error('Error fetching latest data:', error);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    fetchLatestData();
    const interval = setInterval(fetchLatestData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Header
        projectName="TDS and Salinity BC"
        latestUpdate={
          latestData
            ? new Date(latestData.createdAt).toLocaleString()
            : 'Loading...'
        }
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard
            title="TDS"
            value={latestData ? latestData.TDS : '--'}
            unit="ppm"
          />
          <StatusCard
            title="Salinity"
            value={latestData ? latestData.Salinity : '--'}
            unit="ppt"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartComponent
            title="TDS Over Time"
            dataKey="TDS"
            color="rgba(59, 130, 246, 1)"
          />
          <ChartComponent
            title="Salinity Over Time"
            dataKey="Salinity"
            color="rgba(220, 38, 38, 1)"
          />
        </div>

        <Timeline />
      </main>
    </div>
  );
}

export default App;
