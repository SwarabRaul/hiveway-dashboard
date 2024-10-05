// src/App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import StatusCard from './components/StatusCard';
import ChartComponent from './components/ChartComponent';
import Timeline from './components/Timeline';

function App() {
  const [latestData, setLatestData] = useState(null);

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

  useEffect(() => {
    fetchLatestData();
    const interval = setInterval(fetchLatestData, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        projectName="HiveWay"
        latestUpdate={
          latestData
            ? new Date(latestData.createdAt).toLocaleString()
            : 'Loading...'
        }
      />

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard
            title="Sound"
            value={latestData ? latestData.sound : '--'}
            unit="dB"
          />
          <StatusCard
            title="Temperature"
            value={latestData ? latestData.temperature : '--'}
            unit="°C"
          />
          <StatusCard
            title="Humidity"
            value={latestData ? latestData.humidity : '--'}
            unit="%"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ChartComponent
            title="Sound Over Time"
            dataKey="sound"
            color="rgba(59, 130, 246, 1)" // Blue
          />
          <ChartComponent
            title="Temperature Over Time"
            dataKey="temperature"
            color="rgba(220, 38, 38, 1)" // Red
          />
          <ChartComponent
            title="Humidity Over Time"
            dataKey="humidity"
            color="rgba(34, 197, 94, 1)" // Green
          />
        </div>

        <Timeline />
      </main>
    </div>
  );
}

export default App;
